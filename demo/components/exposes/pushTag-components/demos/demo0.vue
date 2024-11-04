<script>
export default {
  name: 'exposes-pushTag__demo0'
}
</script>

<script setup>
import { ElColorPicker, ElDatePicker } from 'element-plus'
import ShowCodeHtml from './show-codes/demo0-html.vue'
import ShowCodeJS from './show-codes/demo0-js.vue'

import 'element-plus/es/components/color-picker/style/css'
import 'element-plus/es/components/date-picker/style/css'

import { ref, watch } from 'vue'
const i18n = 'attributes.exposes.pushTag__details.demo0'

const result = ref({})
const elVTagsMultiselect = ref(null)
const elColorPickerRef = ref(null)
const elDatePickerRef = ref(null)

const demoDropdownLoading = ref(false)

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
const colorPicker = ref(null)
watch(colorPicker, (value) => {
  elVTagsMultiselect.value.pushTag({
    key: 'color',
    valueElm: `<span class="color-box" style="background-color: ${value}"></span>`,
    value: value
  })
})

/* =============================================================================
 * = Date Picker
 * ========================================================================== */
const datePicker = ref([])
watch(datePicker, (value) => {
  elVTagsMultiselect.value.pushTag({
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
  <div id="exposes-pushTag__pushTag-demo0" class="demo">
    <h4 class="ui title method-pushTag__parameter--title">Demo 1 : In option</h4>

    <div class="depiction">
      <p v-html="$t(`${i18n}.description`)"></p>

      <div class="sub-depiction">
        *<span v-html="$t(`${i18n}.notice`)"></span>
        <p v-html="$t(`${i18n}.comment`)"></p>
      </div>
    </div>
    
    <div>
      result = {{ result }}
      <v-tags-multiselect
        v-model="result"
        ref="elVTagsMultiselect"
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
            <span class="v-hidden-in-tag car-brand__name">{{ key }}</span>
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
    <div class="flex-between to6-4">
      <div>
        <ShowCodeHtml />
      </div>
      <div>
        <ShowCodeJS />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import '../../assets/stylesheets.scss';
</style>

<style lang="scss">
html.dark-theme #exposes-pushTag__pushTag-demo0 {
  .car-brand__icon image {
    filter: invert(1);
  }
  .el-range-input {
    color: #212529;
  }
}

#exposes-pushTag__pushTag-demo0 {
  .car-brand__name {
    margin-left: 6px;
  }
  .car-brand__icon,
  .car-brand__icon image {
    width: 25px;
    height: 25px;
  }
  
  .v-tag__value {
    .car-brand__icon,
    .car-brand__icon image {
      width: 20px;
      height: 20px;
    }
  }


  .color-box {
    display: block;
    width: 15px;
    height: 15px;
  }
}
</style>
