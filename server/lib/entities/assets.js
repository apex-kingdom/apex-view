var pull = require('../request');


/**
    Gets the assets of a wallet for the given staking key.
    
    @param { string } stakeKey
      Staking key for the assets to be retrieved.
    @return { promise }
      Array of assets.
*/
module.exports = async function(stakeKey)
{    
    return pull.accountAssets(stakeKey);
}
