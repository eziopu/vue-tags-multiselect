<!-- eslint-disable prettier/prettier -->
<template><!--
  --><span v-show="props.disabled"> disabled</span><!--
  --><span v-show="props.divided"> divided</span><!--
  --><span v-show="props.displayAll"> display-all</span><!--
  --><span v-show="props.hidden"> hidden</span><!--
  --><span v-show="props.custom"> custom</span><!--
--></template>

<script>
import { PACKAGE_V_DROPDOWN_PROPS } from "../../models.js";

export default {
  name: "show-html-code__dropdown-props-template",
  components: {
  },
  props: {
    props: {
      type: Object,
      default: () => {
        return PACKAGE_V_DROPDOWN_PROPS;
      },
    },
  },
};
</script>
