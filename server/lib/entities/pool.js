var pull = require('../request');


/**
    Gets pool details for the given pool id.
    
    @param { string } poolId
      Pool Id for the pool to be retrieved.
    @return { promise }
      Resolves to a "pool" object.
*/
module.exports = async function(poolId)
{
    var pool = { __entity: 'pool' };
    
    return pull.poolMeta(poolId).then(data => 
    {
        pool.id = data.pool_id;
        pool.name = data.name;
        pool.desc = data.description;
        pool.ticker = data.ticker;
        pool.home = data.homepage;
        
        return pool;
    });
}
