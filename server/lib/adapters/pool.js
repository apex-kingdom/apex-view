var at = require('../seconds');


/**
    Transforms raw api data into ApexView entity data.
    
    Pool entity data fields:    
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
    var pool = { __entity: 'pool' };
    
    pool.id = data.pool_id;
    pool.name = data.name;
    pool.desc = data.description;
    pool.ticker = data.ticker;
    pool.home = data.homepage;
    
    return pool;
}

exports.apiName = 'pool';
exports.cacheExp = at(1).weeks;
