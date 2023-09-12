var paths = require('../paths');


module.exports =
[
    {
        name: 'serve-app',
        desc: `Serve the app via express (no build).`,
        fn: ({ exit, run }) =>
        {
            run.node(paths.server).on('close', exit);          
        }
    }
]
