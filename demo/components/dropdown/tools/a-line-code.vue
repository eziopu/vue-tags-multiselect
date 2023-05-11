<!-- eslint-disable prettier/prettier -->
<template>
  <code class="tag prettyprint lang-html customize"
    >&lt;v-tag-dropdown
    <span :class="{ bolder: bolder.includes('value') }">value</span>="country"<!-- 
    --><span v-show="bolder.includes('disabled')" class="bolder"> disabled</span
    ><!--
    --><span v-show="bolder.includes('divided')" class="bolder"> divided</span
    ><!--
    --><span v-show="bolder.includes('displayAll')" class="bolder"> displayAll</span
    ><!--
    --><span v-show="bolder.includes('hidden')" class="bolder"> hidden</span
    ><!--
    --><span v-show="bolder.includes('custom')" class="bolder"> custom</span
    ><!--
    -->&gt; ... &lt;/v-tag-dropdown&gt;</code
  >
</template>

<script>
export default {
  name: "dropdown-tools-line-code",
  props: {
    bolder: {
      type: String,
      default: () => {
        return "";
      },
    },
  },
};
</script>
