<script>
export default {
  name: 'data-mode'
}
</script>
<script setup>
import DemoTemplate from './tool/demo-template.vue'
import ShowCodeBasic from './show-html-code/basic.vue'
import Parameter from './parameter.vue'

const options = { country: ['Māre', 'Eldia'], remark: ['yes'] }
const options2 = {
  country: [{ title: true, element: 'country' }, 'Māre', 'Eldia'],
  remark: ['yes']
}
const options3 = [
  { value: 'country', disabled: true, values: ['Māre', 'Eldia'] },
  { value: 'remark', values: ['yes'] }
]
const options4 = [
  {
    value: 'country',
    displayAll: true,
    class: ['v-red'],
    values: [{ title: true, element: '-country-'}, { divided: true, value: 'Māre', class: ['v-green'] }, 'Eldia']
  },
  { value: 'remark', values: ['yes'] }
]

const i18n = 'ui.page.dataMode'
</script>

<template>
  <div id="data-mode" class="demo">
    <div class="depiction">
      <p v-html="$t(`${i18n}.mains.1`)"></p>
      <p v-html="$t(`${i18n}.mains.2`)"></p>
      <p v-html="$t(`${i18n}.mains.3`)"></p>
    </div>

    <DemoTemplate label="demo1: {strings: [strings, strings]}" :datas="options">
      <template #depiction>
        <ShowCodeBasic></ShowCodeBasic>
      </template>
    </DemoTemplate>

    <DemoTemplate label="demo2: {strings: [object, strings]}" :datas="options2"></DemoTemplate>
    <DemoTemplate
      label="demo3: [object(values:[strings, strings]), object]"
      :datas="options3"
    ></DemoTemplate>
    <DemoTemplate
      label="demo4: [object(values:[object, object]), object]"
      :datas="options4"
    >
      <template #depiction>
        <p>class `v-red` style like custom-style demo page</p>
      </template>
    </DemoTemplate>

    <Parameter />
  </div>
</template>
