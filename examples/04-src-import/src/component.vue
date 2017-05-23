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

<info src="./component.info.js"></info>
