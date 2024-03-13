<!-- eslint-disable prettier/prettier -->
<template>
<pre class="tag prettyprint lang-html customize"><code><!--
  -->&lt;v-tags-multiselect<br><!--
  --><Space />v-model="result"<br><!--
  -->&gt;<br><!--
  --><Space />&lt;v-tag-dropdown <!--
    --><span :class="{ bolder: bolders.includes('value') }">value</span>="country"<!-- 
    --><span v-show="isToMuch"><br ><Space /></span><!--
    --><span v-show="bolders.includes('disabled')" class="bolder"> disabled</span><!--
    --><span v-show="bolders.includes('divided')" class="bolder"> divided</span><!--
    --><span v-show="bolders.includes('displayAll')" class="bolder"> display-all</span><!--
    --><span v-show="bolders.includes('hidden')" class="bolder"> hidden</span><!--
    --><span v-show="bolders.includes('custom')" class="bolder"> custom</span><!--
    --><span v-show="isToMuch"><br ><Space /></span><!--
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
    bolders: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  computed: {
    isToMuch() {
      return this.bolders.length >= 3;
    },
  },
};
</script>
