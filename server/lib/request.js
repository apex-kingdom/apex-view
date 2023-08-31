var axios = require('axios');
var op = require('object-path');
var config = require('../config/apis');
var redis = require('../config/redis');
var { prod, throttles } = require('../config');


/**
    Fetches Cardano blockchain data.
    
    Named fetches are defined in /config/chain-data.js
    
    @param { string } name
      Name of the request to make.
    @param { any, object } params
      Interpolation parameters for request.
    @param { string } pathname
      Path to the data needed from the request.
    @return { promise }
      Resolves to the data requested.
*/
function pull(name, params, pathname)
{
    let { root, paths, throttle } = resolve(name);
    
    let request = () => send(name, params).then(data => 
    {
        // resolve data to proper path
        let path = [root, paths[pathname]].filter(x => !!x).join('.');        
        return op.get(data, path);
    });
    
    return throttle ? redis.throttle(throttle, request) : request();
}


/**
    Sends request for Cardano blockchain data.
    
    @param { string } name
      Name of the request to make.
    @param { any, object } args
      Interpolation parameters for url.
      Used as a default replacement value if not an object.
    @return { promise }
      Resolves to the data requested.
*/
function send(name, args)
{
    let { method, headers, url, vars } = resolve(name);
    
    let reps = { ...vars, ...(typeof args === 'object' ? args : { default: args }) };
    // interpolate url
    url = url.replace(/\{(.+?)\}/g, (m, s1) => reps.hasOwnProperty(s1) ? reps[s1] : reps.default );

    let request = { url, method, headers };
    
    if (!prod) console.log('apex: sending', method.toUpperCase(), url);

    return axios({ url, method, headers });
}


function resolve(name)
{
    if (!resolve.cache[name])
    {
        let { method, base, headers = {}, url = '', root, paths, vars, throttle } = config[name];
                
        if (base)
        {
            let pre = resolve(base);
            // rest method
            method = method || pre.method;
            // request headers
            headers = { ...pre.headers, ...headers };
            // concatenate url
            url = pre.url + url;
            // request data root
            root = root || pre.root;
            // requst data paths
            paths = { ...pre.paths, ...paths };
            // interpolation variables
            vars = { ...pre.vars, ...vars };
            // api throttling config
            throttle = throttle || pre.throttle;
        }
        
        resolve.cache[name] = { method, headers, url, root, paths, vars, throttle };
    }
    
    return resolve.cache[name];
}

resolve.cache = {};

module.exports = Object.keys(config).reduce((o, n) => o = { ...o, [n]: (...a) => pull(n, ...a) }, {});
