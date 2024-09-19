<script>
export default {
  name: 'data-mode-demo-template'
}
</script>

<script setup>
import { ref } from 'vue'
const props = defineProps({
  datas: [Array, Object],
  label: String
})

const demoStatus = ref([])
</script>

<template>
  <div :id="`data-mode-${props.label}`" class="demo data-mode" :class="demoStatus">
    <ToolTitle>{{ label }}</ToolTitle>

    <div class="flex-between to5-5">
      <div class="depiction">
        <slot name="depiction"></slot>

        <pre
          class="prettyprint lang-js"
        ><code>cosnt datas = {{ datas }}</code></pre>
      </div>

      <GeneralDemo
        v-model="demoStatus"
        :autoFocus="true"
        :displayOutput="true"
        :displayShowCodeBtn="false"
        :app="{
          options: datas
        }"
        :dropdown="{
          name: { isDisplayForDemo: false },
          country: { isDisplayForDemo: false },
          remark: { isDisplayForDemo: false }
        }"
      >
      </GeneralDemo>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import '../assets/stylesheets.scss';
</style>

<style lang="scss">
.data-mode.demo {
  .v-dropdown.v-red {
    color: red;
  }
  .v-dropdown.v-red .v-option.title {
    font-weight: bold;
  }
  .v-tag.v-red {
    color: white;
    background: red;
  }
  .v-tag.v-red .v-tag__title {
    font-weight: bold;
    background: #ff6666;
  }

  .v-tags-multiselect__main--dropdowns.stash.v-red .undo {
    color: red;
  }
  .v-tags-multiselect__main--dropdowns.stash.v-red .undo .demo__arrow-left {
    border-color: red;
  }
  .v-green {
    color: green;
  }
}
</style>
