var numeral = require('numeral');
var loop = require('../loop');


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
    
    asset.userQuantity = numeral(data.quantity).value();
    asset.userQuantityAdjusted = loop(asset.decimals).reduce(v => v * .1, asset.userQuantity);
    asset.userQuantityFormat = asset.userQuantityAdjusted > 10 ? '0,0' : `0,0.[${'0'.repeat(asset.decimals)}]`;
    asset.userQuantityFormatted = numeral(asset.userQuantityAdjusted).format(asset.userQuantityFormat);
    
    return asset;
}
