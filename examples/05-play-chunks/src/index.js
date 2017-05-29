import Vue from "vue";
import ColorfulButton from "./colorful-button.vue";

window.app = new Vue({
    el: "#app",
    data: {
        loaderName: "vue-extract-loader",
    },
    components: {
        ColorfulButton,
    },
    methods: {
        goToPlay() {
            window.location.href = window.location.href.replace(
                /(?=index.html)?$/i,
                "play/index.html"
            );
        },
    },
});
