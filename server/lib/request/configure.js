var apis = require('./apis');
var { apikeys } = require('../../config');


let cache = {};
/**
    Resolves a request configuration to its final form.
    
    @param { string } name
      Name of the config to resolve.
    @return { object }
      The resolved (merged) configuration object.
*/
module.exports = function resolve(name)
{
    if (!cache[name])
    {
        var { method, base, headers, url, data, defarg, path, api, batch, vars, paging } = apis[name];
        
        var key = { api, list: apikeys[api] || [] };
        
        if (base)
        {
            let pre = resolve(base);
            // rest method
            method = method || pre.method;
            // request headers
            headers = { ...pre.headers, ...headers };
            // concatenate url
            url = (pre.url || '') + (url || '');
            // request data
            data = { ...pre.data, ...data };
            // name of default url parameter
            defarg = defarg || pre.defarg;
            // path to data in request
            path = [ ...[].concat(pre.path), ...[].concat(path) ].filter(p => p || p === 0);
            // api config
            key = { api: key.api || pre.key.api, list: [ ...key.list, ...pre.key.list ] };
            // distinct item request limit
            batch = batch || pre.batch;
            // interpolation variables
            vars = { ...pre.vars, ...vars };
            // api paging information
            paging = { ...pre.paging, ...paging };
        }
        
        key.set = key.list.filter((k, i) => key.list.indexOf(k) === i);

        cache[name] = { name, method, headers, url, data, defarg, path, key, batch, vars, paging };
    }
    
    return cache[name];
}
