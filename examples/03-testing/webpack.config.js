"use strict";

const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: "./test/index.js",
    output: {
        filename: "./bundle.js",
        path: path.resolve("dist-test"),
    },

    resolve: {
        extensions: [ ".js", ".vue" ],
    },

    resolveLoader: {
        alias: {
            // This is only needed in order to alias "vue-extract-loader" to
            // the root folder of this package.
            // You shouldn't do this in your project.
            "vue-extract-loader": require.resolve("../../"),
        },
    },

    module: {
        rules: [ {
            test: /.vue$/,
            issuer: path.join(__dirname, "test/index.js"),
            loader: "mocha-loader!vue-extract-loader?block=unit-test",
        }, {
            test: /\.vue$/,
            loader: "vue-loader",
        } ],
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: require.resolve("./test/index.html"),
        }),
    ],
};
