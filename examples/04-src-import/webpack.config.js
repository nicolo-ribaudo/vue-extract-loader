"use strict";

const path = require("path");

module.exports = {
    entry: "./src/index.js",
    output: {
        filename: "./bundle.js",
        path: path.resolve("dist"),
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
            test: /\.vue$/,
            loader: "vue-loader",
        } ],
    },
};
