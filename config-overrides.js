const webpack = require('webpack');

module.exports = function override(config) {
    const fallback = config.resolve.fallback || {};
    Object.assign(fallback, {
        "crypto": require.resolve("crypto-browserify"),
        "stream": require.resolve("stream-browserify"),
        "path": require.resolve("path-browserify"),
        "url": require.resolve("url/"),
        "util": require.resolve("util/"),
        "fs": false,
        "http": require.resolve("stream-http"),
        "https": require.resolve("https-browserify"),
        "zlib": require.resolve("browserify-zlib"),
        "buffer": require.resolve("buffer/"),
        "assert": require.resolve("assert/"),
        "vm": require.resolve("vm-browserify"),
        "encoding": require.resolve("encoding")
    })
    config.resolve.fallback = fallback;
    config.plugins = (
        config.plugins || []
    ).concat([
        new webpack.ProvidePlugin({
            process: 'process/browser.js',
            Buffer: ['buffer', 'Buffer']
        })
    ]);
    config.ignoreWarnings = [/Failed to parse source map/];
    return config;
}