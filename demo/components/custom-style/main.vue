<script>
export default {
  name: 'custom-style'
}
</script>
<script setup>
import Hidden from "./hidden.vue";
import vTagDropdown__class from "./v-tag-dropdown__class.vue";
import HtmlTree from "./html-tree.vue";
import VTagSpacing from "./v-tag-spacing.vue";
import Example from "./example.vue"; 
</script>

<template>
  <div id="custom-style" class="demo">
    <Hidden></Hidden>
    <vTagDropdown__class></vTagDropdown__class>
    <HtmlTree></HtmlTree>
    <VTagSpacing></VTagSpacing>
    <Example></Example>
  </div>
</template>
