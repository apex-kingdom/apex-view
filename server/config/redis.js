var { createClient } = require('redis');
var { keyexp, redis_url } = require('./');


var client = createClient({ url: redis_url });

var redisEvents = 
{
    connect: () => { console.log('redis: client is connected.'); },
    end: () => { console.log('redis: client has been disconnected.'); },
    error: error => { console.log('redis: client error', error); },
    ready: () => { console.log('redis: client is ready for use.'); },
}
// handle redis events
Object.keys(redisEvents).forEach(key => client.on(key, redisEvents[key]));

var exit = () => client.quit()
// quit the client on process termination
['SIGINT', 'SIGTERM', 'SIGQUIT'].forEach(signal => process.on(signal, exit));

module.exports =
{
    jget: key => client.get(key).then(value => value ? JSON.parse(value) : null),
    jset: (key, value, ttl) => value && client.set(key, JSON.stringify(value), { EX: ttl || keyexp.default })
}

client.connect();
