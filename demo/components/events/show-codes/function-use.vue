<!-- eslint-disable prettier/prettier -->
<template><!--
  --><span class="tag">pushTag</span><!--
    --><span class="atv">(</span><!--
      --><span class="purple">{</span><!--
        --><span v-show="simple"><!--
          -->value: <span class="atv">"Eldia"</span><!--
        --></span><!--
        --><span v-show="!simple"><!--
          --><span class="rwd"><br/><Space /></span>key: <span class="atv">"country"</span>, <!--
          --><span class="rwd"><br/><Space /></span>value: <span class="atv">"Eldia"</span>, <!--
          --><span class="rwd"><br/><Space /></span>titleElm:<span class="atv">"&lt;p&gt;Country&lt;/p&gt;"</span>, <!--
          --><span class="rwd"><br/><Space /></span>custom: <span class="atv">true</span><!--
          --><span class="rwd"><br/></span><!--
        --></span><!--
    --><span class="purple">}</span><!--
  --><span class="atv">)</span><!--
--></template>

<script>
import Space from "../../../tools/show-html-code/space.vue";

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