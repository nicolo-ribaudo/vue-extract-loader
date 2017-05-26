import test from "ava";
import path from "path";

import run from "./helpers/run";

const fixture = relative => path.resolve(__dirname, "fixtures", relative);
const config = ({ file, loader }) => ({
    entry: fixture(file),
    module: {
        rules: [ { test: /\.vue$/, loader } ],
    },
});

test("it throws if the block name is missing", async t => {
    const resultP = run(config({
        file: "basic.vue",
        loader: "vue-extract-loader",
    }));

    await t.throws(resultP, /\[vue-extract-loader\] Missing block name\./);
});

test("it throws if the block is missing in the file", async t => {
    const resultP = run(config({
        file: "basic.vue",
        loader: "vue-extract-loader?block=missing",
    }));

    await t.throws(
        resultP,
        /\[vue-extract-loader\] The imported file doesn't have a <missing> block\./
    );
});

test("it loads <template> tags", async t => {
    const result = await run(config({
        file: "basic.vue",
        loader: "string-loader!vue-extract-loader?block=template",
    }));

    t.is(result.trim(), "<div>Template content</div>");
});

test("it loads <style> tags", async t => {
    const result = await run(config({
        file: "basic.vue",
        loader: "string-loader!vue-extract-loader?block=style",
    }));

    t.is(result.trim(), ".css-class { color: blue }");
});

test("it loads <script> tags", async t => {
    const result = await run(config({
        file: "basic.vue",
        loader: "vue-extract-loader?block=script",
    }));

    t.deepEqual(result.default, { foo: "bar" });
});

test("it loads custom blocks", async t => {
    const result = await run(config({
        file: "basic.vue",
        loader: "string-loader!vue-extract-loader?block=custom",
    }));

    t.is(result.trim(), "This is a custom block.");
});

test("it loads external sources", async t => {
    const result = await run(config({
        file: "basic.vue",
        loader: "vue-extract-loader?block=external",
    }));

    t.deepEqual(result.default, { external: true });
});

test("it disables vue-loader if vue-extract-loader is before", async t => {
    const resultP = run(config({
        file: "basic.vue",
        loader: "vue-extract-loader?block=script!vue-loader",
    }));

    await t.notThrows(resultP);
});

test("it disables vue-loader if vue-extract-loader is after", async t => {
    const resultP = run(config({
        file: "basic.vue",
        loader: "vue-loader!vue-extract-loader?block=script",
    }));

    await t.notThrows(resultP);
});
