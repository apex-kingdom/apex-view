
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
        default: 60, // 1 min
        collection: 24 * 60 * 60, // 1 day
        pool: 7 * 24 * 60 * 60, // 1 week
        token: 24 * 60 * 60, // 1 day
        tx: 7 * 24 * 60 * 60 // 1 week
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
