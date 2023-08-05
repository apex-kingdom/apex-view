

export default function(data)
{
    let pool = {};
    
    pool.id = data.pool_id;
    pool.name = data.name;
    pool.desc = data.description;
    pool.ticker = data.ticker;
    pool.home = data.homepage;
    
    return pool;
}
