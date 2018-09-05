const path = require('path'),
    webpack = require('webpack'),
    devServer = require('webpack-dev-server'),
    webpackUglifyJsPlugin = require('webpack-uglify-js-plugin'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    config = {
        entry: './src/index.ts',
        output: {
            path: path.resolve(__dirname, './dist'),
            filename: 'bundle.js'
        }
    };

module.exports = (env, argv) => {

    if (argv.mode === 'development') {
        config.watch = true;
        config.devtool = 'inline-source-map';
        config.mode = 'development';
        config.plugins = [
            new webpack.NamedModulesPlugin(),
            new webpack.NamedChunksPlugin(),
            new webpack.DefinePlugin({'process.env.NODE_ENV': JSON.stringify('development')}),
            new HtmlWebpackPlugin()
        ];
        config.module = {
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
                        {loader: 'style-loader'},
                        {
                            loader: 'css-loader',
                            options: {
                                modules: true
                            }
                        },
                        {loader: 'less-loader'}
                    ]
                },
                {
                    test: /\.tsx?$/,
                    use: 'ts-loader',
                    exclude: /node_modules/
                }
            ]
        };
        config.devServer = {
            contentBase: path.join(__dirname, 'dist'),
            compress: true,
            port: 3000
        };
        config.resolve = {
            extensions: ['.tsx', '.ts', '.js']
        };
    }

    if (argv.mode === 'production') {
        config.mode = 'production';
        config.plugins = [
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
            new webpack.optimize.ModuleConcatenationPlugin(),
            new webpack.NoEmitOnErrorsPlugin(),
            new HtmlWebpackPlugin()
        ]
    }

    return config;
};