const path = require('path');
const miniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
    entry: {
        home: './src/index.js',
        // request: './src/request.js',
        // search: './src/search.js',
        // add: './src/add.js',
        // dashboard: './src/dashboard.js',
        // document: './src/document.js',
        // login: './src/login.js',
        // registration: './src/registration.js',
        // activation: './src/activation.js',
        // about: './src/about.js',
        // error: './src/error.js'
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: 'dist'
    },
    module: {
        rules: [{
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: '/node_modules'
        }, {
            test: /\.css$/,
            use: [
                miniCssExtractPlugin.loader,
                "css-loader"
            ]
        }]
    },
    devServer: {
        port: process.env.PORT || 3000,
        overlay: true
    },
    plugins: [
        new miniCssExtractPlugin({
            filename: "[name].css",
        })
    ]
}