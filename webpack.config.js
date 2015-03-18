/**
 * Created by chopper on 3/16/15.
 */
var webpack = require('webpack');
module.exports = {
    devtool: 'source-map',
    entry: [
        './src/routes.js'
    ],
    output: {
        path: __dirname,
        filename: 'bundle.js',
        publicPath: '/src'
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
        })
    ],
    resolve: {
        extensions: ['', '.js']

    },
    module: {
        loaders: [
            {test: /\.js$/, loaders: ['react-hot', 'babel'], exclude: /node_modules/}
        ]
    }
};
