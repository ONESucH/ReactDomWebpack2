const path = require('path');

const components = [
    './src/index.js',
    './src/main/main.component.ts',
    './src/header/header.component.ts',
    './src/footer/footer.component.ts'
];

module.exports = {
    entry: './src/main.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    watch: true
};