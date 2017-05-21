"use strict";

const parse = require("./parser");
const loaderUtils = require("loader-utils");
const assert = require("assert");

const VUE_LOADER = /[\\/]vue-loader[\\/]/i;

function loadersToString(loaders) {
    return loaders.map(loader => loader.path + loader.query).join("!");
}

module.exports = function loader(source, map) {
    const options = loaderUtils.getOptions(this);
    assert(options.block, "[vue-extract-loader] Missing block name.");

    const block = parse(source).find(block => block.type === options.block);
    assert(block, `The imported file doesn't have a <${options.block}> block.`);

    void map;

    return block.content;
};

module.exports.pitch = function pitch() {
    const loaders = this.loaders.filter(loader =>
        !VUE_LOADER.test(loader.path)
    );

    if (loaders.length !== this.loaders.length) {
        const requireString = loaderUtils.stringifyRequest(
            this,
            `!${loadersToString(loaders)}!${this.resource}`
        );

        return `module.exports = require(${requireString})`;
    }
};
