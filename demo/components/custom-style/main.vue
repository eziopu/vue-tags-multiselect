<script>
export default {
  name: 'custom-style'
}
</script>
<script setup>
import Hidden from "./hidden.vue";
import vTagDropdown__class from "./v-tag-dropdown__class.vue";
</script>

<template>
  <div id="custom-style" class="demo">
    <Hidden></Hidden>
    <vTagDropdown__class></vTagDropdown__class>
    <p></p>
  </div>
</template>
