<!-- eslint-disable prettier/prettier -->
<template>
<pre class="tag prettyprint lang-html customize"><code><!--
  -->&lt;v-tags-multiselect<br><!--
    --><Space />ref="elVTagsMultiselect"<br><!--
    --><Space />v-model="result"<br><!--
    -->&gt;<br><!--
      
    --><Space />&lt;v-tag-dropdown value="country"&gt;<br><!--
      --><Space :n="2"/>...<br><!--
    --><Space />&lt;/v-tag-dropdown&gt;<br><!--
    
-->  &lt;v-tag-dropdown value="height" display-all&gt;
    &lt;v-tag-option title&gt;
      &lt;i class="fa fa-user"&gt;&lt;/i&gt; <span v-html="renderData('general.Height(m)')"></span>
    &lt;/v-tag-option&gt;
    &lt;v-tag-option&gt;
      &lt;input
        type="number"
        min="1"
        :max="height2 || 60"
        :placeholder="`0 ~ ${height2 || 60}`"
        v-model="height1"
        ref="elInputHeight1"
        @keydown.enter="<span class="lit">()</span> => <span class="lit">{</span>
          <span class="cyan-blue">elInputHeight2</span>.<span class="cyan-blue">value</span>.focus<span class="purple">()</span>;
        <span class="lit">}</span>"
      /&gt;
      &lt;span&gt; ~ &lt;/span&gt;
      &lt;input
        type="number"
        :min="height1 || 0"
        max="60"
        :placeholder="`${height1 || 0} ~ 60`"
        v-model="height2"
        ref="elInputHeight2"
        @keydown.enter="<span class="lit">()</span> => <span class="lit">{</span>
          <span class="cyan-blue">elVTagsMultiselect</span>.<span class="cyan-blue">value</span>.pushTag<span class="purple">(</span>{
            <span class="red">key</span>: <span class="green">'height'</span>,
            <span class="red">value</span>: <span class="green">`${height1} ~ ${height2}`</span>
          }<span class="purple">)</span>
        <span class="lit">}</span>"
      /&gt;
    &lt;/v-tag-option&gt;
  &lt;/v-tag-dropdown&gt;<br><!--

  -->&lt;/v-tags-multiselect&gt;<!--
--></code></pre>
</template>

<script>
import Space from "../../../../tools/show-html-code/space.vue";

export default {
  name: "methods-pushTag__demo0--show-code",
  components: {
    Space,
  },
  props: {
    isNotTitle: {
      type: Boolean,
      default: () => {
        return false;
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
    renderData(input) {
      return this.$t("ui." + input);
    },
    getClass(input) {
      return { bolder: this.isBolder(input) }
    },
    isBolder(input) {
      return this.bolders.includes(input);
    },
  },
};
</script>
<style scoped lang="scss">
@media (max-width: 414px) {
  code {
    font-size: 12px;
  }
}
</style>