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

    <slot name="attributes">
      <div class="attributes">
        <LabelAndControls
          v-if="ACCEPTED_VALUES"
          :label="props.label"
          :values="ACCEPTED_VALUES"
          v-model="attributes[props.label]"
        />
        <LabelAndControls v-else :label="props.label" v-model="attributes[props.label]" />
        <span
          class="attribute__default_value"
          v-html="$t(`ui.general.defaultIs__key`, { key: String(defaultValue) })"
        ></span>
      </div>
    </slot>
    <slot name="general-demo">
      <GeneralDemo
        :app="attributes"
        :option="demoOptionSetting"
      ></GeneralDemo>
    </slot>
  </div>
</template>

<style scoped lang="scss">
.attributes {
  display: flex;
  align-items: center;
  margin-bottom: 6px;
}
.attribute__default_value {
  padding-left: 12px;
}
</style>
