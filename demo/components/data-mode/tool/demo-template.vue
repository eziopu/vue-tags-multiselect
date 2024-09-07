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
  <div :id="`data-mode-${props.label}`" class="demo" :class="demoStatus">
    <ToolTitle>{{ label }}</ToolTitle>

    <div class="flex-between to5-5">
      <div class="depiction">
        <slot name="depiction"></slot>

        <pre
          class="tag prettyprint lang-html customize"
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
