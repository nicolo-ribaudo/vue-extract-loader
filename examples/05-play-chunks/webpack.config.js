"use strict";

const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const resolve = p => path.resolve(__dirname, p);

module.exports = {
    entry: {
        main: resolve("src/index.js"),
        "play/app": resolve("play/app.js"),
        "play/preview": resolve("play/preview.js"),
    },
    output: {
        filename: "[name].js",
        chunkFilename: "[id].chunk.js",
        path: resolve("dist"),
    },

    resolve: {
        alias: { "vue$": "vue/dist/vue.esm.js" },
    },
    resolveLoader: {
        alias: { "vue-extract-loader": require.resolve("../../") },
    },

    module: {
        rules: [ {
            test: /\.vue$/,
            use: {
                loader: "vue-loader",
                options: {
                    loaders: {
                        css: ExtractTextPlugin.extract("css-loader"),
                    },
                },
            },
        }, {
            test: /\.css$/,
            use: ExtractTextPlugin.extract("css-loader"),
        } ],
    },

    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: "vendor",
            minChunks: ({ resource }) => /node_modules/.test(resource),
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: "components",
            chunks: [ "main", "play/preview" ],
            minChunks: ({ resource }, count) => count >= 2 && /.vue$/.test(resource),
        }),
        new ExtractTextPlugin("[name].css"),
        new HtmlWebpackPlugin({
            filename: resolve("dist/index.html"),
            template: resolve("src/index.html"),
            chunks: [ "main", "vendor", "components" ],
        }),
        new HtmlWebpackPlugin({
            filename: resolve("dist/play/index.html"),
            template: resolve("play/index.html"),
            chunks: [ "play/app", "vendor" ],
        }),
        new HtmlWebpackPlugin({
            filename: resolve("dist/play/preview.html"),
            template: resolve("play/index.html"),
            chunks: [ "play/preview", "vendor", "components" ],
        }),
    ],

    devServer: {
        contentBase: resolve("dist"),
        port: 9000,
    },
}
