/**
 * Created by chopper on 3/16/15.
 */
var webpack = require('webpack');
module.exports = {
    devtool: 'source-map',
    entry: [
        './scripts/index'
    ],
    output: {
        path: __dirname + '/dist',
        filename: 'bundle.js',
        publicPath: '/'
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    ],
    resolve: {
        extensions: ['', '.js']

    },
    module: {
        loaders: [
            {
                test: /\.json$/,
                loader: 'json'
            },
            {
                test: /\.j(s|sx)$/,
                loader: 'react-hot!es6-loader!jsx-loader?harmony',
                exclude: /node_modules/
            },
        ],
        noParse: /lie.js/
    }
};
