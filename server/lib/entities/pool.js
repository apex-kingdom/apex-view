
module.exports = function(data)
{
    let pool = { __entity: 'pool' };
    
    pool.id = data.pool_id;
    pool.name = data.name;
    pool.desc = data.description;
    pool.ticker = data.ticker;
    pool.home = data.homepage;
    
    return pool;
}
