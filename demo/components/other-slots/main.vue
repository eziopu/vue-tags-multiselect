<template>
  <div id="app-attributes">
    <OptionORconjunction />
    <OptionUndo />
    <TagConjunction />
    <Loading />
    <DropdownLoading />
  </div>
</template>

<script>
import OptionORconjunction from "./option-OR-conjunction.vue";
import OptionUndo from "./option-undo.vue";
import TagConjunction from "./tag-conjunction.vue";
import Loading from "./loading.vue";
import DropdownLoading from "./dropdown-loading.vue";

export default {
  name: "other-slots",
  components: {
    OptionORconjunction,
    OptionUndo,
    TagConjunction,
    Loading,
    DropdownLoading,
  },
};
</script>
