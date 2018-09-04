// config development
const config = {
        entry: './src/index.js'
        //...
    };

module.exports = (env, argv) => {
    
    if (argv.mode === 'development') {
        config.devtool = 'source-map';
    }

    if (argv.mode === 'production') {
        config.devtool = 'js'
    }

    return config;
};