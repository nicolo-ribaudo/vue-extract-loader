<template>
    <button :style="{ color: color }" :class="{ rounded }" @click="$emit('click')">
        <slot></slot>
    </button>
</template>

<script>
    export default {
        props: {
            color: {
                type: String,
                default: "blue",
            },
            rounded: Boolean,
        },
    };
</script>

<style scoped>
    button {
        border: 1px solid #e2e2e2;
        background-color: white;
        padding: 8px 20px;
    }

    .rounded {
        border-radius: 4px;
    }
</style>

<play>
    import { play } from "vue-play";
    import ColorfulButton from "./colorful-button.vue";

    play(ColorfulButton)
        .name("colorful-button")
        .add("with text", {
            template: `<colorful-button @click="inc">{{ counter }}</colorful-button>`,
            data: () => ({
                counter: 0,
            }),
            methods: {
                inc() { this.counter++; }
            },
        })
        .add("with emoji", `<colorful-button>😃🍻</colorful-button>`)
        .add("colorful", `<colorful-button color="pink">Hello world</colorful-button>`)
        .add("rounded", `<colorful-button rounded>Rounded</colorful-button>`);
</play>
