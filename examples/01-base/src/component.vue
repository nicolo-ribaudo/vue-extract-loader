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

<info>

export default {
    name: "component",
    author: "Nicolò Ribaudo",
    description: "An Hello World component",
    version: "0.1.0",
};

</info>
