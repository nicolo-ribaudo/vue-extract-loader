"use strict";

const compiler = require("vue-template-compiler");

module.exports = function parse(source) {
    const output = compiler.parseComponent(source, { pad: "line" });

    return [
        output.script,
        output.template,
        ...output.styles,
        ...output.customBlocks,
    ].filter(Boolean);
};
