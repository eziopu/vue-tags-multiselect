<!-- eslint-disable prettier/prettier -->
<template><!--
  --><span class="function">pushTag</span><!--
    --><span class="function">(</span><!--
      --><span class="bracket">&#123;</span><!--
        --><span v-show="simple"><!--
          --><span class="variable">value</span>: <span class="string">'Eldia'</span><!--
        --></span><!--
        --><span v-show="!simple"><!--
          --><span class="rwd"><br/><Space /></span><span class="variable">key</span>: <span class="string">'country'</span>, <!--
          --><span class="rwd"><br/><Space /></span><span class="variable">value</span>: <span class="string">'Eldia'</span>, <!--
          --><span class="rwd"><br/><Space /></span><span class="variable">titleElm</span>: <span class="string">'&lt;p&gt;Country&lt;/p&gt;'</span>, <!--
          --><span class="rwd"><br/><Space /></span><span class="variable">custom</span>: <span class="parenthesis">true</span><!--
          --><span class="rwd"><br/></span><!--
        --></span><!--
    --><span class="bracket">&#125;</span><!--
  --><span class="function">)</span><!--
--></template>

<script>
import Space from "@tools/show-html-code/space.vue";

export default {
  name: "exposes-pushTag-show-codes-function-use",
  components: {
    Space,
  },
  props: {
    simple: {
      type: Boolean,
      default: () => {
        return false;
      },
    },
  },
};
</script>
<style scoped lang="scss">
.rwd {
  display: none;
  @media (max-width: 992px) {
    display: inline;
  }
}
</style>