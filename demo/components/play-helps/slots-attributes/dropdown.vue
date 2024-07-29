<script>
export default {
  name: 'slots-dropdown'
}
</script>
<script setup>
import { inject } from 'vue'
import { GET_V_DROPDOWN_PROPS_DETAIL } from '@models/attributes/detail.js'
import HelpTitle from '../components/title.vue'
import TableTemplate from './table-template.vue'

const displays = inject('displays')
</script>

<template>
  <div id="slotAttributesDropdown">
    <HelpTitle label="Slot Dropdown Attributes" target="slotDropdown" />

    <transition name="slide">
      <TableTemplate
        v-if="displays.slotDropdown"
        :attributes="GET_V_DROPDOWN_PROPS_DETAIL()"
        :i18n="`attributes.dropdown`"
      >
      </TableTemplate>
    </transition>
  </div>
</template>

