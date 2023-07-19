const NodePolyfillPlugin = require('node-polyfill-webpack-plugin')
const webpack = require('webpack');

module.exports = function override (config, env) {
    config.resolve.fallback = Object.assign(config.resolve.fallback || {}, {
                "fs": false,
                "tls": false,
                "net": false,
                "zlib": require.resolve("browserify-zlib") ,
                "path": require.resolve("path-browserify"),
                "querystring": false,
                "buffer": require.resolve("buffer"),
              crypto: require.resolve('crypto-browserify'),
              stream: require.resolve('stream-browserify'),
              assert: require.resolve('assert'),
              http: require.resolve('stream-http'),
              https: require.resolve('https-browserify'),
              os: require.resolve('os-browserify'),
              url: require.resolve('url')
            })


            config.plugins = (config.plugins || []).concat([
                new webpack.ProvidePlugin({
                  process: 'process/browser',
                  Buffer: ['buffer', 'Buffer']
                })
              ])
              return config
            }