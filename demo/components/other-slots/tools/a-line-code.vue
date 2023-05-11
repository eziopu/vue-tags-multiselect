<!-- eslint-disable prettier/prettier -->
<template>
  <pre><code class="tag prettyprint lang-html customize"><!--
  -->&lt;v-tag-dropdown value="country"&gt;<!--
    --><span v-show="isUndo == true">
      <span class="pln"></span><span class="tag">&lt;template</span><span class="pln"> </span><span class="atn">slot</span><span class="pun">=</span><span class="atv">"option-undo"</span><span class="tag">&gt;</span><span class="pln">
        </span><span class="tag">&lt;span&gt;</span>{{ slots.optionUndo || '...' }}<span class="tag">&lt;/span&gt;</span><span class="pln">
      </span><span class="tag">&lt;/template&gt;</span><span class="pln"><!--
      --></span></span><!--
      --><span v-show="verifyText(slots.optionORConjunction)">
      <span class="pln"></span><span class="tag">&lt;template</span><span class="pln"> </span><span class="atn">slot</span><span class="pun">=</span><span class="atv">"option-OR-conjunction"</span><span class="tag">&gt;</span><span class="pln">
        </span><span class="tag">&lt;span&gt;</span>{{ slots.optionORConjunction }}<span class="tag">&lt;/span&gt;</span><span class="pln">
      </span><span class="tag">&lt;/template&gt;</span><span class="pln"><!--
      --></span></span>
      ...
  &lt;/v-tag-dropdown&gt;
  </code></pre>
</template>

<script>
export default {
  name: "option-tools-line-code",
  props: {
    slots: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  data() {
    return {
      isUndo: false,
    };
  },
  mounted() {
    let { slots } = this;
    this.isUndo =
      this.verifyText(slots.optionUndo) ||
      (slots.ORConjunction == undefined && slots.optionUndo == "");
  },
  methods: {
    verifyText(value) {
      return value != undefined && value != "";
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
