var numeral = require('numeral');
var pull = require('../request');
var loop = require('../loop');
var token = require('./token');


/**
    Gets the assets of a wallet for the given staking key.
    
    @param { string } stakeKey
      Staking key for the assets to be retrieved.
    @return { promise }
      Array of assets.
*/
module.exports = async function(stakeKey)
{
    return pull.accountAssets(stakeKey).then(array => 
    {
        return Promise.all(array.map(data => 
        {
            return token(data.unit).then(token => 
            {
                let asset = { ...token, __entity: 'asset' };
                
                asset.userQuantity = numeral(data.quantity).value();
                asset.userQuantityAdjusted = loop(asset.decimals).reduce(v => v * .1, asset.userQuantity);
                asset.userQuantityFormat = 
                    asset.userQuantityAdjusted > 10 ? '0,0' : `0,0.[${'0'.repeat(asset.decimals)}]`;
                asset.userQuantityFormatted = numeral(asset.userQuantityAdjusted).format(asset.userQuantityFormat);
                
                return asset;
            });
        }));  
    });
}
