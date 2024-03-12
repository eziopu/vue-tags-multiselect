<!-- eslint-disable prettier/prettier -->
<template><!--
  --><span v-show="props.displayValue"> displayValue</span><!--
  --><span v-show="props.disabled"> disabled</span><!--
  --><span v-show="props.divided"> divided</span><!--
  --><span v-show="props.selected"> selected</span><!--
--></template>

<script>
import { PACKAGE_V_OPTION_PROPS } from "../../models.js";

export default {
  name: "show-html-code__option-props-template",
  components: {
  },
  props: {
    props: {
      type: Object,
      default: () => {
        return PACKAGE_V_OPTION_PROPS;
      },
    },
  },
};
</script>
