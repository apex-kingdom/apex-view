var numeral = require('numeral');
var { decode } = require('hex-encode-decode');
var loop = require('../loop');
var objectFilter = require('../object-filter');
var pull = require('../request');


var reBaseName = /^(.+)\s*#.*$/;
var nonTraits = 
[   
    'description', 
    'files', 
    'image', 
    'media', 
    'mediaType', 
    'name', 
    'project', 
    'projectName',
    'website'
];
var reNonTraits = new RegExp('^[^a-z0-9]*' + nonTraits.map(s => `(${s})`).join('|') + '[^a-z0-9]*$', 'i');
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
        
        token.policyId = data.policy_id;
        token.fingerprint = data.fingerprint;
        // for now we will assume token is an NFT when 
        // `quantity` is 1. (other checks may be needed)
        token.isNFT = data.quantity == 1;
        
        token.ticker = meta.ticker || ocmd.ticker;
        token.assetName = data.asset_name;
        token.assetNameDec = decode(token.assetName);
        token.name = (!token.isNFT && token.ticker) || ocmd.name || token.assetNameDec;

        token.description = ocmd.description;
        token.files = ocmd.files || [];
        
        token.image = ocmd.image || meta.logo;
        token.imageType = ocmd.mediaType || 'image/png';            
        // for collection use
        token.project = ocmd.project;
        if (reBaseName.test(token.name)) token.assetBaseName = token.name.replace(reBaseName, '$1');    
        
        token.decimals = meta.decimals || 0;    
        token.quantity = numeral(data.quantity).value();
        // token.quantityFormatted = numeral(token.quantity).format(format(token.quantity));

        token.onchainMetadataStandard = data.onchain_metadata_standard;
            
        if (typeof ocmd.attributes === 'object')
            token.traits = objectFilter(ocmd.attributes, () => true);
        else if (typeof ocmd.traits === 'object')
            token.traits = objectFilter(ocmd.traits, () => true);
        else
            token.traits = objectFilter(ocmd, k => !reNonTraits.test(k.slice(-1)[0]));
            
        return pull.transaction(data.initial_mint_tx_hash).then(data => 
        {
            token.mintBlockHeight = data.block_height;
            return token;        
        });
    });
}
