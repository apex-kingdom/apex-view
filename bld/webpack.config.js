var { ProvidePlugin } = require('webpack');
var CopyPlugin = require("copy-webpack-plugin");
var HtmlPlugin = require('html-webpack-plugin')
var { VueLoaderPlugin } = require('vue-loader');
var paths = require('../paths');
var vars = require('./vars');


var base =
{
    stats: { colors: true, builtAt: true, env: true, version: true },

    entry:
    {
        av: paths.sub(paths.source)('app.js')
    },

    output:
    {
        path: paths.public,
        filename: '[name].js',
        library: '[name]',
        libraryTarget: 'umd',
        umdNamedDefine: true
    },

    resolve:
    {
        alias:
        {
            _comps: paths.components,
            _root: paths.root,
            _source: paths.source,
            
            exude: '@captison/exude'
        },
        extensions: [ '.js', '.svg', '.vue', '.css' ]
    },

    module:
    {
        rules:
        [
            { test: /\.js$/, use: 'babel-loader' },
            { test: /\.vue$/, use: 'vue-loader' },
            { test: /\.svg$/, use: 'raw-loader' },
            { test: /\.css$/, use: ['style-loader', 'css-loader'] }
        ]
    },

    plugins:
    [
        new VueLoaderPlugin(),
        new ProvidePlugin({ app: paths.sub(paths.build)('vars') }), 
        new HtmlPlugin
        ({ 
            filename: 'index.html',
            template: paths.sub(paths.source)('app.html'),
            publicPath: '/pub'
        }),
        new CopyPlugin({ patterns: [ { context: paths.static, from: paths.sub('**')('*'), to: paths.public } ] })
    ]
}

var dev = ext => ({ ...base, mode: 'development', ...ext });
var prod = ext => ({ ...base, mode: 'production', ...ext });


module.exports = { dev, prod };
