
let min = 60, hour = min * 60, day = 24 * hour, week = 7 * day;

module.exports =
{
    // 3rd party api keys
    apikey:
    {
        blockfrost: process.env.API_BLOCKFROST,
        opencnft: process.env.API_OPENCNFT
    },
    // redis key expiration (seconds)
    keyexp: 
    {
        default: 1 * min,
        chain: 30 * day,
        collection: 2 * day,
        pool: 1 * week,
        token: 1 * day,
        tx: 1 * week
    },
    // server listening port
    port: process.env.PORT || 3000,
    // production flag
    prod: /^production$/i.test(process.env.NODE_ENV),
    // redis connection url
    redis_url: process.env.REDIS_URL,
    // api request throttling
    throttles:
    {
        opencnft: { max: 5, period: 1000 } // max 5 per 1 second
    }
}
