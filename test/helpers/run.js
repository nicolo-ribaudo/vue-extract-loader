import vm from "vm";
import webpack from "webpack";
import MemoryFs from "memory-fs";

export default function run(webpackConfig) {
    return new Promise((resolve, reject) => {
        const config = Object.assign({
            output: { path: "/", filename: "test.build.js" },
        }, webpackConfig);

        config.resolveLoader = Object.assign({
            alias: {
                "vue-extract-loader": require.resolve("../../"),
                "string-loader": require.resolve("./string-loader"),
                "vue-loader": require.resolve("./vue-loader"),
            },
        }, config.resolveLoader);

        const mfs = new MemoryFs();
        const compiler = webpack(config);

        compiler.outputFileSystem = mfs;

        compiler.run((err, stats) => {
            if (err) {
                return reject(err);
            }

            if (stats.hasErrors()) {
                return reject(stats.compilation.errors[0]);
            }

            const bundle = mfs.readFileSync("/test.build.js").toString();

            resolve(vm.runInNewContext(bundle));
        });
    });
}
