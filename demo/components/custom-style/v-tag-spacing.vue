<script>
export default {
  name: 'custom-style__v-tag-spacing'
}
</script>
<script setup>
import ShowCodeStyle from './show-html-code/v-tag-spacing.vue'
// const i18n = 'attributes.option'
</script>

<template>
  <div id="custom-style__tag-spacing" class="demo">
    <ToolTitle>&lt;v-tag&gt; spacing</ToolTitle>

    <div class="depiction">
      <p>由於排版問題, 在 div.v-tags-multiselect__main 內的 v-tag 並非使用css gap方式排版</p>
      <p>請使用css :root 方式覆蓋以下範例的預設值(3px)</p>

      <ShowCodeStyle></ShowCodeStyle>
    </div>
  </div>
</template>
