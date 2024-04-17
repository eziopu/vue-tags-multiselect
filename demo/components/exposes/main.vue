<script>
export default {
  name: "app-exposes",
};
</script>

<script setup>
import PushTag from "./pushTag.vue";
import Other from "./other.vue";
</script>

<template>
  <div id="app-exposes" class="demo">
    <Other />
    <PushTag />
  </div>
</template>