var numeral = require('numeral');
var { decode } = require('hex-encode-decode');
var loop = require('../loop');
var objectFilter = require('../object-filter');
var pull = require('../request');
var { prod } = require('../../config');


var reBaseName = /^(.+)\s*#.*$/;
/**
    Gets token data for the given asset id.
    
    @param { string } stakeKey
      Staking key for the wallet to be retrieved.
    @return { promise }
      Resolves to a "account" object.
*/
module.exports = async function(assetId)
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
        token.assetName = data.asset_name;
        token.assetNameDec = decode(token.assetName);
        token.name = (!token.isNFT && token.ticker) || ocmd.name || token.assetNameDec;

        token.description = [].concat(ocmd.description || meta.description).join('');
        token.homepage = meta.url;
        token.files = (ocmd.files || []).map(data => 
        {
            let file = {};
            
            file.mediaType = data.mediaType;
            file.src = [].concat(data.src).join('');
            
            return file;
        });
        
        token.image = [].concat(ocmd.image || meta.logo).join('');
        token.imageType = ocmd.mediaType || 'image/png';            
        // for collection use
        token.project = [].concat(ocmd.project);
        if (reBaseName.test(token.name)) token.assetBaseName = token.name.replace(reBaseName, '$1');    
        
        token.decimals = meta.decimals || 0;    
        token.quantity = numeral(data.quantity).value();
        // token.quantityFormatted = numeral(token.quantity).format(format(token.quantity));

        token.traits = getTraits(ocmd);
        token.onchainMetadataStandard = data.onchain_metadata_standard;
        
        // if ((token.onchainMetadataStandard || '').indexOf('CIP68') >= 0)
        // {
        //     token.description = decode(token.description);
        //     token.traits = Object.keys(token.traits).reduce((o, k) => ({ ...o, [k]: decode(token.traits[k]) }), {});
        // }
        
        token.mintTx = data.initial_mint_tx_hash;
        
        return token;
    });
}


var traitObjects = [ 'traits', 'attributes', 'Features' ];
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
    'twitter',
    'website',
];
var reNonTraits = new RegExp('^[^a-z0-9]*' + nonTraits.map(s => `(${s})`).join('|') + '[^a-z0-9]*$', 'i');

function getTraits(ocmd)
{
    for (prop of traitObjects)
        if (typeof ocmd[prop] === 'object')
            return objectFilter(ocmd[prop], () => true);
    
    return objectFilter(ocmd, (k, v) => !reNonTraits.test(k.slice(-1)[0]) && typeof v !== 'object');    
}
