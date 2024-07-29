<script>
export default {
  name: 'slots-option'
}
</script>
<script setup>
import { inject } from 'vue'
import { GET_V_OPTION_PROPS_DETAIL } from '@models/attributes/detail.js'
import HelpTitle from '../components/title.vue'
import TableTemplate from './table-template.vue'

const displays = inject('displays')
</script>

<template>
  <div id="slotAttributesOption">
    <HelpTitle label="Slot Option Attributes" target="slotOption" />

    <transition name="slide">
      <TableTemplate
        v-if="displays.slotOption"
        :attributes="GET_V_OPTION_PROPS_DETAIL()"
        :i18n="`attributes.option`"
      >
      </TableTemplate>
    </transition>
  </div>
</template>
