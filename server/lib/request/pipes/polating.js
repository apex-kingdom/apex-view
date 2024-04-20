
/**
    Constructs a pipeline function for interpolating request data.
    
    @param { string } spec
      Request configuration object.
    @return { function }
      Pipeline function.
*/
module.exports = function({ headers, url, data })
{
    /**
        Interpolates data for sending request.
        
        @param { object } args
          Interpolation parameters for request data.
        @return { promise }
          Resolves to the interpolated request data.
    */
    return (args, operation) =>
    {
        // allow for setting headers/data structure directly
        if (args.headers) headers = { ...headers, ...args.headers };
        if (args.data) data = { ...data, ...args.data };
        // interpolate data as necessary
        var polated = inter({ url, headers, data }, args);
        // remove empty data object to prevent axios from choking
        if (!polated.data || !Object.keys(polated.data).length) 
            delete polated.data;
        
        return operation(polated);
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
