
module.exports =
{
    // 3rd party apis
    apikeys:
    {
        blockfrost:
        [
            process.env.API_BLOCKFROST,
            process.env.API_BLOCKFROST_2
        ],
        koios:
        [
            process.env.API_KOIOS
        ],
        opencnft:
        [
            process.env.API_OPENCNFT,
            process.env.API_OPENCNFT_2
        ]
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
        // max 500 in 1 second with 25 per second cool
        blockfrost: { max: 450, cool: 1000, scale: 10 }, 
        // max 100 per 10 seconds
        koios: { max: 100, cool: 10000 },
        // max 5 per second
        opencnft: { max: 5, cool: 1010 }
    }
}
