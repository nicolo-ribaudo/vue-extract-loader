// This file needs to be in a folder in order to be
// treated as if it is the real vue-loader.

"use strict";

module.exports = function loader() {
    throw new Error("I'm vue-loader!");
};
