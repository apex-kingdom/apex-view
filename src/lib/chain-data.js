import axios from 'axios'
import op from 'object-path'
import config from '../config/request'
import uid from './uid'


let cache = { data: {}, resolve: {} };
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
    return Promise.resolve(params).then(args => 
    {
        let cid = uid(name, args);
        
        if (!cache.data[cid])
            cache.data[cid] = send(name, args);
        
        return cache.data[cid];
    })
    // resolve data to proper path
    .then(data => 
    {
        let { root, paths } = resolve(name);
        let path = [root, paths[pathname]].filter(x => !!x).join('.');
        
        return op.get(data, path);
    })
    // handle any errors
    .catch(err => 
    {
        // TODO: handle errors!
        console.error(name, err);
    })
    .then(d => (console.log(name, d), d))    
}


/**
    Sends request for Cardano blockchain data.
    
    @param { string } name
      Name of the request to make.
    @param { any, object } params
      Interpolation parameters for request.
      This value is used as a default replacement value if not an object.
    @return { promise }
      Resolves to the data requested.
*/
function send(name, args)
{
    let { method, headers, url, vars, preps } = resolve(name);

    let reps = { ...vars, ...(typeof args === 'object' ? args : { default: args }) };
    // interpolate url
    url = url.replace(/\{(.+?)\}/g, (m, s1) => 
    {
        let val = reps.hasOwnProperty(s1) ? reps[s1] : reps.default;
        return (preps[s1] || (v => v))(val);
    });

    return axios({ url, method, headers });
}


function resolve(name)
{
    if (!cache.resolve[name])
    {
        let { method, base, headers = {}, url = '', root, paths, vars, preps } = config[name];
                
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
            // processing functions for variables
            preps = { ...pre.preps, ...preps };
        }
        
        cache.resolve[name] = { method, headers, url, root, paths, vars, preps };
    }
    
    return cache.resolve[name];
}


export default Object.keys(config).reduce((o, n) => o = { ...o, [n]: (...a) => pull(n, ...a) }, {});
