<template>
  <div id="slot-dropdown" class="demo">
    <Value />
    <Custom />
    <Other />
  </div>
</template>

<script>
import Value from "./value.vue";
import Custom from "./custom.vue";
import Other from "./other.vue";

export default {
  name: "slot-dropdown",
  components: {
    Value,
    Custom,
    Other,
  },
};
</script>

