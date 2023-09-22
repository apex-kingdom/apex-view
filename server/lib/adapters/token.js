var { decode } = require('hex-encode-decode');
var at = require('../seconds');
var traitSearch = require('../trait-search');
var { prod } = require('../../config');


var reBaseName = /^(.+?)(\s*#)?\d*$/;
let reProto = /^(https?)|(ipfs)|(data):/i;
/**
    Transforms raw api data into ApexView entity data.
    
    Token entity data fields:
    - policyId (string)
    - fingerprint (string)
    - isNFT (boolean)
    - ticker (string)
    - assetName (string)
    - name (string)
    - title (string)
    - description (string)
    - homepage (string)
    - files (array)
    - image
    - imageType
    - project
    - assetBaseName
    - decimals
    - traits
    - onchainMetadataStandard
    
    @param { object } data
      Raw api data.
    @return { object }
      Entity data.
*/
exports.entity = function(data)
{
    var token = { __entity: 'token' };

    var meta = data.token_registry_metadata || {};
    var ocmd = data.minting_tx_metadata?.['721']?.[data.policy_id]?.[data.asset_name_ascii] || {};
    
    if (!prod) token.__raw = data;
    // indicates that we need more data
    token.incomplete = !Object.keys({ ...meta, ...ocmd }).length;
    
    token.policyId = data.policy_id;
    token.fingerprint = data.fingerprint;
    // for now we will assume token is an NFT when 
    // quantity is 1. (other checks may be needed)
    token.isNFT = data.total_supply == 1;
    
    token.ticker = meta.ticker || ocmd.ticker;
    token.assetName = data.asset_name;
    token.name = (!token.isNFT && token.ticker) || ocmd.name || data.asset_name_ascii;
    token.title = meta.ticker && meta.name
        ? (meta.ticker !== meta.name ? `${meta.name} (${meta.ticker})` : meta.name) : token.name;

    token.description = [].concat(meta.description || ocmd.description).join('');
    token.homepage = meta.url;

    token.files = [].concat(ocmd.files || []).map(data => 
    {
        let file = {};
        
        file.mediaType = data.mediaType;
        file.src = [].concat(data.src).join('');
        
        return file;
    });

    if (meta.logo)
    {
        token.image = [].concat(meta.logo).join('');
        token.imageType = meta.mediaType;
    }
    
    if (!token.image && ocmd.image)
    {
        token.image = [].concat(ocmd.image).join('');
        token.imageType = ocmd.mediaType;
        
        if (!reProto.test(token.image))
            token.image = 'ipfs://' + token.image;
    } 
    
    var { image, imageType } = resolveImage(token.image, token.imageType);
    token.image = image;
    token.imageType = imageType;

    // for collection use
    token.project = ocmd.project ? [].concat(ocmd.project).join('') : null;
    if (reBaseName.test(token.name)) token.assetBaseName = token.name.replace(reBaseName, '$1');    
        
    token.decimals = meta.decimals || 0;    

    token.traits = ocmd ? traitSearch(ocmd) : {};
    token.onchainMetadataStandard = !!data.minting_tx_metadata?.['721'] ? 'CIP25v1' : null;
            
    token.mintTime = data.creation_time * 1000;
    
    return token;
}

exports.apiName = 'assetList';
exports.cacheExp = at(3).days;
exports.ancillary = async (token, { token_ext }) =>
{
    if (token.incomplete)
    {
        var unit = token.policyId + token.assetName;
        return token_ext(unit).then(extra => ({ ...token, ...extra }));
    }
    
    return token;
}


function resolveImage(image, imageType)
{
    // limit image regex test to imitial characters to remove false positives
    if (image && !reProto.test(image.slice(0, 10)))
    {
        if (imageType)
        {
            return { image: `data:${imageType};base64,${image}` };
        }
        else
        {
            // TODO: Need some real image detection here
            var mime = 'image/png';
            return { image: `data:${mime};base64,${image}` };
        }
    }
    
    return { image, imageType };
}