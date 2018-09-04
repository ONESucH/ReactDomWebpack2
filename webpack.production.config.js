// webpack.production.config

const webpack = require('webpack'),
    webpackUglifyJsPlugin = require('webpack-uglify-js-plugin');

module.exports = {
    mode: 'production', // < -- Сборка production
    plugins: [
        new webpackUglifyJsPlugin({
            cacheFolder: path.resolve(__dirname, 'src/app/'),
            debug: true,
            minimize: true,
            sourceMap: false,
            output: {
                comments: false
            },
            compressor: {
                warnings: true
            }
        }),
        new webpack.webpackUglifyJsPlugin({'process.env.NODE_ENV': JSON.stringify('production')}),
        new webpack.optimize.ModuleConcatenationPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    ]
};