"use strict";

const path = require("path");

module.exports = {
    entry: {
        app: "play/app.js",
        preview: "play/preview.js"
    },
    dist: "dist-play",
    port: 5000,

    // compile Vue template
    templateCompiler: true,
    hmrEntry: [ "preview" ],

    // no code split for 3rd party libraries
    vendor: false,
    html: [ {
        chunks: [ "app" ],
        filename: "index.html"
    }, {
        chunks: [ "preview" ],
        filename: "preview.html"
    } ],

    sourceMap: false,
    minimize: false,

    webpack(config) {
        config.resolveLoader.alias = {
            // This is only needed in order to alias "vue-extract-loader" to
            // the root folder of this package.
            // You shouldn't do this in your project.
            "vue-extract-loader": require.resolve("../../"),
        };

        config.module.rules.push({
            test: /.vue$/,
            issuer: path.join(__dirname, "play/index.js"),
            use: [ {
                loader: "babel-loader",
                options: { presets: [ "es2015" ] }
            }, {
                loader: "vue-extract-loader",
                options: { block: "play" },
            } ],
        });

        return config;
    },
}
