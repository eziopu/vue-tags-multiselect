<template>
  <div id="app-attributes">
    <OptionORconjunction />
    <OptionUndo />
    <TagConjunction />
  </div>
</template>

<script>
import OptionORconjunction from "./option-OR-conjunction.vue";
import OptionUndo from "./option-undo.vue";
import TagConjunction from "./tag-conjunction.vue";

export default {
  name: "app-attributes",
  components: {
    OptionORconjunction,
    OptionUndo,
    TagConjunction,
  },
};
</script>
