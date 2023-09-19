var { decode } = require('hex-encode-decode');
var objectFilter = require('../object-filter');
var pull = require('../request');
var { prod } = require('../../config');


var reBaseName = /^(.+?)(\s*#)?\d*$/;
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
        
        return Promise.all(
        [
            trans(data.initial_mint_tx_hash),
            resolveImage(token.image, token.imageType)
        ])
        .then(([ tx, { image, imageType } ]) => 
        {
            token.mintTime = tx.time;
            token.image = image;
            token.imageType = imageType;
            
            return token;            
        })        
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
        {
            return ocmd[prop].reduce((obj, item) => 
            {
                if (typeof item === 'object' && item !== null)
                {
                    if (Object.hasOwn(item, 'name') && Object.hasOwn(item, 'value'))
                        return { ...obj, [item.name]: item.value };
                    else
                        return { ...obj, ...item };
                }
                
                if (typeof item === 'string')
                    return { ...obj, traits: (obj.traits ? obj.traits + ', ' : '') + item };
                
                return obj;
            }, {});
        }
        
        if (typeof ocmd[prop] === 'object')
            return objectFilter(ocmd[prop], () => true);
    }
    
    return objectFilter(ocmd, (k, v) => !reNonTraits.test(k.slice(-1)[0]) && typeof v !== 'object');    
}


async function resolveImage(image, imageType)
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
            return import('image-type').then(mod => 
            {
                let arrayBuff = Uint8Array.from(Buffer.from(image, 'base64'));
                
                return mod.default(arrayBuff).then(({ mime }) => 
                {
                    return { image: `data:${mime};base64,${image}` };
                });
            });            
        }
    }
    
    return { image, imageType };
}
