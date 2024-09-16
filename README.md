# vue-tags-multiselect

A complex multi-selector.

-  This package consists of a two-layer structure, similar to a dropdown wrapping another dropdown.
- It copies the HTML content of the option as the display for the tag.
- *or you can also generate options using data
- Finally, it will output an object containing keys and values.

![11111](https://github.com/user-attachments/assets/4af25ae7-4bdd-480f-834a-06ef6e402a57)

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
