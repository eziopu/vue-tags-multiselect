<!-- eslint-disable prettier/prettier -->
<template>
<pre class="tag prettyprint lang-html customize"><code><!--
  -->&lt;v-tags-multiselect<br><!--
  --><Space />v-model="result"<br><!--
  -->&gt;<br><!--
  --><Space />&lt;v-tag-dropdown <span :class="{ bolder: bolder.includes('value') }">value</span>="country"<!-- 
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
    -->&gt;<br><!--
    --><Space :n="2" />...<br><!--
    --><Space />&lt;/v-tag-dropdown&gt;<br><!--
  -->&lt;/v-tags-multiselect&gt;<!--
--></code></pre>
</template>

<script>
import Space from "../../tools/show-html-code/space.vue";
export default {
  name: "dropdown-tools-line-code",
  components: {
    Space,
  },
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
