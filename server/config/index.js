
module.exports =
{
    // 3rd party api keys
    apikey:
    {
        blockfrost: process.env.API_BLOCKFROST
    },
    // default redis key expiration (seconds)
    keyexp: 
    {
        default: 60, // 1 min
        // account: 5 * 60, // 5 min
        pool: 7 * 24 * 60 * 60, // 1 week
        // stake: 60, // 1 min
        token: 24 * 60 * 60, // 1 day
        tx: 7 * 24 * 60 * 60 // 1 week
    },
    // server listening port
    port: process.env.PORT || 3000,
    // production flag
    prod: /^production$/i.test(process.env.NODE_ENV),
    // redis connection url
    redis_url: process.env.REDIS_URL
}
