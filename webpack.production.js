var path = require('path')
var webpack = require('webpack')
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var PATHS = {
    'build': path.join(__dirname, 'dist'),
    'images': path.join(__dirname, 'img')
}

module.exports = {
    devtool: 'cheap-module-eval-source-map',
    entry: [
        'webpack-hot-middleware/client',
        './index'
    ],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: ''
    },
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new ExtractTextPlugin("app.css")
    ],
    module: {
        loaders: [
            {
                test: /\.js$/,
                loaders: [ 'babel' ],
                exclude: /node_modules/,
                include: __dirname
            },{
                test: /\.css$/,
                loader: ExtractTextPlugin.extract("style-loader", "css-loader")
            },{
                test: /\.(ttf|eot|woff|woff2|svg)(\?.*$|$)/,
                loader : 'url-loader'
            },{
                test: /\.json$/,
                loader : 'json-loader'
            },{
                test: /\.(jpg|png|gif)(\?.*$|$)/,
                loader : 'file-loader?name=[path][name].[ext]',
                include: PATHS.images
            }
        ]
    }
}
