import Vue from "vue";

// This imports the component defined in component.vue,
// without using vue-extract-loader
import Component from "./component.vue";

// This only imports the <info> block of the component.vue file
import info from "vue-extract-loader?block=info!./component.vue";

const App = Vue.extend(Component);

window.app = new App({ el: "#app" });

console.log(info);
