<template>
  <div id="app-attributes">
    <OptionORconjunction></OptionORconjunction>
    <OptionUndo></OptionUndo>
  </div>
</template>

<script>
import OptionORconjunction from "./option-OR-conjunction.vue";
import OptionUndo from "./option-undo.vue";

export default {
  name: "app-attributes",
  components: {
    OptionORconjunction,
    OptionUndo,
  },
};
</script>
