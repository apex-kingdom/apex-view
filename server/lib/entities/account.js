var pull = require('../request');
var nf = require('../num-format');


/**
    Gets the wallet for the given staking key.
    
    @param { string } stakeKey
      Staking key for the wallet to be retrieved.
    @return { promise }
      Resolves to a "account" object.
*/
module.exports = async function(stakeKey)
{
    var account = { __entity: 'account' };
    
    return pull.account(stakeKey).then(data => 
    {
        account.active = data.active;
        account.epoch = data.active_epoch;

        account.ada = data.controlled_amount;
        account.adaFormatted = nf(account.ada, 6);

        account.rewards = data.rewards_sum;
        account.rewardsFormatted = nf(account.rewards, 6);
           
        account.stakeKey = data.stake_address;
        account.poolId = data.pool_id;
        
        return account;
    });
}
