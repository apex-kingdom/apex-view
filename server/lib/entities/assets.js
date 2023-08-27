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
    var all = [], page = 0;
  
    let assets = () => pull.accountAssets({ account: stakeKey, page: ++page }).then(array => 
    {
        all.push(...array);            
        return array.length < 100 ? all : assets();
    });
    
    return assets();
}
