var webpack = require('webpack');
var webpackConfig = require('./webpack.config');


module.exports =
[
    {
        name: 'build-dev',
        desc: `Build app for development.`,
        fn: ({ exit, log }) =>
        {
            var config = webpackConfig.dev();

            webpack(config, (error, stats) =>
            {
                if (error) throw error;
                log(stats.toString(config.stats));
                exit(0);
            });
        }
    },
    {
        name: 'build-prod',
        desc: `Build app for production.`,
        fn: ({ exit, log }) =>
        {
            var config = webpackConfig.prod();

            webpack(config, (error, stats) =>
            {
                if (error) throw error;
                log(stats.toString(config.stats));
                exit(0);
            });
        }
    },
    {
        name: 'watch-dev',
        desc: `Hot re-build app for development.`,
        fn: ({ log }) =>
        {
            var config = { ...webpackConfig.dev(), watch: true };

            webpack(config, (error, stats) =>
            {
                if (error) throw error;
                log(stats.toString(config.stats));
            });
        }
    }
]
