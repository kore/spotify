var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var Visualizer = require('webpack-visualizer-plugin');

module.exports = {  
    entry: {
        bundle: [
            "bootstrap-sass!./src/bootstrap.config.js",
            "./src/js/kabiko.js",
        ],
        pdf: [
            "./src/js/pdf.js",
        ],
        tests: [
            "./test/js/suite.js",
        ],
    },
    output: {
        path: __dirname + "/src/htdocs/assets/",
        filename: "[name].min.js",
    },
    module: {
        loaders: [
            { test: /bootstrap\/js\//, loader: 'imports?jQuery=jquery' },

            { test: /\.jsx?$/, loader: 'babel-loader', exclude: [/node_modules/, /pdfmake.js$/] },

            { test: /\.json?$/, loader: 'json-loader', },

            { test: /\.css$/, loader: "style!css" },
            { test: /\.woff2?$/, loader: "url-loader?limit=10000&mimetype=application/font-woff" },
            { test: /\.ttf$/, loader: "file-loader" },
            { test: /\.eot$/, loader: "file-loader" },
            { test: /\.svg$/, loader: "file-loader" },
        ],
        target: "web"
    },
    plugins: [
        new Visualizer({
            // Relative to output.path
            filename: './../../../build/jsBuildSize.html',
        }),
        new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /de\./),
        new webpack.NoErrorsPlugin(),
        new ExtractTextPlugin("./bundle.min.css"),
        new webpack.ProvidePlugin({
            jQuery: "jquery"
        }),
    ]
};
