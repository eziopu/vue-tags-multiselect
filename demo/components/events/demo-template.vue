<script setup>
defineProps({
  label: String,
  contents: Object
})
</script>

<template>
  <div :id="`events-${label}`">
    <h3>
      {{ label }} : <small>{{ contents.default }}</small>
    </h3>

    <div class="depiction">
      <p>
        {{ $t(`attributes.events.${label}`) }}
      </p>

      <p v-if="contents.acceptedValues && contents.acceptedValues.length != 0">
        values :
        {{ contents.acceptedValues }}
      </p>

      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: 'events-demo-template'
}
</script>
