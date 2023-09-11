var { prod } = require('../config');


if (prod)
{
    var exit = 0;
    // only require redis here due to autoconnect
    var redis = require('../config/redis');
    
    redis.clearCache()
      .then(redis.disconnect)
      .catch(() => exit = 1)
      .finally(() => process.exit(exit));
} 
