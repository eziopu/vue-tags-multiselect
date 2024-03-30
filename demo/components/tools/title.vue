<template>
  <div class="tool-title">
    <component :is="element" class="tool-title__element">
      <slot></slot>
    </component>
    <hr class="tool-title__hr" />
  </div>
</template>

<script>
export default {
  name: "tool-title",
  props: {
    element: {
      type: String,
      default: () => {
        return "h3";
      },
    },
  },
};
</script>

<style scoped lang="scss">
.tool-title__hr {
  margin-top: 0;
}
</style>
