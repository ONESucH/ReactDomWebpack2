/* [path][name].[ext]?[hash] */
const path = require('path'),
    CopyWebpackPlugin = require('copy-webpack-plugin'),
    HtmlWebPackPlugin = require('html-webpack-plugin'),
    config = {
        entry: './src/index.jsx',
        output: {
            path: path.resolve(__dirname, './dist/'),
            filename: 'bundle.js',
            publicPath: '/',
            sourceMapFilename: '[file].map'
        }
    };

module.exports = (env, argv) => {

    if (argv.mode === 'development') {
        config.mode = 'development';
        config.devtool = 'inline-source-map';
        config.module = {
            rules: [
                {
                    test: /\.(js|jsx|ts)?$/,
                    exclude: /(node_modules|bower_components)/,
                    use: {
                        loader: 'babel-loader'
                    }
                },
                {
                    test: /\.less$/,
                    use: [
                        {loader: 'style-loader'},
                        {loader: 'css-loader'},
                        {
                            loader: 'less-loader',
                            options: {
                                paths: [
                                    path.resolve(__dirname, 'node_modules')
                                ]
                            }
                        }
                    ]
                },
                {
                    test: /\.(png|woff|woff2|eot|ttf|svg)$/, loader: 'url-loader?limit=100000'
                }
            ]
        };
        config.resolve = {
            extensions: ['', '.js', '.jsx', '.ts']
        }
        config.plugins = [
            new HtmlWebPackPlugin({
                template: './src/index.html',
                filename: './index.html'
            })
        ];
        config.devServer = {
            contentBase: './src/',
            compress: true,
            inline: true,
            hot: true,
            port: 3000,
            historyApiFallback: true
        };
        config.watch = true;
    }

    if (argv.mode === 'production') {
        config.mode = 'production';
        config.plugins = [
            new HtmlWebPackPlugin({
                template: './src/index.html',
                filename: './index.html'
            }),
            new CopyWebpackPlugin([
                {from: './src/assets', to: 'assets'}
            ])
        ];
        config.resolve = {
            extensions: ['.js', '.jsx', '.ts']
        };
        config.target = 'web';
        config.module = {
            rules: [
                {
                    test: /\.(html)$/,
                    use: {
                        loader: 'html-loader',
                        options: {
                            minimize: true,
                            removeComments: true,
                            collapseWhitespace: true
                        }
                    }
                },
                {
                    test: /\.less$/,
                    use: [{
                        loader: 'style-loader'
                    }, {
                        loader: 'css-loader'
                    }, {
                        loader: 'less-loader', options: {
                            paths: [
                                path.resolve(__dirname, 'node_modules')
                            ]
                        }
                    }]
                },
                {
                    test: /\.(js|jsx|ts)?$/,
                    exclude: /(node_modules|bower_components)/,
                    use: {
                        loader: 'babel-loader'
                    }
                },
                {
                    test: /\.(png|woff|woff2|eot|ttf|svg)$/, loader: 'url-loader?limit=100000'
                },
                {
                    test: /\.(jpe?g|png|ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
                    use: 'base64-inline-loader?limit=1000&name=[name].[ext]'
                },
            ]
        };
        config.output = {
            publicPath: path.join(__dirname, './dist/') // удалить, чтобы убрать в путях ссылки D://
        }
    }

    return config;
};