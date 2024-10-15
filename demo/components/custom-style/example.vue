<script>
export default {
  name: 'custom-style__example'
}
</script>
<script setup>
import { ElColorPicker, ElDatePicker } from 'element-plus'
import 'element-plus/es/components/color-picker/style/css'
import 'element-plus/es/components/date-picker/style/css'

import { ref, watch } from 'vue'
const i18n = 'ui.page.customStyle.hidden'
const result = ref({})
const elDemo = ref(null)
const elColorPickerRef = ref(null)
const elDatePickerRef = ref(null)

const demoDropdownLoading = ref(false)
const demoStatus = ref([])
const demoSelectingTag = ref({})

/* =============================================================================
 * = Brands
 * ========================================================================== */
const isBrandsNext = ref(false)
const brandList1 = {
  Tesla: 'https://www.svgrepo.com/show/446929/tesla.svg',
  Subaru: 'https://www.svgrepo.com/show/446930/subaru.svg',
  Volvo: 'https://www.svgrepo.com/show/446933/volvo.svg',
  Ferrari: 'https://www.svgrepo.com/show/446955/ferrari.svg',
  Ford: 'https://www.svgrepo.com/show/446869/ford.svg'
}
const brandList2 = {
  Honda: 'https://www.svgrepo.com/show/446876/honda.svg',
  Jaguar: 'https://www.svgrepo.com/show/446882/jaguar-alt.svg',
  Mazda: 'https://www.svgrepo.com/show/446894/mazda.svg',
  Peugeot: 'https://www.svgrepo.com/show/446905/peugeot.svg',
  Nissan: 'https://www.svgrepo.com/show/446904/nissan.svg'
}
const brands = ref(brandList1)

const toggleBrands = () => {
  if (demoDropdownLoading.value) {
    return
  }
  isBrandsNext.value = !isBrandsNext.value
  demoDropdownLoading.value = true

  brands.value = {}
  const timeout = 500
  const trigger = isBrandsNext.value ? brandList2 : brandList1
  Object.entries(trigger).forEach(([brand, url], index) => {
    setTimeout(() => {
      console.log(brand, index)
      brands.value[brand] = url
    }, timeout * index)
  })

  setTimeout(
    () => {
      demoDropdownLoading.value = false
    },
    timeout * Object.entries(trigger).length
  )
}
/* =============================================================================
 * = Color Picker
 * ========================================================================== */
const colorPicker = ref()
watch(colorPicker, (value) => {
  elDemo.value.pushTag({
    key: 'color',
    valueElm: `<span class="color-box" style="background-color: ${value}"></span>`,
    value: value
  })
})

/* =============================================================================
 * = Date Picker
 * ========================================================================== */
const datePicker = ref()

watch(datePicker, (value) => {
  elDemo.value.pushTag({
    key: 'date',
    value: `${value[0]} ~ ${value[1]}`
  })
})

const shortcuts = [
  {
    text: 'This year',
    value: () => {
      const end = new Date()
      const start = new Date(new Date().getFullYear(), 0)
      return [start, end]
    }
  },
  {
    text: 'Last 6 months',
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setMonth(start.getMonth() - 6)
      return [start, end]
    }
  }
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

    result = {{ result }}
    <v-tags-multiselect
      v-model="result"
      ref="elDemo"
      @status="(e) => (demoStatus = e)"
      @selecting-tag="(Object) => (demoSelectingTag = Object)"
      :conjunction="'AND'"
      :dropdownLoading="demoDropdownLoading"
    >
      <v-tag-dropdown value="brand">
        <v-tag-option title>
          <span class="v-hidden-in-tag">Brands</span>
          <span class="v-hidden-in-dropdown">Brand</span>
        </v-tag-option>

        <v-tag-option v-for="(value, key) in brands" :key="key" :value="key" class="car-brand">
          <svg class="car-brand__icon">
            <image :xlink:href="value" :src="value" />
          </svg>
          <span class="v-hidden-in-tag">{{ key }}</span>
        </v-tag-option>

        <v-tag-option class="car-next" divided @click="toggleBrands">
          {{ isBrandsNext ? 'prev' : 'next' }}
        </v-tag-option>
      </v-tag-dropdown>

      <v-tag-dropdown value="color">
        <v-tag-option title> color </v-tag-option>

        <v-tag-option class="car-color" @click="elColorPickerRef.show()">
          <el-color-picker v-model="colorPicker" ref="elColorPickerRef" />
        </v-tag-option>
      </v-tag-dropdown>

      <v-tag-dropdown value="date">
        <v-tag-option title> date </v-tag-option>
        <v-tag-option @click="elDatePickerRef.focus()">
          <el-date-picker
            v-model="datePicker"
            ref="elDatePickerRef"
            type="monthrange"
            unlink-panels
            range-separator="To"
            format="YYYY/MM/DD"
            value-format="YYYY-MM-DD"
            :shortcuts="shortcuts"
          />
        </v-tag-option>
      </v-tag-dropdown>
    </v-tags-multiselect>
  </div>
</template>

<style lang="scss">
#custom-style__example {
  margin-bottom: 240px;

  .car-brand__icon {
    margin-right: 3px;
  }
  .car-brand__icon,
  .car-brand__icon image {
    width: 25px;
    height: 25px;
  }

  .color-box {
    display: block;
    width: 15px;
    height: 15px;
    margin: 6px;
  }
}
</style>
