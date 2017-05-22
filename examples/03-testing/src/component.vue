<template>
    <p class="text">{{ message }}</p>
</template>

<script>

export default {
    data: () => ({
        message: "Hello World!",
    }),
}

</script>

<style>

.text {
    color: blue;
}

</style>

<unit-test>

import assert from "assert";

import Vue from "vue";
import Component from "./component.vue";

describe("component.vue", () => {
    it("exports an object", () => {
        assert.equal(typeof Component, "object");
    });

    describe("#data", () => {
        it("is a function", () => {
            assert.equal(typeof Component.data, "function");
        });

        it("sets the default values", () => {
            assert.equal(Component.data().message, "Hello World!");
        });
    });

    describe("rendering", () => {
        it("renders the correct message", () => {
            const Ctor = Vue.extend(Component);
            const el = document.createElement("div");

            const vm = new Ctor({ el }).$mount();

            assert.equal(vm.$el.textContent, "Hello World!");
        });

        it("renders the message with the correct class", () => {
            const Ctor = Vue.extend(Component);
            const el = document.createElement("div");

            const vm = new Ctor({ el }).$mount();

            assert(vm.$el.classList.contains("text"));
        });
    });
});

</unit-test>
