"use strict";

const parse = require("./parser");
const loaderUtils = require("loader-utils");
const assert = require("assert");

const VUE_LOADER = /[\\/]vue-loader[\\/]/i;
const ERR_PREFIX = "[vue-extract-loader]";

module.exports = function loader(source, map) {
    const options = loaderUtils.getOptions(this) || {};
    assert(options.block, `${ERR_PREFIX} Missing block name.`);

    const block = parse(source).find(block => block.type === options.block);
    assert(block, `${ERR_PREFIX} The imported file doesn't have a <${options.block}> block.`);

    void map;

    if (block.attrs.src) {
        return `module.exports = require(${JSON.stringify(block.attrs.src)})`;
    }

    return block.content;
};

module.exports.pitch = function pitch() {
    const vueLoaderIndex = this.loaders.findIndex(loader =>
        VUE_LOADER.test(loader.path)
    );

    if (vueLoaderIndex !== -1) {
        // Remove vue-loader
        this.loaders.splice(vueLoaderIndex, 1);

        if (vueLoaderIndex < this.loaderIndex) {
            this.loaderIndex--;
        }
    }
};
