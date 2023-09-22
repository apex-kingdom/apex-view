var redis = require('../../config/redis');
var { throttles } = require('../../config');


/**
    Adds request throttling if configured.

    @param { string } spec
      Request configuration object.
*/
module.exports = function({ key })
{
    var { api, set } = key, throttle = throttles[api];
    
    if (throttle)
    {
        return (args, operation) =>
        {
            var ext = args.apikey ? set.indexOf(args.apikey) : 'index';
            return redis.throttle({ ...throttle, name: `${api}_${ext}` }, () => operation(args));                  
        }      
    }
    
    return (args, operation) => operation(args);
}
