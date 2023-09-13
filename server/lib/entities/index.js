var redis = require('../../config/redis');
var { keyexp, prod } = require('../../config');

var entities =
{
    account: require('./account'),
    accountCollections: require('./account-collections'),
    asset: require('./asset'),
    assets: require('./assets'),
    chain: require('./chain'),
    collection: require('./collection'),
    pool: require('./pool'),
    stake: require('./stake'),
    token: require('./token'),
    tx: require('./tx')
}

var reducer = (obj, name) => 
{
    let key = ident => name + ':' + ident    
    let fn = (ident, ...args) => fn.fromCache(ident).then(data => data || fn.request(ident, ...args))
    // request data
    fn.request = (ident, ...args) => entities[name](ident, ...args).then(data => fn.toCache(ident, data))
    // get data from cache
    fn.fromCache = ident => redis.jget(key(ident))
    // set data in cache
    fn.toCache = (ident, data) => (redis.jset(key(ident), data, keyexp[name]), data)
    
    return { ...obj, [name]: fn };
}

var cacheables = [ 'account', 'assets', 'chain', 'collection', 'pool', 'stake', 'token', 'tx' ];
module.exports = { ...entities, ...cacheables.reduce(reducer, {}) };
