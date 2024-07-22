<script>
export default {
  name: 'app-dropdown-loading'
}
</script>

<script setup>
import { inject, computed } from 'vue'
import { SLOTS } from '@models/attributes/default.js'

const getLoadingAttributes = inject('getLoadingAttributes')

const attributes = computed(() => getLoadingAttributes())
</script>

<template>
  <div id="dropdown-loading" class="demo">
    <ToolTitle>Dropdown loading</ToolTitle>

    <div class="depiction">
      {{ $t(`attributes.app.dropdownLoading`) }}
      <div class="sub-depiction">
        <p v-html="$t(`attributes.slots.dropdown-loading__notice`)"></p>
      </div>
    </div>

    <div class="attributes">
      <div style="display: flex; align-items: center">
        <LabelAndControls
          label="dropdownLoading"
          v-model="attributes.dropdownLoading"
          :disabled="attributes.loading == true"
        />
        <span
          style="padding-left: 12px"
          v-html="$t(`ui.general.defaultIs__key`, { key: String('false') })"
        ></span>
      </div>

      <LabelAndControls
        model="input"
        class="flex-column"
        label="dropdown loading icon slot"
        v-model="attributes.dropdownLoadingContent"
      >
        <template v-slot:fake-placeholder>
          default :
          <div v-html="SLOTS.dropdownLoading"></div>
        </template>
      </LabelAndControls>
    </div>
  </div>
</template>
