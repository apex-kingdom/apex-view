var redis = require('../../config/redis');
var { keyexp, prod } = require('../../config');

var entities =
{
    account: require('./account'),
    asset: require('./asset'),
    assets: require('./assets'),
    chain: require('./chain'),
    collections: require('./collections'),
    pool: require('./pool'),
    stake: require('./stake'),
    token: require('./token'),
    tx: require('./tx')
}


var reducer = (obj, name) => 
{
    obj[name] = ident => 
    {
        let key = name + ':' + ident;

        return redis.jget(key).then(data => 
        {
            if (data) 
            {
                if (!prod) console.log('apex: using cached data for', key);
                                  
                return data;
            }
            else
            {
                if (!prod) console.log('apex: pulling api data for', key);
                
                return entities[name](ident).then(data =>
                {
                    redis.jset(key, data, keyexp[name]);
                    return data;
                });
            }
        });
    }
    
    return obj;
}

var cacheables = [ 'account', 'assets', 'chain', 'pool', 'stake', 'token', 'tx' ];
module.exports = { ...entities, ...cacheables.reduce(reducer, {}) };
