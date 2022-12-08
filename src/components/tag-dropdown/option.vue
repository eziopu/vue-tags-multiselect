<template>
  <div class="option">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { ref } from "vue";

export default {
  name: "v-tag-option",
  setup() {
    const count = ref(0);

    return {
      count,
    };
  },
  mounted() {
    console.log(this.count); // 0
  },
};
</script>
