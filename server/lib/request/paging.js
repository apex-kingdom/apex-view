var op = require('object-path');


/**
    Request paging.

    @param { string } spec
      Request configuration object.
*/
module.exports = function({ paging })
{    
    if (paging && paging.name)
    {
        var { limit, limit_name, name, type, path } = paging;
        // no limit if not specified or zero
        if (limit <= 0) limit = Infinity;
      
        return (args, operation) =>
        {
            var all = [], whole = null;
            
            var page = next => operation({ ...args, [limit_name]: limit, [name]: next }).then(data => 
            {                
                var array = path ? op.get(data, path) : data;
                // potential provider error: limits/offsets not working
                if (!Array.isArray(array)) array = [];
                
                all.push(...array);
                whole = path ? { ...whole, ...data } : null;
                // we are done here if we received fewer items than the limit
                if (array.length < limit) return path ? (op.set(whole, path, all), whole) : all;

                return page(next + (type || limit));
            });
            
            return page(type);
        }
    } 
        
    return (args, operation) => operation(args);
}
