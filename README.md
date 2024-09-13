# vue-tags-multiselect

A complex multi-selector.

## Install

```sh
npm install @eziopu/vue-tags-multiselect
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
