const path = require('path');
const miniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
    entry: {
        flow: './src/js/flow.js',
        home: './src/js/home.js',
        level: './src/js/level.js',
        output: './src/js/output.js',
        press: './src/js/press.js',
        temp: './src/js/temp.js',
        calibration: './src/js/calibration.js',
        keyboard: './src/js/keyboard.js',
        manuals: './src/js/manuals.js',
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
