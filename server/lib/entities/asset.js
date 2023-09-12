var nf = require('../num-format');


/**
    Builds a record for an asset of a wallet.
    
    @param { object } data
      Account-related data for the asset.
    @param { object } token
      Hard data for the asset.
    @return { promise }
      Full asset record.
*/
module.exports = async function(data, token)
{
    var asset = { ...token, __entity: 'asset' };
    
    asset.userQuantity = data.quantity;
    asset.userQuantityFormatted = nf(asset.userQuantity, asset.decimals);
        
    return asset;
}
