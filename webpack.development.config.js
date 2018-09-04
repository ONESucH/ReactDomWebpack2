// webpack.production.config

const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    devtool: 'eval',
    plugins: [
        new webpack.NamedModulesPlugin(),
        new webpack.NamedChunksPlugin(),
        new webpack.DefinePlugin({'process.env.NODE_ENV': JSON.stringify('development')}),
        new HtmlWebpackPlugin()
    ],
    module: {
        rules: [
            {
                test: /\.ts$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.less$/,
                use: [
                    { loader: 'style-loader' },
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true
                        }
                    },
                    { loader: 'less-loader' }
                ]
            },
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: [ '.tsx', '.ts', '.js' ]
    }
};