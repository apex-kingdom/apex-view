var chalk = require("chalk");
var path = require('path');
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var webpackConfig = require('./webpack.config');
var packson = require('../package.json');


module.exports =
[
    {
        name: 'build-dev',
        desc: `Bundle for development (${chalk.whiteBright(packson.main)}).`,
        fn: ({ exit, log }) =>
        {
            var config = webpackConfig.dev();

            webpack(config, (error, stats) =>
            {
                if (error) throw error;
                log(stats.toString(config.stats));
                exit();
            });
        }
    },
    {
        name: 'build-prod',
        desc: `Bundle for production (${chalk.whiteBright(packson.main)}).`,
        fn: ({ exit, log }) =>
        {
            var config = webpackConfig.prod();

            webpack(config, (error, stats) =>
            {
                if (error) throw error;
                log(stats.toString(config.stats));
                exit();
            });
        }
    },
    {
        name: 'serve-dev',
        desc: `Launches dev server (${chalk.whiteBright('port ' + webpackConfig.devServer.port)}).`,
        fn: () =>
        {
            new WebpackDevServer(webpackConfig.devServer, webpack(webpackConfig.dev())).start();
        }
    },
    {
        name: 'watch-dev',
        desc: `Bundle and serve for development.`,
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
