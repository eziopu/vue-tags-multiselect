# Vue Tags Multiselect

> A complex multi-selector.

<a href="https://github.com/eziopu/vue-tags-multiselect/blob/main/LICENSE">
  <img alt="" src="https://img.shields.io/github/license/eziopu/vue-tags-multiselect?style=flat-square">
</a>
<a href="https://npmjs.com/package/vue-tags-multiselect">
  <img alt="" src="https://img.shields.io/npm/v/vue-tags-multiselect.svg?style=flat-square">
</a>
<a href="https://npmjs.com/package/vue-tags-multiselect">
  <img alt="npm bundle size" src="https://img.shields.io/bundlephobia/min/vue-tags-multiselect">
</a>
<a href="https://npmjs.com/package/vue-tags-multiselect">
  <img alt="" src="https://img.shields.io/npm/dt/vue-tags-multiselect.svg?style=flat-square">
</a>

-  This package consists of a two-layer structure, similar to a dropdown wrapping another dropdown.
- It copies the HTML content of the option as the display for the tag.

    or you can also generate options using data
- Finally, it will output an object containing keys and values.

![11111](https://github.com/user-attachments/assets/ce8e99e4-e548-4806-83a1-9449a5821bb0)

or use external component.
![2222](https://github.com/user-attachments/assets/36fd1805-49d0-40fb-9bc7-1afc3755f0eb)


## Demo

[https://eziopu.github.io/vue-tags-multiselect/](https://eziopu.github.io/vue-tags-multiselect/#/?framework=bootstrap)

## Install

```sh
npm install vue-tags-multiselect
```

### Setup

- In main.js you can mount it as a global Vue component

```js
// vue install
import 'vue-tags-multiselect/dist/style.css'
import VueTagsMultiselect from 'vue-tags-multiselect'
createApp(App).use(VueTagsMultiselect).mount('#app')
```

or

- In a specific component (e.g.: Component.vue)

```js
import 'vue-tags-multiselect/dist/style.css'
import { vTagsMultiselect, vTagDropdown, vTagOption } from 'vue-tags-multiselect'
```

### Usage

```html
<v-tags-multiselect v-model="result">
    <v-tag-dropdown value="country">
    <v-tag-option title>
      <i class="fa fa-flag"></i> Country
    </v-tag-option>
    <v-tag-option value="Māre"> Māre </v-tag-option>
    <v-tag-option value="Eldia"> Eldia </v-tag-option>
  </v-tag-dropdown>
    ...
</v-tags-multiselect>
```

or

```js
<v-tags-multiselect
  v-model="result"
  :options="{
    country: [
      {
        title: true,
        element: `<i class='fa fa-flag'></i> Country`
      },
      'Māre',
      'Eldia'
    ]
  }"
>
  ...
</v-tags-multiselect>
```
