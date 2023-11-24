<!-- eslint-disable prettier/prettier -->
<template><!--
  --><span v-show="$parent.verifyText(value)"><!--
    --><Space /><span class="pln"></span><span class="tag">&lt;template </span><span class="atn">slot</span><span class="pun">=</span><span class="atv">"{{ toKebabCase(keyName) }}"</span><span class="tag">&gt;</span><br><!--
      --><Space :n="2"/><span class="tag">&lt;span&gt;</span>{{ value }}<span class="tag">&lt;/span&gt;</span><span class="pln"><br><!--
    --><Space /></span><span class="tag">&lt;/template&gt;</span><span class="pln"><br><!--
    --></span><!--
  --></span><!--
--></template>

<script>
import Space from "./space.vue";

export default {
  name: "show-html-code__slots-template",
  components: {
    Space,
  },
  props: {
    keyName: {
      type: String,
      default: () => {
        return "";
      },
    },
    value: {
      type: String,
      default: () => {
        return "";
      },
    },
  },
  methods: {
    toKebabCase(inputValue = "") {
      const inputString = inputValue.replace(/Content/g, "");
      if (inputString == "optionORConjunction") {
        return "option-OR-conjunction";
      }
      const result = inputString.replace(/([A-Z])/g, "-$1").toLowerCase();
      return result.replace(/^-/, "");
    },
  },
};
</script>
