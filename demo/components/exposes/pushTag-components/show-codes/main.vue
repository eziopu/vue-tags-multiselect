<!-- eslint-disable prettier/prettier -->
<template>
<pre class="prettyprint lang-html customize"><code><!--
-->&lt;script setup&gt;
<span class="purple">import</span> <span class="atv">{</span> <span class="red">ref</span> <span class="atv">}</span> <span class="purple">from</span> <span class="green">'vue'</span>
<span class="purple">const</span> elVTagsMultiselect = <span class="tag">ref</span>(<span class="atv">null</span>)

elVTagsMultiselect.value.<FunctionUse simple />
// or
elVTagsMultiselect.value.<FunctionUse />
&lt;/script&gt;

&lt;template&gt;<br><!--
  --><Space />&lt;v-tags-multiselect<br><!--
    --><Space :n="2"/>ref="elVTagsMultiselect"<br><!--
    --><Space />&gt; ...<br><!--
-->&lt;/template&gt;<!--
--></code></pre>
</template>

<script>
import Space from "../../../tools/show-html-code/space.vue";
import FunctionUse from "./function-use.vue";

export default {
  name: "exposes-pushTag-show-codes-main",
  components: {
    Space,
    FunctionUse,
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
  @media (max-width: 768px) {
    display: inline;
  }
}
</style>