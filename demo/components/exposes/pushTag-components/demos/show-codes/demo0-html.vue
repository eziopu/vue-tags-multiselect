<!-- eslint-disable prettier/prettier -->
<template>
<pre class="tag prettyprint lang-html customize"><code><!--
  -->&lt;v-tags-multiselect<br><!--
    --><Space />ref="elVTagsMultiselect"<br><!--
    --><Space />v-model="result"<br><!--
    --><Space />:conjunction="'AND'"<br><!--
    --><Space />:dropdownLoading="demoDropdownLoading"<br><!--
    -->&gt;<br><!--
      
--><Space />&lt;v-tag-dropdown value="brand"&gt;
    &lt;v-tag-option title&gt;
      &lt;span class="v-hidden-in-tag"&gt;Brands&lt;/span&gt;
      &lt;span class="v-hidden-in-dropdown"&gt;Brand&lt;/span&gt;
    &lt;/v-tag-option&gt;

    &lt;v-tag-option class="car-brand" v-for="(value, key) in brands"
      :key="key" :value="key"&gt;
        &lt;svg class="car-brand__icon"&gt;
          &lt;image :xlink:href="value" :src="value" /&gt;
        &lt;/svg&gt;
        &lt;span class="v-hidden-in-tag"&gt;<span>{</span><span>{</span> key <span>}</span><span>}</span>&lt;/span&gt;
      &lt;/v-tag-option&gt;

      &lt;v-tag-option class="car-next" divided @click="toggleBrands"&gt;
        <span>{</span><span>{</span> isBrandsNext ? 'prev' : 'next' <span>}</span><span>}</span>
      &lt;/v-tag-option&gt;
    &lt;/v-tag-dropdown&gt;

    &lt;v-tag-dropdown value="color"&gt;
      &lt;v-tag-option title&gt; color &lt;/v-tag-option&gt;
      &lt;v-tag-option @click="elColorPickerRef.show()"&gt;
        &lt;el-color-picker v-model="colorPicker" ref="elColorPickerRef" /&gt;
      &lt;/v-tag-option&gt;
    &lt;/v-tag-dropdown&gt;

    &lt;v-tag-dropdown value="date"&gt;
      &lt;v-tag-option title&gt; date &lt;/v-tag-option&gt;
      &lt;v-tag-option @click="elDatePickerRef.focus()"&gt;
        &lt;el-date-picker v-model="datePicker" ref="elDatePickerRef" ... /&gt;
      &lt;/v-tag-option&gt;
    &lt;/v-tag-dropdown&gt;
  &lt;/v-tags-multiselect&gt;<br><!--
  -->&lt;/v-tags-multiselect&gt;<!--
--></code></pre>
</template>

<script>
import Space from "@tools/show-html-code/space.vue";

export default {
  name: "exposes-pushTag__demo0--show-code",
  components: {
    Space,
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