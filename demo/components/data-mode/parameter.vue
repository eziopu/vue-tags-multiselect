<script>
export default {
  name: 'data-mode__parameter'
}
</script>

<script setup>
import {
  GET_DATA_MODE_V_DROPDOWN_PROPS_DETAIL,
  GET_DATA_MODE_V_OPTION_PROPS_DETAIL
} from '@models/attributes/detail.js'
import TableTemplate from '../play-helps/slots-attributes/table-template.vue'

const i18n = 'ui.page.dataMode.parameters'
</script>

<template>
  <div id="data-mode__parameter--table" class="demo__table">
    <ToolTitle>Object parameter</ToolTitle>

    <ToolTitle element="h4">
      <span v-html="$t(`${i18n}.first.title`)"></span>
    </ToolTitle>

    <div class="depiction">
      <p v-html="$t(`${i18n}.first.main`)"></p>
    </div>

    <TableTemplate
      :attributes="GET_DATA_MODE_V_DROPDOWN_PROPS_DETAIL()"
      :i18n="`attributes.dropdown`"
    >
    </TableTemplate>
    <br />
    <ToolTitle element="h4">
      <span v-html="$t(`${i18n}.second.title`)"></span>
    </ToolTitle>
    <div class="depiction">
      <p v-html="$t(`${i18n}.second.main`)"></p>
    </div>

    <TableTemplate :attributes="GET_DATA_MODE_V_OPTION_PROPS_DETAIL()" :i18n="`attributes.option`">
    </TableTemplate>
  </div>
</template>
