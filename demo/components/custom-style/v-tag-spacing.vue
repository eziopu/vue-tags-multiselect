<script>
export default {
  name: 'custom-style__v-tag-spacing'
}
</script>
<script setup>
import ShowCodeStyle from './show-html-code/v-tag-spacing.vue'
const i18n = 'ui.page.customStyle.v-tag-spacing'
</script>

<template>
  <div id="custom-style__tag-spacing" class="demo">
    <ToolTitle><span v-html="$t(`${i18n}.title`)"></span></ToolTitle>

    <div class="depiction">
      <p v-html="$t(`${i18n}.mains.1`)"></p>
      <p v-html="$t(`${i18n}.mains.2`)"></p>

      <ShowCodeStyle></ShowCodeStyle>
    </div>
  </div>
</template>
