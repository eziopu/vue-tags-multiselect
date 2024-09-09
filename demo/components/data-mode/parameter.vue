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
</script>

<template>
  <div id="data-mode__parameter--table" class="demo__table">
    <ToolTitle>Object parameter</ToolTitle>

    <ToolTitle element="h4">first-level object parameter</ToolTitle>
    <div class="depiction">
      <p>第一層object 參數</p>
      <p>與 <code class="tag">&lt;v-tag-dropdown&gt;</code> 相同，就是多了一個必填的`values`</p>
    </div>

    <TableTemplate
      :attributes="GET_DATA_MODE_V_DROPDOWN_PROPS_DETAIL()"
      :i18n="`attributes.dropdown`"
    >
    </TableTemplate>
    <br />
    <ToolTitle element="h4">second-level value object parameter</ToolTitle>
    <div class="depiction">
      <p>第二層object 參數</p>
      <p>與 <code class="tag">&lt;v-tag-option&gt;</code> 相同，就是多了一個`element`</p>
    </div>

    <TableTemplate :attributes="GET_DATA_MODE_V_OPTION_PROPS_DETAIL()" :i18n="`attributes.option`">
    </TableTemplate>
  </div>
</template>
