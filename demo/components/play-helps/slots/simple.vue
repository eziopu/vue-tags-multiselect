<script>
export default {
  name: 'play-slots-simple'
}
</script>
<script setup>
import { inject, getCurrentInstance } from 'vue'
import { GET_ATTRIBUTE_INVALID_REASON } from '../../models.js'

const { $toKebabCase } = getCurrentInstance().appContext.config.globalProperties

const framework = inject('framework')
const appAttributes = inject('attributes')
const appSlots = inject('slots')

const labelToKebabCase = (input) => {
  return input != 'optionORConjunction' ? $toKebabCase(input) : 'option-OR-conjunction'
}
</script>

<template>
  <div
    id="play-slots-simple"
    class="simple attributes"
    :class="{
      ui: framework == 'semantic-ui',
      default: framework == 'default'
    }"
  >
    <template v-for="(attribute, key) in appSlots" :key="key">
      <template v-if="attribute.default == ''">
        <div>
          <h4>{{ key }}</h4>
          <div class="depiction" v-html="$t(`attributes.slots.${labelToKebabCase(key)}`)"></div>
        </div>
      </template>

      <template v-else>
        <LabelAndControls
          v-model="attribute.value"
          :label="labelToKebabCase(key)"
          :class="labelToKebabCase(key)"
          model="input"
          :disabled="!!GET_ATTRIBUTE_INVALID_REASON(key, appAttributes)"
        >
          <template v-slot:fake-placeholder>
            <span>default&nbsp;:&nbsp;</span> <span v-html="attribute.default"></span>
          </template>
        </LabelAndControls>
      </template>
    </template>
  </div>
</template>

<style lang="scss">
#play-slots-simple {
  @media (min-width: 991px) {
    .tool-attribute__label {
      width: 180px !important;
    }
  }
}
</style>
