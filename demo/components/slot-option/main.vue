<script>
export default {
  name: 'slot-option'
}
</script>

<script setup>
import Value from './value.vue'
import Title from './title.vue'
import Selected from './selected.vue'
import DisplayValue from './display-value.vue'
import NoTitle from './no-title.vue'
import Other from './other.vue'
</script>

<template>
  <div id="slot-option" class="demo">
    <Value />
    <Title />
    <NoTitle />
    <Selected />
    <DisplayValue />
    <Other />
  </div>
</template>
