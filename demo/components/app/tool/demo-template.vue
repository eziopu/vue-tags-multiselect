<script>
export default {
  name: 'app-demo-template'
}
</script>

<script setup>
import { ATTRIBUTES, ATTRIBUTE_ACCEPTED_VALUES } from '@models/attributes/default.js'
import { reactive } from 'vue'

const props = defineProps({
  label: String,
  label2: String,
  selected: Boolean,
  selected2: Boolean,
  valueInversion: Boolean
})

const ACCEPTED_VALUES = ATTRIBUTE_ACCEPTED_VALUES[props.label]
const defaultValue = ATTRIBUTES[props.label]
const isEmpty = defaultValue != undefined ? false : true

const attributes = reactive({
  [props.label]: props.valueInversion ? !defaultValue : defaultValue
})
if (props.label2 != undefined) {
  attributes[props.label2] = ATTRIBUTES[props.label2]
}

const demoOptionSetting = {
  country: [{}, { selected: props.selected }, { selected: props.selected2 }]
}
</script>

<template>
  <div v-if="isEmpty">
    <p>-----------------------------</p>
    <p>---- {{ props.label }} is empty ----</p>
    <p>-----------------------------</p>
  </div>

  <div v-else :id="`app-${props.label}`" class="demo">
    <ToolTitle>{{ $toUpperCaseFirstLetter($toCamelCase(props.label)) }}</ToolTitle>

    <div class="depiction">
      <p>
        {{ $t(`attributes.app.${props.label}`) }}
      </p>
      <slot name="depiction"></slot>
      <slot name="accepted-values">
        <ul v-if="ACCEPTED_VALUES">
          <li v-for="index in ACCEPTED_VALUES" :key="index">
            <p v-html="$t(`attributes.app.${props.label}__parameters.${index}`)"></p>
          </li>
        </ul>
      </slot>
    </div>

    <div
      class="attributes with-demo-control"
      :class="{ 'flex-between to5-5': props.label2 != undefined }"
    >
      <div class="attribute">
        <LabelAndControls
          :label="props.label"
          :values="ACCEPTED_VALUES || ['true', 'false']"
          :model="ACCEPTED_VALUES == null ? 'select' : 'radio'"
          v-model="attributes[props.label]"
        >
        </LabelAndControls>

        <span
          class="attribute__default_value"
          v-html="$t(`ui.general.defaultIs__key`, { key: String(defaultValue) })"
        ></span>
      </div>

      <div class="attribute" v-if="props.label2 != undefined">
        <LabelAndControls
          :label="props.label2"
          :values="ATTRIBUTE_ACCEPTED_VALUES[props.label2] || ['true', 'false']"
          v-model="attributes[props.label2]"
        >
        </LabelAndControls>
      </div>
    </div>

    <slot name="general-demo">
      <GeneralDemo :app="attributes" :option="demoOptionSetting"></GeneralDemo>
    </slot>
  </div>
</template>

<style scoped lang="scss">
.attributes .attribute {
  display: flex;
  align-items: center;
  margin-bottom: 6px;
}
.attribute__default_value {
  padding-left: 12px;
}
</style>
