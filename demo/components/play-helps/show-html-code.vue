<script>
export default {
  name: 'play-code-html-main'
}
</script>
<script setup>
import { inject } from 'vue'
import { useI18n } from 'vue-i18n'

import Space from './../tools/show-html-code/space.vue'
import AttributesAndSlots from './../tools/show-html-code/attributes-and-slots.vue'
import { ATTRIBUTE_CONVERT_TO_SIMPLE, DETAIL_CONVERT_TO_SIMPLE } from '@models/attributes/tools.js'

const appAttributes = inject('attributes')
const appSlots = inject('slots')

const { t } = useI18n()
const renderData = (value) => {
  return t(`ui.` + value)
}
</script>

<template>
  <pre><code><!--
-->&lt;vue-tags-multiselect<br><!--
--><Space />ref="VTagsMultiselect"<br><!--
--><Space />v-model="result"<br><!--

  --><AttributesAndSlots :app="ATTRIBUTE_CONVERT_TO_SIMPLE(appAttributes)" :slots="DETAIL_CONVERT_TO_SIMPLE(appSlots)" />
  &lt;v-tag-dropdown value="country" display-all&gt;
    &lt;v-tag-option title&gt;
      &lt;i class="fa fa-flag"&gt;&lt;/i&gt; <span v-html="renderData('general.Country')"></span>
    &lt;/v-tag-option&gt;
    &lt;v-tag-option value="Māre"&gt;<span v-html="renderData('data.country.Māre')"></span>&lt;/v-tag-option&gt;
    &lt;v-tag-option value="Eldia"&gt;<span v-html="renderData('data.country.Eldia')"></span>&lt;/v-tag-option&gt;
  &lt;/v-tag-dropdown&gt;
  &lt;v-tag-dropdown value="name"&gt;
    &lt;v-tag-option title divided&gt;
      &lt;i class="fa fa-user"&gt;&lt;/i&gt; <span v-html="renderData('general.Name')"></span> &lt;small&gt;(loading)&lt;/small&gt;
    &lt;/v-tag-option&gt;
    &lt;v-tag-option value="Grisha Yeager"&gt;<span v-html="renderData('data.name.Grisha Yeager')"></span>&lt;/v-tag-option&gt;
    &lt;v-tag-option value="Eren Yeager"&gt;<span v-html="renderData('data.name.Eren Yeager')"></span>&lt;/v-tag-option&gt;
    &lt;v-tag-option value="Armin Arlert"&gt;<span v-html="renderData('data.name.Armin Arlert')"></span>&lt;/v-tag-option&gt;
    &lt;&#33;-- vuejs --&gt;
    &lt;v-tag-option
      v-for="<span class="lit">(</span>data, index<span class="lit">)</span> in otherData"
      :key="`data${index}`"
      :value="data"
    <span class="tag">&gt;</span>
      <span class="lit">&#123;&#123;</span> data <span class="lit">&#125;&#125;</span>
    &lt;/v-tag-option&gt;
  &lt;/v-tag-dropdown&gt;
  &lt;v-tag-dropdown value="height" display-all&gt;
    &lt;v-tag-option title&gt;
      &lt;i class="fa fa-user"&gt;&lt;/i&gt; <span v-html="renderData('general.Height(m)')"></span>
    &lt;/v-tag-option&gt;
    &lt;v-tag-option&gt;
      &lt;input
        type="number"
        name="height1"
        min="1"
        :max="height2 || 60"
        style="width: 5em"
        :placeholder="`0 ~ ${height2 || 60}`"
        v-model="height1"
        ref="inputHeight1"
        @keydown.enter="<span class="lit">()</span> => <span class="lit">{</span> <span class="cyan-blue">$refs</span>.<span class="cyan-blue">inputHeight2</span>.focus<span class="purple">()</span>; <span class="lit">}</span>"
      /&gt;
      &lt;span&gt; ~ &lt;/span&gt;
      &lt;input
        type="number"
        name="height2"
        :min="height1 || 0"
        max="60"
        style="width: 5em"
        :placeholder="`${height1 || 0} ~ 60`"
        v-model="height2"
        ref="inputHeight2"
        @keydown.enter="<span class="lit">()</span> => <span class="lit">{</span> <span class="cyan-blue">$refs</span>.<span class="cyan-blue">VTagsMultiselect</span>.pushTag<span class="purple">(</span>
          {<span class="red">key</span>: <span class="green">"height"</span>, <span class="red">value</span>: <span class="green">`${height1} ~ ${height2}`</span>}
        <span class="purple">)</span>; <span class="lit">}</span>"
      /&gt;
    &lt;/v-tag-option&gt;
  &lt;/v-tag-dropdown&gt;
  &lt;v-tag-dropdown value="remark" display-all&gt;
    &lt;v-tag-option title&gt;
      &lt;i class="fa fa-sticky-note"&gt;&lt;/i&gt; <span v-html="renderData('general.Remark')"></span>
    &lt;/v-tag-option&gt;
    &lt;v-tag-option value="yes"&gt;
      &lt;i class="fa fa-check"&gt;&lt;/i&gt;
    &lt;/v-tag-option&gt;
    &lt;v-tag-option value="no"&gt;
      &lt;i class="fa fa-close"&gt;&lt;/i&gt;
    &lt;/v-tag-option&gt;
  &lt;/v-tag-dropdown&gt;
&lt;/vue-tags-multiselect&gt;<!--
--></code></pre>
</template>
