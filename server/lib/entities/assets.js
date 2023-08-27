var numeral = require('numeral');
var pull = require('../request');
var loop = require('../loop');

/**
    Gets the assets of a wallet for the given staking key.
    
    @param { string } stakeKey
      Staking key for the assets to be retrieved.
    @return { promise }
      Array of assets.
*/
module.exports = async function(stakeKey)
{
    var e = require('./');
    
    var all = [], page = 0;
    var params = () => ({ account: stakeKey, page: ++page })
  
    let assets = () => pull.accountAssets(params()).then(array => 
    {
        return Promise.all(array.map(data => 
        {
            return e.token(data.unit).then(token => 
            {
                var asset = { ...token, __entity: 'asset' };
                
                asset.userQuantity = numeral(data.quantity).value();
                asset.userQuantityAdjusted = loop(asset.decimals).reduce(v => v * .1, asset.userQuantity);
                asset.userQuantityFormat = 
                    asset.userQuantityAdjusted > 10 ? '0,0' : `0,0.[${'0'.repeat(asset.decimals)}]`;
                asset.userQuantityFormatted = numeral(asset.userQuantityAdjusted).format(asset.userQuantityFormat);
                
                return asset;
            });
        }));  
    })
    .then(array => 
    {
        all.push(...array);            
        return array.length < 100 ? all : assets();
    });
    
    return assets();
}
