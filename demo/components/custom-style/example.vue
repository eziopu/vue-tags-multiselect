<script>
export default {
  name: 'custom-style__example'
}
</script>
<script setup>
import { ElColorPicker, ElDatePicker } from 'element-plus'
import 'element-plus/es/components/color-picker/style/css'
import 'element-plus/es/components/date-picker/style/css'

import { ref } from 'vue'
const i18n = 'ui.page.customStyle.hidden'
const demoStatus = ref([])

const icons = {
  Tesla: 'https://www.svgrepo.com/show/446929/tesla.svg',
  Subaru: 'https://www.svgrepo.com/show/446930/subaru.svg',
  Volvo: 'https://www.svgrepo.com/show/446933/volvo.svg',
  Ferrari: 'https://www.svgrepo.com/show/446955/ferrari.svg',
  Ford: 'https://www.svgrepo.com/show/446869/ford.svg',
  Honda: 'https://www.svgrepo.com/show/446876/honda.svg',
  Jaguar: 'https://www.svgrepo.com/show/446882/jaguar-alt.svg',
  Mazda: 'https://www.svgrepo.com/show/446894/mazda.svg',
  Peugeot: 'https://www.svgrepo.com/show/446905/peugeot.svg',
  Nissan: 'https://www.svgrepo.com/show/446904/nissan.svg'
}

const colorPicker = ref()
const datePicker = ref()

const shortcuts = [
  {
    text: 'This year',
    value: () => {
      const end = new Date()
      const start = new Date(new Date().getFullYear(), 0)
      return [start, end]
    },
  },
  {
    text: 'Last 6 months',
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setMonth(start.getMonth() - 6)
      return [start, end]
    },
  },
]
</script>

<template>
  <div id="custom-style__example" class="demo" :class="demoStatus">
    <ToolTitle>Example</ToolTitle>

    <div class="depiction">
      <p v-html="$t(`${i18n}.mains.1`)"></p>
      <p>該範例使用以下套件</p>
      <ul>
        <li>
          <p>
            icon 來至於
            <a href="https://www.svgrepo.com/collection/car-labels-flat-logos" target="_blank"
              >svgrepo</a
            >
          </p>
        </li>
        <li>
          <p>
            ColorPicker 來至於
            <a href="https://element-plus.org/zh-CN/component/color-picker.html" target="_blank"
              >element UI plus</a
            >
          </p>
        </li>
        <li>
          <p>
            DatePicker 來至於
            <a href="https://element-plus.org/zh-CN/component/date-picker.html" target="_blank"
              >element UI plus</a
            >
          </p>
        </li>
      </ul>
    </div>

    <div class="demo-color-block">
      <span class="demonstration"> colorPicker </span>
      <el-color-picker v-model="colorPicker" />
      <span> : {{ colorPicker }}</span>

    </div>

    <div class="block">
      <span class="demonstration"> datePicker </span>
      <el-date-picker
        v-model="datePicker"
        type="monthrange"
        unlink-panels
        range-separator="To"
        format="YYYY/MM/DD"
        value-format="YYYY-MM-DD"
        :shortcuts="shortcuts"
      />
      <span> : {{ datePicker }}</span>
    </div>

    <v-tags-multiselect v-model="result">
      <v-tag-dropdown value="country" display-all>
        <v-tag-option title>
          <span class="v-hidden-in-dropdown"> <i class="fa fa-flag-o"></i> </span>
          <span class="v-hidden-in-tag"> <i class="fa fa-flag"></i> 國家 </span>
          car
        </v-tag-option>

        <v-tag-option v-for="(value, key) in icons" :key="key" :value="key" class="car-brand">
          <svg class="car-brand__icon">
            <image :xlink:href="value" :src="value" />
          </svg>
          {{ key }}
        </v-tag-option>
        <v-tag-option value="Eldia">艾爾迪亞</v-tag-option>
      </v-tag-dropdown>
    </v-tags-multiselect>
  </div>
</template>

<style scoped lang="scss">
.car-brand__icon,
.car-brand__icon image {
  width: 25px;
  height: 25px;
}
@import './assets/stylesheets.scss';
</style>
