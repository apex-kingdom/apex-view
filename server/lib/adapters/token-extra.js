var { decode } = require('hex-encode-decode');
var at = require('../seconds');
var traitSearch = require('../trait-search');
var { prod } = require('../../config');


var reBaseName = /^(.+?)(\s*#)?\d*$/;
let reProto = /^(https?)|(ipfs)|(data):/i;
/**
    Transforms raw api data into ApexView entity data.
        
    @param { object } data
      Raw api data.
    @return { object }
      Entity data.
*/
exports.entity = function(data)
{
    var token = { __entity: 'token' };

    var meta = data.metadata || {};
    var ocmd = data.onchain_metadata || {};
                
    token.ticker = meta.ticker || ocmd.ticker;
    token.name = (!token.isNFT && token.ticker) || ocmd.name || decode(data.asset_name || '');
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

    token.traits = traitSearch(ocmd);
    token.onchainMetadataStandard = data.onchain_metadata_standard;
        
    if ((token.onchainMetadataStandard || '').indexOf('CIP68') >= 0)
    {
        // token.description = decode(token.description);
        // token.traits = Object.keys(token.traits).reduce((o, k) => ({ ...o, [k]: decode(token.traits[k]) }), {});
        token.description = '';
        token.traits = {};
    }
        
    return token;
}

exports.apiName = 'asset';
exports.cacheExp = at(3).days;


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
