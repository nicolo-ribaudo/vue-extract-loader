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

            // You can alias the loader to avoid repeating the configuration query
            "vue-play-loader": "vue-extract-loader?block=play",
        };

        return config;
    },
}
