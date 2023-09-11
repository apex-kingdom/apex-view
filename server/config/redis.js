var { createClient } = require('redis');
var { keyexp, redis_url, throttles } = require('./');


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

module.exports =
{
    clearCache: () => client.flushDb().then(() => console.log('apex: redis app cache cleared.')),    
    disconnect: () => client.disconnect(),
    
    jget: key => client.get(key).then(value => value ? JSON.parse(value) : null),
    jset: (key, value, ttl) => value && client.set(key, JSON.stringify(value), { EX: ttl || keyexp.default }),
    
    throttle: (name, operation) =>
    {
        var { max, period, interval = period / max } = throttles[name], counter = 0;
        
        let permit = () => 
        {
            var lock = name + '-' + (counter++ % max);
            
            return client.set(lock, 'locked', { NX: true }).then(status => new Promise(accept =>
            {
                if (status)
                    setTimeout(() => operation().then(accept).finally(() => client.del(lock)), period);
                else
                    return setTimeout(() => accept(permit()), interval);
            }));
        }
        
        return permit();        
    }
}

client.connect()
