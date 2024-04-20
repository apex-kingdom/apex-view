var redis = require('../../../config/redis');


/**
    Api key rotation and request throttling.

    @param { string } spec
      Request configuration object.
*/
module.exports = function({ key })
{
    var { api, list } = key;
    
    if (list.length)
    {
        return (args, operation) => redis.incr(api + '_ctr').then(num => 
        {
            return operation({ ...args, apikey: list[(num - 1) % list.length] })            
        });
    }
    
    return (args, operation) => operation(args);
}
