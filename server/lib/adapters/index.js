var get = require('../request');
var redis = require('../../config/redis');


var entities =
{
    account: require('./account'),
    assets: require('./assets'),
    collection: require('./collection'),
    eras: require('./eras'),
    genesis: require('./genesis'),
    pool: require('./pool'),
    stake: require('./stake'),
    token: require('./token'),
    token_ext: require('./token-extra'),
    transaction: require('./transaction')    
}

var toList = ident => (data, oper) =>
{
    if (Array.isArray(ident) && Array.isArray(data))
        return Promise.all(ident.map((id, idx) => oper(id, data[idx])));
    
    return oper(ident, data);
}

var adapt = name => 
{
    var { apiName, cacheExp, entity, ancillary = async e => e } = entities[name];
    // determine the data request function
    var api = typeof apiName === 'function' ? apiName : get[apiName];
    
    var key = ident => name + ':' + ident    
    
    var fn = ident => 
    {
        var asSingle = data => data || fn.request(ident)
        var asArray = data =>
        {
            var cache = { y: [], n: [] };
            (data || []).forEach((item, idx) => item ? cache.y.push(item) : cache.n.push(ident[idx]))
            return cache.n.length ? fn.request(cache.n).then(items => ([ ...cache.y, ...(items || []) ])) : data;
        }
        
        return fn.fromCache(ident).then(Array.isArray(ident) ? asArray : asSingle);
    }
    // request data
    fn.request = ident => 
    {
        var build = (id, item) => fn.build(id, item).then(ent => fn.toCache(id, ent))        
        return api(ident).then(data => toList(ident)(data, build));
    }
    // get data from cache
    fn.fromCache = ident => toList(ident)(ident, id => redis.jget(key(id)))
    // set data in cache
    fn.toCache = (ident, data) => (redis.jset(key(ident), data, cacheExp), data)
    // construct an entity from raw data item
    fn.build = (id, item) => ancillary(entity(item, id), adapters)
    
    return fn;
}

var adapters = Object.keys(entities).reduce((o, e) => ({ ...o, [e]: adapt(e) }), {});

module.exports = adapters;
