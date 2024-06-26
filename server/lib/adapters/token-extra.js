var { decode } = require('hex-encode-decode');
var at = require('../seconds');
var { resolveImageUrl, toAssetClass } = require('../utils');
var traitSearch = require('../trait-search');
var { prod } = require('../../config');
var { image } = require('../request');


var reBaseName = /^(.+?)(\s*#)?\d*$/;
var reProto = /^(https?)|(ipfs)|(data):/i;
var __entity = 'token-extra';
/**
    Transforms raw api data into ApexView entity data.
        
    @param { object } data
      Raw api data.
    @return { object }
      Entity data.
*/
var adapter =
{
    apiName: 'asset',

    cacheExp: at(3).days,
        
    getKey: source =>
    {
        if (source.__entity === __entity)
            return source.policyId + source.assetName;
        
        return source.unit || (source.policy_id + source.asset_name);
    },

    entity: function(data)
    {
        var token = { __entity };

        if (!prod) token.__raw2 = data;
        // token identification details
        token.policyId = data.policy_id;
        token.assetName = data.asset_name;
        token.fingerprint = data.fingerprint;
        // CIP67 asset class & type booleans
        token.assetClass = toAssetClass(token.assetName);        
        token.assetType = 
        {
            nft: token.assetClass === 222 || (!token.assetClass && data.quantity == 1),
            ft: token.assetClass === 333 || (!token.assetClass && data.quantity != 1),
            rft: token.assetClass === 444
        }
        token.isNFT = token.assetType.nft; // legacy


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

        // if (meta.logo)
        // {
        //     token.image = resolveImageUrl(meta.logo, meta.mediaType);
        //     token.thumb = token.image;
        // }
        // else
        // {
        //     token.image = image.params({ fingerprint: token.fingerprint, size: 1024 }).url;
        //     token.thumb = image.params({ fingerprint: token.fingerprint, size: 256 }).url;
        // }

        if (meta.logo)
            token.image = resolveImageUrl(meta.logo, meta.mediaType);
        
        if (!token.image && ocmd.image)
        {
            var pre = reProto.test(ocmd.image) ? '' : 'ipfs://';
            token.image = resolveImageUrl(pre + ocmd.image, ocmd.mediaType);
        } 

        // for collection use
        token.project = ocmd.project ? [].concat(ocmd.project).join('') : null;
        if (reBaseName.test(token.name)) token.assetBaseName = token.name.replace(reBaseName, '$1');    
            
        token.decimals = meta.decimals || 0;    

        token.traits = token.traits || traitSearch(ocmd);
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
}

module.exports = adapter;
