// webpack.production.config

const WebpackDevServer = require('webpack-dev-server'),
    webpack = require('webpack'),
    compiler = webpack({
        // configuration
    }),
    port = 3000,
    server = new WebpackDevServer(compiler, {
        contentBase: './src/index.js',
        hot: true,
        historyApiFallback: true,
        compress: true,
        clientLogLevel: 'info',
        quiet: false,
        noInfo: false,
        lazy: true,
        filename: 'webpack.bundle.js',
        watchOptions: {
            aggregateTimeout: 300,
            poll: 1000
        },
        publicPath: '/assets/',
        headers: {'X-Custom-Header': 'yes'},
        stats: {colors: true}
    });

module.exports = {
    mode: 'development', // < -- Сборка development
    devtool: 'eval',
    plugins: [
        new webpack.NamedModulesPlugin(),
        new webpack.NamedChunksPlugin(),
        new webpack.DefinePlugin({'process.env.NODE_ENV': JSON.stringify('development')}),
    ],
};

server.listen(port, () => {
    console.log('<a href="http://localhost:' + port + '">Сервер запущен по порту' + port + '</a>');
});