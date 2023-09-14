
let min = 60, hour = min * 60, day = 24 * hour, week = 7 * day;

module.exports =
{
    // 3rd party api keys
    apikey:
    {
        blockfrost: process.env.API_BLOCKFROST,
        koios: process.env.API_KOIOS,
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
    // application status message (blocks access when set)
    block_status: process.env.BLOCKING_STATUS,
    // api request throttling
    throttles:
    {
        blockfrost: { max: 100, period: 500 },
        koios: { max: 100, period: 10000 }, // max 100 per 10 seconds
        opencnft: { max: 5, period: 1000 } // max 5 per 1 second
    }
}
