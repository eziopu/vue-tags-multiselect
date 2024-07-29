<script>
export default {
  name: 'other-slots'
}
</script>
<script setup>
import OptionORconjunction from './option-OR-conjunction.vue'
import OptionUndo from './option-undo.vue'
import TagConjunction from './tag-conjunction.vue'
import Loading from './loading.vue'
import DropdownLoading from './dropdown-loading.vue'
</script>

<template>
  <div id="other-slots">
    <OptionORconjunction />
    <OptionUndo />
    <TagConjunction />
    <Loading />
    <DropdownLoading />
  </div>
</template>
