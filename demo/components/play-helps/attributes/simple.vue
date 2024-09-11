<script>
export default {
  name: 'play-attributes-simple'
}
</script>
<script setup>
import { inject } from 'vue'
import { GET_ATTRIBUTE_INVALID_REASON } from '@models/attributes/tools.js'

const framework = inject('framework')
const appAttributes = inject('attributes')
</script>

<template>
  <div id="play-attributes-simple">
    <div
      class="simple attributes"
      :class="{
        ui: framework == 'semantic-ui',
        default: framework == 'default'
      }"
    >
      <template v-for="(attribute, key) in appAttributes" :key="key">
        <template v-if="key != 'placeholder' && key != 'placeholders' && key != 'options'">
          <LabelAndControls
            :label="$toKebabCase(key)"
            v-model="attribute.value"
            :values="attribute.acceptedValues"
            :disabled="!!GET_ATTRIBUTE_INVALID_REASON(key, appAttributes)"
          >
            <template v-slot:tooltip v-if="GET_ATTRIBUTE_INVALID_REASON(key, appAttributes)">
              {{ GET_ATTRIBUTE_INVALID_REASON(key, appAttributes) }}
            </template>
          </LabelAndControls>
        </template>
      </template>
      <div class="attribute play-attributes-simple__placeholder">
        <LabelAndControls
          :label="'placeholder'"
          model="input"
          v-model="appAttributes['placeholder'].value"
          :style="{
            'min-width': framework != 'bootstrap' ? '100px' : '',
            width: framework != 'bootstrap' ? '100%' : ''
          }"
        />
      </div>
    </div>

    <h4 style="margin: 18px 0">Placeholders</h4>

    <div
      class="play-attributes-simple__placeholders simple placeholders attributes"
      :class="{
        ui: framework == 'semantic-ui',
        default: framework == 'default'
      }"
    >
      <template v-for="(attribute, key) in appAttributes.placeholders" :key="key">
        <LabelAndControls
          :label="$toKebabCase(key)"
          model="input"
          v-model="attribute.value"
          :values="attribute.acceptedValues"
          :placeholder="attribute.default"
          :disabled="!!GET_ATTRIBUTE_INVALID_REASON(`placeholders.${key}`, appAttributes)"
        >
          <template
            v-slot:tooltip
            v-if="GET_ATTRIBUTE_INVALID_REASON(`placeholders.${key}`, appAttributes)"
          >
            {{ GET_ATTRIBUTE_INVALID_REASON(`placeholders.${key}`, appAttributes) }}
          </template>
        </LabelAndControls>
      </template>
    </div>
  </div>
</template>

<style scoped lang="scss">
@media (min-width: 450px) and (max-width: 991px) {
  .play-attributes-simple__placeholders {
    .attribute:last-child {
      justify-content: flex-start !important;
    }
  }
}
</style>
