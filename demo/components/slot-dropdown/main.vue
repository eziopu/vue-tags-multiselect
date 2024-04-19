<script>
export default {
  name: "slot-dropdown",
};
</script>
<script setup>
import Value from "./value.vue";
import Custom from "./custom.vue";
import Other from "./other.vue";
</script>

<template>
  <div id="slot-dropdown" class="demo">
    <Value />
    <Custom />
    <Other />
  </div>
</template>