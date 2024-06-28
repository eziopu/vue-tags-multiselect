<script>
export default {
  name: 'slots-dropdown'
}
</script>
<script setup>
import { inject } from 'vue'
import { GET_PACKAGE_V_DROPDOWN_PROPS_DETAIL } from '../../models.js'
import HelpTitle from '../components/title.vue'

const displays = inject('displays')
const attributes = GET_PACKAGE_V_DROPDOWN_PROPS_DETAIL()
</script>

<template>
  <div id="slotAttributesDropdown">
    <HelpTitle label="Slot Dropdown Attributes" target="slotDropdown" />

    <transition name="slide">
      <div class="detail attributes container" v-if="displays.slotDropdown">
        <div class="row titles">
          <div
            v-for="value in ['Attribute', 'Description', 'Type', 'Default', 'Required']"
            :key="value"
          >
            <h4>{{ $t(`ui.general.${value}`) }}</h4>
          </div>
        </div>

        <div class="row" v-for="(attribute, key) in attributes" :key="key">
          <div>
            <div>{{ $toKebabCase(key) }}</div>
          </div>
          <div>
            <span class="i-block d-md-none">{{ $t(`ui.general.Description`) }}: </span>
            <span>{{ $t(`attributes.dropdown.${$toKebabCase(key)}`) }}</span>
          </div>
          <div>
            <span class="i-block d-md-none">{{ $t(`ui.general.Type`) }}: </span>
            <span>{{ attribute.type }}</span>
          </div>
          <div>
            <span class="i-block d-md-none">{{ $t(`ui.general.Default`) }}: </span>
            <span>{{ attribute.default }}</span>
          </div>
          <div v-if="key == 'value'">
            <span class="i-block d-md-none">{{ $t(`ui.general.Required`) }}: </span>
            *yes
          </div>
          <div v-else class="d-none d-md-block">no</div>
        </div>
      </div>
    </transition>
  </div>
</template>

<style scoped lang="scss">
@media all and (min-width: 576px) {
  .row {
    & > div:nth-child(1) {
      width: 20%;
      order: 1;
    }
    & > div:nth-child(2) {
      width: 45%;
      order: 2;
    }
    & > div:nth-child(3) {
      width: 10%;
      order: 3;
    }
    & > div:nth-child(4) {
      width: 10%;
      order: 4;
    }
    & > div:nth-child(5) {
      width: 15%;
      order: 5;
    }
  }
}
</style>
