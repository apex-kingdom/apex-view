var { decode } = require('hex-encode-decode');
var at = require('../seconds');
var { cip68Traits, resolveImageUrl, toAssetClass } = require('../utils');
var traitSearch = require('../trait-search');
var { prod } = require('../../config');
var { image } = require('../request');


var reBaseName = /^(.+?)(\s*#)?\d*$/;
var reProto = /^(https?)|(ipfs)|(data):/i;
var __entity = 'token';
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
var adapter =
{
    apiName: 'assetList',
    
    cacheExp: at(3).days,
    
    getKey: source => 
    {
        if (source.__entity === __entity)
            return [ source.policyId, source.assetName ];
        
        return [ source.policy_id, source.asset_name ];
    },
    
    entity: function(data)
    {
        var token = { __entity };

        if (!prod) token.__raw = data;
        // token identification details
        token.policyId = data.policy_id;
        token.assetName = data.asset_name;
        token.fingerprint = data.fingerprint;
        // CIP67 asset class & type booleans
        token.assetClass = toAssetClass(token.assetName);
        token.is =
        {
            nft: token.assetClass === 222 || (!token.assetClass && data.total_supply == 1),
            ft: token.assetClass === 333 || (!token.assetClass && data.total_supply != 1),
            rft: token.assetClass === 444
        }
        token.isNFT = token.is.nft; // legacy


        var meta = data.token_registry_metadata || {};
        var ocmd = data.minting_tx_metadata?.['721']?.[data.policy_id]?.[data.asset_name_ascii] || {};
        
        // indicates that we need more data / should get a second opinion
        token.incomplete = !Object.keys({ ...meta, ...ocmd }).length || 
            (data.total_supply > 1 && data.total_supply < 10);
                
        token.ticker = meta.ticker || ocmd.ticker;
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

        var trait68 = data.cip68_metadata?.[token.assetClass]?.fields?.[0]?.map;
        var traitBase = trait68 ? cip68Traits(trait68) : ocmd || {};
        token.traits = traitSearch(traitBase);
        
        token.onchainMetadataStandard = !!data.minting_tx_metadata?.['721'] ? 'CIP25v1' : null;
                
        token.mintTime = data.creation_time * 1000;
        
        return token;
    },

    ancillary: async (token, { token_ext }) =>
    {
        if (token.incomplete)
        {
            var unit = token.policyId + token.assetName;
            return token_ext(unit).then(extra => (
            { 
                ...token, 
                ...extra, 
                traits: token.traits || extra.traits,
                __entity 
            }));
        }
        
        return token;
    }
}

module.exports = adapter;
