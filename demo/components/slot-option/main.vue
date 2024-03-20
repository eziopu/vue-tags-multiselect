<template>
  <div id="slot-option" class="demo">
    <Value />
    <Title />
    <Selected />
    <DisplayValue />
    <!-- <Other /> -->
  </div>
</template>

<script>
import Value from "./value.vue";
import Title from "./title.vue";
import Selected from "./selected.vue";
import DisplayValue from "./display-value.vue";
// import Other from "../other.vue";

export default {
  name: "slot-option",
  components: {
    Value,
    // eslint-disable-next-line vue/no-reserved-component-names
    Title,
    Selected,
    DisplayValue,
    // Other
  },
};
</script>