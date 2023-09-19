var axios = require('axios');
var op = require('object-path');
var config = require('../config/apis');
var redis = require('../config/redis');
var { apikeys, prod, throttles } = require('../config');


/**
    Fetches Cardano blockchain data.
    
    Named fetches are defined in /config/chain-data.js
    
    @param { string } spec
      Configuration for the request to make.
    @param { any, object } params
      Interpolation parameters for request.
    @return { promise }
      Resolves to the data requested.
*/
function pull(spec, params)
{
    var { key, paging, path, vars } = spec;
    var reps = { ...vars, ...(typeof params === 'object' ? params : { default: params }) };
    
    var execute = args =>
    {
        var request = () => send(spec, args).then(data => op.get(data, path))        
        var { api, list, set } = key;
        
        if (list.length)
        {
            return redis.incr(api + '_ctr').then(num => 
            {
                var index = (num - 1) % list.length;
                // update args for `request` function above
                args.apikey = list[index];                
                // throttle calls if necessary
                if (throttles[api])
                {
                    var name = `${api}_${set.indexOf(args.apikey)}`;
                    return redis.throttle({ ...throttles[api], name }, request);
                }
                
                return request();
            });
        }
        
        return request();
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
    
    var options = { method, url: inter(url, reps) };
    // interpolate headers and data
    if (Object.keys(headers).length) options.headers = inter(headers, reps);
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


function handler(name)
{
    var spec = resolve(name);
    
    var checkRetry = error =>
    {
        var { code, response: { status = 0, statusText } = {} } = error;
        
        var err = msg => console.error('apex-error:', msg, { status, code, statusText });
      
        if (status >= 500)
            return (err('api server issue'), false);

        if (status === 429)
            return (err('too many requests'), true);

        if (status >= 400)
            return (err('request cannot be fulfilled'), false);
            
        if (code === 'ECONNRESET' || code === 'ETIMEDOUT')
            return (err('api server connection reset or timeout'), true);
        
        return (err('an error occurred'), false);
    }
    
    return (...args) => 
    {
        let retries = 2;
        
        let operation = () => pull(spec, ...args).catch(error => 
        {
            if (checkRetry(error) && retries-- > 0)
            {
                console.log('apex: retrying', name, 'request for', ...args);
                return operation();
            }
            
            throw error;
        });
        
        return operation();
    }
}


function resolve(name)
{
    if (!resolve.cache[name])
    {
        var { method, base, headers = {}, url = '', data, path, api, vars, paging } = config[name];
        
        var key = { api, list: apikeys[api] || [] };
        
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
            // api config
            key = { api: key.api || pre.key.api, list: [ ...key.list, ...pre.key.list ] };
            // interpolation variables
            vars = { ...pre.vars, ...vars };
            // api paging information
            paging = { ...pre.paging, ...paging };
        }
        
        key.set = key.list.filter((k, i) => key.list.indexOf(k) === i);

        resolve.cache[name] = { method, headers, url, data, path, key, vars, paging };
    }
    
    return resolve.cache[name];
}

resolve.cache = {};

module.exports = Object.keys(config).reduce((o, n) => ({ ...o, [n]: handler(n) }), {});
