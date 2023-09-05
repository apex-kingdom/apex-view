var axios = require('axios');
var op = require('object-path');
var config = require('../config/apis');
var redis = require('../config/redis');
var { prod, throttles } = require('../config');


/**
    Fetches Cardano blockchain data.
    
    Named fetches are defined in /config/chain-data.js
    
    @param { string } spec
      Configuration for the request to make.
    @param { any, object } params
      Interpolation parameters for request.
    @param { string } pathname
      Path to the data needed from the request.
    @return { promise }
      Resolves to the data requested.
*/
function pull(spec, params)
{
    var { paging, path, throttle, vars } = spec;
    var reps = { ...vars, ...(typeof params === 'object' ? params : { default: params }) };

    var execute = args =>
    {
        var request = () => send(spec, args).then(data => op.get(data, path))        
        return throttle ? redis.throttle(throttle, request) : request();
    }
    
    var { limit, type, lname, pname } = paging;
    
    if (pname) // get all results by page
    {
        var all = [];
        var page = next => execute({ ...reps, [lname]: limit, [pname]: next }).then(array => 
        {
            // potential provider error: limits/offsets not working
            if (!Array.isArray(array)) return all;
            
            all.push(...array);           
            return array.length < limit ? all : page(next + (type || limit));
        });
        
        return page(type);
    }
    
    return execute(reps);
}


/**
    Sends request for Cardano blockchain data.
    
    @param { string } spec
      Configuration for the request to make.
    @param { any, object } args
      Interpolation parameters for url.
      Used as a default replacement value if not an object.
    @return { promise }
      Resolves to the data requested.
*/
function send(spec, reps)
{
    var { method, headers, url, data } = spec;
    
    var options = { method, url: inter(url, reps), headers };
    // add data if there is data
    if (Object.keys(data).length) options.data = inter(data, reps);
            
    if (!prod) console.log('apex:', method.toUpperCase(), options.url);
    
    return axios(options);
}


var reBrace = /\{(.+?)\}/g;
function inter(target, reps)
{
    let polate = item =>
    {
        if (typeof item === 'string')
            return item.replace(reBrace, (m, s1) => reps.hasOwnProperty(s1) ? reps[s1] : reps.default);
        
        if (Array.isArray(item))
            return item.map(polate);
        
        if (typeof item === 'object')
            return Object.keys(item).reduce((o, k) => ({ ...o, [k]: polate(item[k]) }), {});
        
        return item;
    }
    
    return polate(target);
}


function resolve(name)
{
    if (!resolve.cache[name])
    {
        var { method, base, headers = {}, url = '', data, path, vars, throttle, paging } = config[name];
                
        if (base)
        {
            let pre = resolve(base);
            // rest method
            method = method || pre.method;
            // request headers
            headers = { ...pre.headers, ...headers };
            // concatenate url
            url = pre.url + url;
            // request data
            data = { ...pre.data, ...data };
            // path to data in request
            path = [ ...[].concat(pre.path), ...[].concat(path) ].filter(p => p || p === 0);
            // interpolation variables
            vars = { ...pre.vars, ...vars };
            // api throttling config
            throttle = throttle || pre.throttle;
            // api paging information
            paging = { ...pre.paging, ...paging };
        }
        
        resolve.cache[name] = { method, headers, url, data, path, vars, throttle, paging };
    }
    
    return resolve.cache[name];
}

resolve.cache = {};

module.exports = Object.keys(config).reduce((o, n) => ({ ...o, [n]: (...a) => pull(resolve(n), ...a) }), {});
