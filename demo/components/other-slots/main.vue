<template>
  <div id="app-attributes">
    <OptionORconjunction />
    <OptionUndo />
    <TagConjunction />
    <Loadings />
  </div>
</template>

<script>
import OptionORconjunction from "./option-OR-conjunction.vue";
import OptionUndo from "./option-undo.vue";
import TagConjunction from "./tag-conjunction.vue";
import Loadings from "../app/loadings.vue";

export default {
  name: "other-slots",
  components: {
    OptionORconjunction,
    OptionUndo,
    TagConjunction,
    Loadings,
  },
};
</script>
