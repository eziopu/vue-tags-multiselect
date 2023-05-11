<!-- eslint-disable prettier/prettier -->
<template>
  <pre><code class="tag prettyprint lang-html customize"><!--
  -->&lt;v-tag-dropdown value="country"&gt;
    <span v-show="showTitle"><!--  
    -->&lt;v-tag-option <span :class="{ bolder: bolder.includes('title') }">title</span>&gt;
      &lt;i class="fa fa-flag"&gt;&lt;/i&gt; <span v-html="renderData('general.Country')"></span>
    &lt;/v-tag-option&gt;
    </span><!--
    -->&lt;v-tag-option <span :class="{ bolder: bolder.includes('value') }">value</span>="mare"<!--
      --><span class="bolder" v-if="bolder.includes('selected')"> selected</span><!--
      --><span class="bolder" v-if="bolder.includes('displayValue')"> display-value </span><!--
      --><span v-if="bolder.includes('displayValue')"><br/>   // or <span class="bolder">:displayValue="true"</span><br/>  </span><!--
      -->&gt;<span v-html="renderData('data.country.Māre')"></span>&lt;/v-tag-option&gt;
    &lt;v-tag-option <span :class="{ bolder: bolder.includes('value') }">value</span>="eldia"&gt;<span v-html="renderData('data.country.Eldia')"></span>&lt;/v-tag-option&gt;
  &lt;/v-tag-dropdown&gt;
  </code></pre>
</template>

<script>
export default {
  name: "option-tools-line-code",
  props: {
    showTitle: {
      type: Boolean,
      default: () => {
        return true;
      },
    },
    bolder: {
      type: String,
      default: () => {
        return "";
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
<style scoped lang="scss">
pre {
  padding: 6px !important;

  span {
    line-height: 1.6;
  }
}
</style>
