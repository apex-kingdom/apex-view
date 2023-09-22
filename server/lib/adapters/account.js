var at = require('../seconds');
var nf = require('../num-format');


/**
    Transforms raw api data into ApexView entity data.
    
    Account entity data fields:    
    - active (boolean)
    - ada (string)
    - adaFormatted (string)
    - epoch
    - rewards (string)
    - rewardsFormatted (string)
    - stakeKey (string)
    - poolId (string)
    
    @param { object } data
      Raw api data.
    @return { object }
      Entity data.
*/
exports.entity = function(data)
{
    var account = { __entity: 'account' };
    
    account.active = data.active;
    account.epoch = data.active_epoch;

    account.ada = data.controlled_amount;
    account.adaFormatted = nf(account.ada, 6);

    account.rewards = data.rewards_sum;
    account.rewardsFormatted = nf(account.rewards, 6);
       
    account.stakeKey = data.stake_address;
    account.poolId = data.pool_id;
    
    return account;
}

exports.apiName = 'account';
exports.cacheExp = at(1).minutes;
