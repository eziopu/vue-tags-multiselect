<!-- eslint-disable prettier/prettier -->
<template><!--
  --><span v-for="i in n" :key="i">&ensp;&ensp;</span><!--
--></template>

<script>
export default {
  name: "show-html-code__space",
  props: {
    n: {
      type: Number,
      default: () => {
        return 1;
      },
    },
  },
};
</script>
