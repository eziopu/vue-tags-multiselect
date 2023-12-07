# vue-tags-multiselect

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin) to make the TypeScript language service aware of `.vue` types.

If the standalone TypeScript plugin doesn't feel fast enough to you, Volar has also implemented a [Take Over Mode](https://github.com/johnsoncodehk/volar/discussions/471#discussioncomment-1361669) that is more performant. You can enable it by the following steps:

1. Disable the built-in TypeScript Extension
    1) Run `Extensions: Show Built-in Extensions` from VSCode's command palette
    2) Find `TypeScript and JavaScript Language Features`, right click and select `Disable (Workspace)`
2. Reload the VSCode window by running `Developer: Reload Window` from the command palette.

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

```js
// vue install
import 'vue-tags-multiselect/dist/style.css';
import VueTagsMultiselect from 'vue-tags-multiselect';
createApp(App).use(VueTagsMultiselect).mount("#app")
```

```js
import 'vue-tags-multiselect/dist/style.css';
import { vTagsMultiselect, vTagDropdown, vTagOption } from 'vue-tags-multiselect'
```
```html
<div style="background: white;color: black;">
  <v-tags-multiselect>
    <v-tag-dropdown value="country">
      <v-tag-option title>
        country
      </v-tag-option>
      <v-tag-option value="Māre">
        Māre
      </v-tag-option>
      <v-tag-option value="Eldia">
        Eldia
      </v-tag-option>
    </v-tag-dropdown>
  </v-tags-multiselect>
</div>
```
