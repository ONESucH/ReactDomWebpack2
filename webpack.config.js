// config development
const path = require('path'),
    config = {
        entry: './src/index.ts',
        output: {
            path: path.resolve(__dirname, './dist'),
            filename: 'bundle.js'
        }
    };

module.exports = (env, argv) => {

    if (argv.mode === 'development') {
        config.devtool = 'inline-source-map';
        config.devServer = {
            contentBase: path.join(__dirname, 'dist'),
            compress: true,
            port: 3000
        };
        config.watch = true;
    }

    if (argv.mode === 'production') {
        //...
    }

    return config;
};