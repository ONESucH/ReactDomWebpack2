// webpack.production.config

const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'production',
    plugins: [
        new webpackUglifyJsPlugin({
            cacheFolder: path.resolve(__dirname, 'src/'),
            debug: true,
            minimize: true,
            sourceMap: true,
            output: {
                comments: false
            },
            compressor: {
                warnings: true
            }
        }),
        new webpack.webpackUglifyJsPlugin({'process.env.NODE_ENV': JSON.stringify('production')}),
        new webpack.optimize.ModuleConcatenationPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new HtmlWebpackPlugin()
    ]
};