const path = require('path'),
    CopyWebpackPlugin = require('copy-webpack-plugin'),
    CleanCSSPlugin = require('less-plugin-clean-css'),
    HtmlWebPackPlugin = require('html-webpack-plugin'),
    config = {
        entry: './src/index.jsx',
        output: {
            path: path.resolve(__dirname, './dist/'),
            filename: 'bundle.js'
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
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader'
                    }
                },
                {
                    test: /\.css$/,
                    use: [
                        {loader: 'style-loader'},
                        {
                            loader: 'css-loader',
                            options: {
                                modules: true,
                                importLoaders: 1,
                                localIdentName: '[name]_[local]_[hash:base64]',
                                sourceMap: true,
                                minimize: true
                            }
                        }
                    ]
                }
            ]
        };
        config.plugins = [
            new HtmlWebPackPlugin({
                template: './src/index.html',
                filename: './index.html'
            })
        ];
        config.devServer = {
            contentBase: path.join(__dirname, './dist/'),
            compress: true,
            port: 3000
        };
        config.watch = true;
    }

    if (argv.mode === 'production') {
        config.mode = 'production';
        config.plugins = [
            new CopyWebpackPlugin([
                { from: './src/assets', to: 'assets' }
            ])
        ];
        config.module = {
            rules: [
                {
                    test: /\.css$/,
                    use: [
                        {loader: 'style-loader'},
                        {
                            loader: 'css-loader',
                            options: {
                                modules: true,
                                importLoaders: 1,
                                localIdentName: '[name]_[local]_[hash:base64]',
                                sourceMap: true,
                                minimize: true
                            }
                        }
                    ]
                },
                {
                    test: /\.(jpe?g|png|ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
                    use: 'base64-inline-loader?limit=1000&name=[name].[ext]'
                },
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
                }
            ]
        }
    }

    return config;
};