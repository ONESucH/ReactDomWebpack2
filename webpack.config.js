const path = require('path'),
    webpack = require('webpack'),
    CopyWebpackPlugin = require('copy-webpack-plugin'),
    webpackUglifyJsPlugin = require('webpack-uglify-js-plugin'),
    CleanCSSPlugin = require('less-plugin-clean-css'),
    config = {
        entry: './src/index.js',
        output: {
            path: path.resolve(__dirname, './dist/'),
            filename: 'bundle.js'
        }
    };

module.exports = (env, argv) => {

    if (argv.mode === 'development') {
        config.devtool = 'inline-source-map';
        config.mode = 'development';
        config.plugins = [
            new webpack.DefinePlugin({'process.env.NODE_ENV': JSON.stringify(argv.mode)}),
            new CopyWebpackPlugin([
                { from: './src/*.html', to: '' }
            ])
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
                    test: /\.tsx?$/,
                    use: 'ts-loader',
                    exclude: /node_modules/
                },
                {
                    test: /\.less$/,
                    use: [
                        {loader: 'style-loader'},
                        {loader: 'css-loader'},
                        {loader: 'less-loader'}
                    ]
                }
            ]
        };
        config.resolve = {
            extensions: ['.tsx', '.ts', '.js']
        };
        config.devServer = {
            contentBase: path.join(__dirname, './src/'),
            compress: true,
            port: 3000
        };
        config.watch = true;
    }

    if (argv.mode === 'production') {
        config.mode = 'production';
        config.plugins = [
            new webpackUglifyJsPlugin({
                cacheFolder: path.resolve(__dirname, './dist/'),
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
            new CopyWebpackPlugin([
                { from: './src/assets', to: 'assets' }
            ])
        ];
        config.module = {
            rules: [
                {
                    loader: 'less-loader', options: {
                        plugins: [
                            new CleanCSSPlugin({advanced: true})
                        ]
                    }
                },
                {
                    test: /\.(jpe?g|png|ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
                    use: 'base64-inline-loader?limit=1000&name=[name].[ext]'
                }
            ]
        }
    }

    return config;
};