var at = require('../seconds');


var __entity = 'pool';
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
var adapter =
{
    apiName: 'pool',
    
    cacheExp: at(1).weeks,
    
    getKey: source =>
    {
        if (source.__entity === __entity)
            return source.id;
        
        return source.pool_id;
    },
    
    entity: function(data)
    {
        var pool = { __entity };
        
        pool.id = data.pool_id;
        pool.name = data.name;
        pool.desc = data.description;
        pool.ticker = data.ticker;
        pool.home = data.homepage;
        
        return pool;
    }    
}

module.exports = adapter;
