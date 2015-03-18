'use strict';
const path = require('path'),
    webpack = require('webpack'),
    WebpackDevServer = require('webpack-dev-server');

let server = new WebpackDevServer(webpack(config), {
    publicPath: config.output.publicPath,
    hot: true
});
