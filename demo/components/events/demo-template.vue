<script setup>
import { defineProps, toRefs } from "vue";

const props = defineProps({
  label: String,
  contents: Object,
});

const { label, contents } = toRefs(props);

// const convertToKebabCase = (str) => {
//   return str.replace(/[A-Z]/g, match => '-' + match.toLowerCase()).replace(/^-/, '');
// }

</script>

<template>
  <div :id="`events-${label}`">
    <h3>{{ label }} : <small>{{ contents.default }}</small></h3>

    <div class="depiction">
      <p>
        {{ $t(`attributes.events.${label}`) }}
      </p>

      <p v-if="contents.acceptedValues">
        values : 
        {{ contents.acceptedValues }}
      </p>
    </div>


  </div>
</template>

<script>
export default {
  name: "events-disabled",
};
</script>