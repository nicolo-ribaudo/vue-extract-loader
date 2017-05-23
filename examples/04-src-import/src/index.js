// This only imports the <info> block of the component.vue file
import info from "vue-extract-loader?block=info!./component.vue";

console.log(info);
