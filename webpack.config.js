var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: './router.js',
    output: {
        filename: 'router.js',
        path: path.join(__dirname,'static','js')
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
            }
        ]
    }
};