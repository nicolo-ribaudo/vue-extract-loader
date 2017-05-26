"use strict";

module.exports = function loader(source) {
    return `module.exports = ${JSON.stringify(source)}`;
};
