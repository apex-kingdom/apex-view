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

var adapt = name => 
{
    var { apiName, cacheExp, getKey, entity } = entities[name];
    var ancillary = entities[name].ancillary || (entity => entity);
    var cacheName = entities[name].cacheName || (ident => name + ':' + ident);
    // determine the data request function
    var api = typeof apiName === 'function' ? apiName : get[apiName];
        
    var fn = (ident, multi) => multi ? fn.listGet(ident) : fn.get(ident)    
    // get an item from cache or request
    fn.get = ident => 
    {
        return fn.fromCache(ident)
            .then(data => data || api(ident).then(data => fn.build(ident, data))
                .then(fn.toCache))
    }
    // get a list of items from cache or request
    fn.listGet = ident =>
    {
        return fn.listFromCache(ident).then(data => 
        {
            var reducer = (arr, itm, idx) => (itm ? arr[0].push(itm) : arr[1].push(ident[idx]), arr)
            var [ yes, no ] = data.reduce(reducer, [ [], [] ]);
            
            return no.length === 0 ? data : api(no)
                .then(items => fn.listBuild(no, items))
                .then(fn.listToCache)
                .then(items => ([ ...yes, ...items ]))
        })      
    }
    // get item from cache
    fn.fromCache = ident => redis.jget(cacheName(ident))
    // get a list of items from cache
    fn.listFromCache = ident => Promise.all(ident.map(fn.fromCache))
    // set data in cache
    fn.toCache = data => (redis.jset(cacheName(getKey(data)), data, cacheExp), data)
    // set a list of data in cache
    fn.listToCache = data => Promise.all(data.map(fn.toCache))
    // construct an entity from raw data
    fn.build = (ident, data) => ancillary(entity(data, ident), adapters)
    // construct a list of entities from raw data
    fn.listBuild = (ident, data) => Promise.all(ident.map((id, idx) => fn.build(id, data[idx])))

    // var listVerify = (ident, data) =>
    // {
    //     return Promise.all(ident.map((id, idx) => 
    //     {
    //         var item = data[idx];
    //         var match = matchKey(id, item);
    // 
    //         if (!match)
    //         {
    //             var json = JSON.stringify(id);
    // 
    //             if (listVerify.errorIds.includes(json))
    //                 throw 'Bad data returned from API for ' + json;
    // 
    //             listVerify.errorIds.push(json);
    //             console.error('apex: incorrect item returned from api for', id);
    //             // make another attempt to get data
    //             // item = fn.listGet([id]).then(items => items[0]);
    //         }
    // 
    //         return item;
    //     }));
    // }
    // 
    // listVerify.errorIds = [];
    
    return fn;
}

var adapters = Object.keys(entities).reduce((o, e) => ({ ...o, [e]: adapt(e) }), {});

module.exports = adapters;
