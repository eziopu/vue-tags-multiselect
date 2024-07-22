<script>
export default {
  name: 'app-loading'
}
</script>

<script setup>
import { inject, computed } from 'vue'
import { ATTRIBUTES, SLOTS } from '@models/attributes/default.js'

const getLoadingAttributes = inject('getLoadingAttributes')

const attributes = computed(() => getLoadingAttributes())
</script>

<template>
  <div id="loading" class="demo">
    <ToolTitle>Loading</ToolTitle>

    <div class="depiction">
      {{ $t(`attributes.app.loading`) }}
    </div>

    <div class="attributes">
      <div style="display: flex; align-items: center">
        <LabelAndControls label="loading" v-model="attributes.loading" />
        <span
          style="padding-left: 12px"
          v-html="$t(`ui.general.defaultIs__key`, { key: String('false') })"
        ></span>
      </div>
      <LabelAndControls
        model="input"
        class="flex-column"
        label="loading placeholder"
        v-model="attributes.loadingPlaceholder"
        :placeholder="`default: ${ATTRIBUTES.placeholders.loading}`"
      />
      <LabelAndControls
        model="input"
        class="flex-column"
        label="loading icon slot"
        v-model="attributes.loadingContent"
      >
        <template v-slot:fake-placeholder>
          default :
          <div v-html="SLOTS.loading"></div>
        </template>
      </LabelAndControls>
    </div>
  </div>
</template>
