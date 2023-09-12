var { decode } = require('hex-encode-decode');
var objectFilter = require('../object-filter');
var pull = require('../request');
var { prod } = require('../../config');


var reBaseName = /^(.+)\s*#.*$/;
let reProto = /^(https?)|(ipfs)|(data):/i;
/**
    Gets token data for the given asset id.
    
    @param { string } assetId
      Asset id identifying the token (policy & asset name).
    @return { promise }
      Resolves to a "token" object.
*/
module.exports = async function(assetId, trans)
{
    var token = { __entity: 'token' };

    return pull.asset(assetId).then(data => 
    {
        var meta = data.metadata || {};
        var ocmd = data.onchain_metadata || {};
        var ocmdExists = !!data.onchain_metadata
        
        if (!prod) token.__raw = data;
        
        token.policyId = data.policy_id;
        token.fingerprint = data.fingerprint;
        // for now we will assume token is an NFT when 
        // `quantity` is 1. (other checks may be needed)
        token.isNFT = data.quantity == 1;
        
        token.ticker = meta.ticker || ocmd.ticker;
        token.assetName = data.asset_name || '';
        token.assetNameDec = decode(token.assetName);
        token.name = (!token.isNFT && token.ticker) || ocmd.name || token.assetNameDec;
        token.title = meta.ticker && meta.name
            ? (meta.ticker !== meta.name ? `${meta.name} (${meta.ticker})` : meta.name) : token.name;

        token.description = [].concat(ocmd.description || meta.description).join('');
        token.homepage = meta.url;

        token.files = [].concat(ocmd.files || []).map(data => 
        {
            let file = {};
            
            file.mediaType = data.mediaType;
            file.src = [].concat(data.src).join('');
            
            return file;
        });
        
        if (ocmdExists && ocmd.image)
        {
            token.image = [].concat(ocmd.image).join('');
            token.imageType = ocmd.mediaType;
            
            if (!reProto.test(token.image)) 
                token.image = 'ipfs://' + token.image;
        }
        else
        {
            token.image = [].concat(meta.logo).join('');          
            token.imageType = meta.mediaType || 'image/png';     
        }
        // for collection use
        token.project = ocmd.project ? [].concat(ocmd.project).join('') : null;
        if (reBaseName.test(token.name)) token.assetBaseName = token.name.replace(reBaseName, '$1');    
        
        token.decimals = meta.decimals || 0;    

        token.traits = getTraits(ocmd);
        token.onchainMetadataStandard = data.onchain_metadata_standard;
        
        if ((token.onchainMetadataStandard || '').indexOf('CIP68') >= 0)
        {
            // token.description = decode(token.description);
            // token.traits = Object.keys(token.traits).reduce((o, k) => ({ ...o, [k]: decode(token.traits[k]) }), {});
            token.description = '';
            token.traits = {};
        }
        
        return trans(data.initial_mint_tx_hash).then(tx => 
        {
            token.mintTime = tx.time
            return token;            
        });
    });
}


var traitObjects = [ 'traits', 'Traits', 'attributes', 'Attributes', 'features', 'Features' ];
var nonTraits = 
[   
    'description',
    'discord', 
    'files', 
    'github',
    'image', 
    'media', 
    'mediaType', 
    'name', 
    'project', 
    'projectName',
    'sha256',
    'twitter',
    'website',
];
var reNonTraits = new RegExp('^[^a-z0-9]*' + nonTraits.map(s => `(${s})`).join('|') + '[^a-z0-9]*$', 'i');

function getTraits(ocmd)
{  
    for (prop of traitObjects)
    {
        if (Array.isArray(ocmd[prop]))
            return ocmd[prop].reduce((obj, item) => 
            {
                if (typeof item === 'object' && item !== null)
                {
                    if (Object.hasOwn(item, 'name') && Object.hasOwn(item, 'value'))
                        return { ...obj, [item.name]: item.value };
                    else
                        return { ...obj, ...item };
                }
                
                return obj;
            }, {});
            
        if (typeof ocmd[prop] === 'object')
            return objectFilter(ocmd[prop], () => true);
    }
    
    return objectFilter(ocmd, (k, v) => !reNonTraits.test(k.slice(-1)[0]) && typeof v !== 'object');    
}
