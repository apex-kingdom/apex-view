var axios = require('axios');
var op = require('object-path');
var { prod } = require('../../config');


/**
    Sends request for Cardano blockchain data.
    
    @param { string } spec
      Request configuration object.
    @param { any, object } reps
      Interpolation parameters for url.
      Used as a default replacement value if not an object.
    @return { promise }
      Resolves to the data requested.
*/
module.exports = function({ method, headers, url, data, path })
{
    return reps =>
    {
        // allow for setting headers/data structure directly
        if (reps.headers) headers = { ...headers, ...reps.headers };
        if (reps.data) data = { ...data, ...reps.data };
        // interpolate data as necessary
        var polated = inter({ url, headers, data }, reps);
        // remove empty data object to prevent axios from choking
        if (!polated.data || !Object.keys(polated.data).length) 
            delete polated.data;
                    
        if (!prod) console.log('apex:', method.toUpperCase(), polated.url);
        
        return axios({ method, ...polated }).then(data => op.get(data, path));
    }
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
