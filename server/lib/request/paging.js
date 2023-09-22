
/**
    Request paging.

    @param { string } spec
      Request configuration object.
*/
module.exports = function({ paging })
{    
    if (paging && paging.name)
    {
        var { limit, limit_name, name, type } = paging;
      
        return (args, operation) =>
        {
            var all = [];
            
            var page = next => operation({ ...args, [limit_name]: limit, [name]: next }).then(array => 
            {
                // potential provider error: limits/offsets not working
                if (!Array.isArray(array)) return all;
                
                all.push(...array);           
                return array.length < limit ? all : page(next + (type || limit));
            });
            
            return page(type);
        }
    } 
        
    return (args, operation) => operation(args);
}
