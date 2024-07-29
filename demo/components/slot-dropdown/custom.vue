<script>
export default {
  name: 'dropdown-custom'
}
</script>

<script setup>
import CustomDiffDemo from './tools/custom-diff-demo.vue'
</script>

<template>
  <div id="dropdown-custom" class="demo">
    <ToolTitle>Custom</ToolTitle>

    <div class="depiction">
      {{ $t(`attributes.dropdown.custom`) }} <br />
      *{{ $t(`ui.page.sentence.notice.click_the_tag_to_edit_mode`) }}
    </div>

    <div class="flex-between to6-4">
      <CustomDiffDemo :appCustomer="true" />
      <CustomDiffDemo :appCustomer="false" />
    </div>
  </div>
</template>
