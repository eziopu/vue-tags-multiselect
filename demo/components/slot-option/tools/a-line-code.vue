<!-- eslint-disable prettier/prettier -->
<template>
<pre class="tag prettyprint lang-html customize"><code><!--
  -->&lt;v-tags-multiselect<br><!--
  --><Space />v-model="result"<br><!--
  -->&gt;<br><!--
  --><Space />&lt;v-tag-dropdown value="country"&gt;<br><!--
    --><span v-show="showTitle"><!--
      --><Space :n="2"/>&lt;v-tag-option <span :class="{ bolder: bolders.includes('title') }">title</span>&gt;<br><!--
        --><Space :n="4"/>&lt;i class="fa fa-flag"&gt;&lt;/i&gt; <span v-html="renderData('general.Country')"></span><br><!--
      --><Space :n="2"/>&lt;/v-tag-option&gt;<br><!--
    --></span><!--

    --><Space :n="2"/>&lt;v-tag-option<!--
      --><span :class="{ bolder: bolders.includes('value') }">value</span>="mare"<!--
      --><span class="bolder" v-if="bolders.includes('selected')"> selected</span><!--
      --><span class="bolder" v-if="bolders.includes('displayValue')"> display-value</span><!--
      --><span v-if="bolders.includes('displayValue')"><br/>   // or <span class="bolder">:displayValue="true"</span><br/>  </span><!--
      -->&gt;<br><!--
      --><Space :n="4"/><span v-html="renderData('data.country.Māre')"></span><br><!--
    --><Space :n="2"/>&lt;/v-tag-option&gt;<br><!--

    --><Space :n="2"/>&lt;v-tag-option <span :class="{ bolder: bolders.includes('value') }">value</span>="eldia"&gt;<br><!--
      --><Space :n="4"/><span v-html="renderData('data.country.Eldia')"></span><br><!--
    --><Space :n="2"/>&lt;/v-tag-option&gt;<br><!--

    --><Space />&lt;/v-tag-dropdown&gt;<br><!--
    --><Space />...<br><!--
  -->&lt;/v-tags-multiselect&gt;<!--
--></code></pre>
</template>

<script>
import Space from "../../tools/show-html-code/space.vue";

export default {
  name: "option-tools-line-code",
  components: {
    Space,
  },
  props: {
    showTitle: {
      type: Boolean,
      default: () => {
        return true;
      },
    },
    bolders: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  methods: {
    renderData(value) {
      return this.$t("ui." + value);
    },
  },
};
</script>
