# vue-extraxt-loader
> A [Webpack](https://webpack.js.org) loader which extracts a single block from Vue single-file components.

**What is the difference with [vue-loader](https://github.com/vuejs/vue-loader)?**

Beside importing components, vue-loader can also load custom blocks. But you can't​ import only a custom block: vue-loader imports the whole file, and attaches the custom block to the component using an user-defined loader.

On the other hand, vue-extraxt-loader imports just the wanted block, ignoring the other parts of the file: this can be useful, for example, for importing a `<unit-test>` block from a testing framework.

## Install

You can install this package either using yarn or npm:

```
yarn add --dev vue-extraxt-loader

# or

npm install -D vue-extraxt-loader
```

## Usage

You can either use this loader inline, or add it to your `webpack.config.js` file.

<a name="warning-inline-loader"></a>
> ⚠️**WARNING**
>
> If `vue-extract-loader` and `vue-loader` are applied to the same import request, `vue-loader` gets ignored.
> This behavior can be useful if you set `vue-loader` for every `.vue` file, but you should ensure that `vue-extract-loader` doesn't get applied to too much paths.
> 
> For this reason, it is recommended to use `vue-extract-loader` inline.

### Options

| Option | Required | Description |
| ------------- |:-------------:| ----- |
| `block` | ✔️ | The name of the tag to import  |

### Examples and use cases

01. [Basic](./examples/01-base/) - A basic example which shows how to use this loader.
02. [vue-play](./examples/02-play) - Shows how to define an alias for the loader, so that you can `import "vue-play-loader!./component.vue"`.
03. [Testing](./examples/03-play) - Sets the loader in `webpack.config.js`, without applying it to too much paths. (see [the previous warning](#warning-inline-loader))
04. [Src import](./examples/04-src-import/) - This loader also works if the custom block specifies its value using the `src` attribute.
