<script>
export default {
  name: "exposes-pushTag",
};
</script>

<script setup>
import Parameter from "./pushTag-components/parameter.vue";
import Depiction from "./pushTag-components/depiction.vue";
import Demo0 from "./pushTag-components/demos/demo0.vue";
import Demo1 from "./pushTag-components/demos/demo1.vue";
</script>

<template>
  <div id="exposes-pushTag" class="demo">
    <ToolTitle>pushTag({ ... })</ToolTitle>

    <Depiction />

    <h4 class="ui title method-pushTag__parameter--title">
      Attributes
    </h4>

    <Parameter />

    <Demo0 />
    <Demo1 />
  </div>
</template>

<style scoped lang="scss">
.method-pushTag__parameter--title {
  margin-top: 1.6rem;
  margin-bottom: 1.2rem;
}
</style>