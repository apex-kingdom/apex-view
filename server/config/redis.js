var { createClient } = require('redis');
var { keyexp, prod, redis_url } = require('./');


var client = createClient({ url: redis_url });

var redisEvents = 
{
    connect: () => { console.log('apex: redis client is connected.'); },
    end: () => { console.log('apex: redis client has been disconnected.'); },
    error: error => { console.log('apex: redis client error', error); },
    ready: () => { console.log('apex: redis client is ready for use.'); },
}
// handle redis events
Object.keys(redisEvents).forEach(key => client.on(key, redisEvents[key]));
// quit the client on process termination
process.on('exit', () => client.quit());

var msg =
{
    usingCache: key => !prod && console.log('apex: using redis cached data for', key)
}

module.exports =
{
    clearCache: () => client.flushDb().then(() => console.log('apex: redis app cache cleared.')),    
    disconnect: () => client.disconnect(),
    
    incr: name => client.incr(name),
    
    jget: key => client.get(key).then(value => value ? (msg.usingCache(key), JSON.parse(value)) : null),
    jset: (key, value, ttl) => value && client.set(key, JSON.stringify(value), { EX: ttl || keyexp.default }),
    
    throttle: (throttle, operation) =>
    {
        var { name, max, cool, scale } = throttle;
        var decr = () => client.decr(name)
        
        var permit = () => 
        {
            return client.incr(name).then(count => new Promise((accept, reject) =>
            {
                if (count <= max)
                {                    
                    var wait = (Math.floor(Math.min(count, max) / scale) || 1) * cool;      
                    operation().then(accept).catch(reject).finally(() => setTimeout(decr, wait));
                }
                else
                {
                    decr().finally(() => setTimeout(() => accept(permit()), cool / max));
                }
            }));
        }
        
        return permit();        
    }
}

client.connect()
