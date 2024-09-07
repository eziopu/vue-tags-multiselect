<script>
export default {
  name: 'data-mode'
}
</script>
<script setup>
import DemoTemplate from './tool/demo-template.vue'
import ShowCodeBasic from './show-html-code/basic.vue'

const options = { country: ['Māre', 'Eldia'], remark: ['yes'] }
const options2 = { country: [{ title: true, element: 'country' }, 'Māre', 'Eldia'], remark: ['yes'] }
const options3 = [
  { value: 'country', disabled: true, values: ['Māre', 'Eldia'] },
  { value: 'remark', values: ['yes'] }
]
const options4 = [
  {
    value: 'country',
    displayAll: true,
    values: [{ title: true, element: '-country-' }, {divided: true, value: 'Māre'}, 'Eldia']
  },
  { value: 'remark', values: ['yes'] }
]
</script>

<template>
  <div id="data-mode" class="demo">
    <div class="depiction">
      <p>
        此方式並不與 template 方式衝突，兩者可共用
      </p>
      <p>
        可使用最基本的 object 輸入key values 即可 *demo1 
      </p>
      <p>
        也可以使用 object array 詳細設定參數，values 也是如此
      </p>
    </div>

    <DemoTemplate label="demo1" :datas="options">
      <template #depiction>
        <ShowCodeBasic></ShowCodeBasic>
      </template>
    </DemoTemplate>

    <DemoTemplate label="demo2" :datas="options2"></DemoTemplate>
    <DemoTemplate label="demo3" :datas="options3"></DemoTemplate>
    <DemoTemplate label="demo4" :datas="options4"></DemoTemplate>
  </div>
</template>
