<template>
  <pre><code>
    &lt;vue-tags-multiselect
      ref="vueTagsMultiselect"
      v-model="result"<br><!--
      --><span v-show="app.disabled == 'true'">    <span class="pln">:</span><span class="atn">disabled</span><span class="pun">=</span><span class="atv">"{{ app.disabled }}"</span><br></span><!--
      --><span v-show="app.loading == 'true'">    <span class="pln">:</span><span class="atn">loading</span><span class="pun">=</span><span class="atv">"{{ app.loading }}"</span><br></span><!--
      --><span v-show="app.search == 'false'">    <span class="pln">:</span><span class="atn">search</span><span class="pun">=</span><span class="atv">"{{ app.search }}"</span><br></span><!--
      --><span v-show="app.transition == 'false'">    <span class="pln">:</span><span class="atn">transition</span><span class="pun">=</span><span class="atv">"{{ app.transition }}"</span><br></span><!--
      --><span v-show="app.create == 'false'">    <span class="pln">:</span><span class="atn">create</span><span class="pun">=</span><span class="atv">"{{ app.create }}"</span><br></span><!--
      --><span v-show="app.merge == 'false'">    <span class="pln">:</span><span class="atn">merge</span><span class="pun">=</span><span class="atv">"{{ app.merge }}"</span><br></span><!--
      --><span v-show="app.deleteIcon != 'always'">    <span class="pln">:</span><span class="atn">deleteIcon</span><span class="pun">=</span><span class="atv">"{{ app.deleteIcon }}"</span><br></span><!--
      --><span v-show="app.conjunction != 'null'">    <span class="pln">:</span><span class="atn">conjunction</span><span class="pun">=</span><span class="atv">"{{ app.conjunction }}"</span><br></span><!--
      --><span v-show="app.loadingPlaceholder != ''">    <span class="pln">:</span><span class="atn">loadingPlaceholder</span><span class="pun">=</span><span class="atv">"{{ app.loadingPlaceholder }}"</span><br></span><!--
      --><span v-show="app.selectDownPlaceholder != ''">    <span class="pln">:</span><span class="atn">selectDownPlaceholder</span><span class="pun">=</span><span class="atv">"{{ app.selectDownPlaceholder }}"</span><br></span><!--
      --><span v-show="app.finishPlaceholder != ''">    <span class="pln">:</span><span class="atn">finishPlaceholder</span><span class="pun">=</span><span class="atv">"{{ app.finishPlaceholder }}"</span><br></span><!--
    -->&gt;<!--
      --><span v-show="app.tagConjunction != ''">
      <span class="pln"></span><span class="tag">&lt;template</span><span class="pln"> </span><span class="atn">slot</span><span class="pun">=</span><span class="atv">"tag-conjunction"</span><span class="tag">&gt;</span><span class="pln">
        </span><span class="tag">&lt;span&gt;</span>{{ app.tagConjunction }}<span class="tag">&lt;/span&gt;</span><span class="pln">
      </span><span class="tag">&lt;/template&gt;</span><span class="pln"><!--
      --></span></span><!--
      --><span v-show="app.loadingContent != ''">
      <span class="pln"></span><span class="tag">&lt;template</span><span class="pln"> </span><span class="atn">slot</span><span class="pun">=</span><span class="atv">"loading"</span><span class="tag">&gt;</span><span class="pln">
        </span><span class="tag">&lt;span&gt;</span>{{ app.loadingContent }}<span class="tag">&lt;/span&gt;</span><span class="pln">
      </span><span class="tag">&lt;/template&gt;</span><span class="pln"><!--
      --></span></span><!--
      --><span v-show="app.optionUndoContent != ''">
      <span class="pln"></span><span class="tag">&lt;template</span><span class="pln"> </span><span class="atn">slot</span><span class="pun">=</span><span class="atv">"option-undo"</span><span class="tag">&gt;</span><span class="pln">
        </span><span class="tag">&lt;span&gt;</span>{{ app.optionUndoContent }}<span class="tag">&lt;/span&gt;</span><span class="pln">
      </span><span class="tag">&lt;/template&gt;</span><span class="pln"><!--
      --></span></span><!--
      --><span v-show="app.optionORConjunctionContent != ''">
      <span class="pln"></span><span class="tag">&lt;template</span><span class="pln"> </span><span class="atn">slot</span><span class="pun">=</span><span class="atv">"option-OR-conjunction"</span><span class="tag">&gt;</span><span class="pln">
        </span><span class="tag">&lt;span&gt;</span>{{ app.optionORConjunctionContent }}<span class="tag">&lt;/span&gt;</span><span class="pln">
      </span><span class="tag">&lt;/template&gt;</span><span class="pln"><!--
      --></span><br></span>
      &lt;v-tag-dropdown value="country" display-all&gt;
        &lt;v-tag-option title&gt;
          &lt;i class="fa fa-flag"&gt;&lt;/i&gt; Country
        &lt;/v-tag-option&gt;
        &lt;v-tag-option value="Māre"&gt;Māre&lt;/v-tag-option&gt;
        &lt;v-tag-option value="Eldia"&gt;Ya Eldia&lt;/v-tag-option&gt;
      &lt;/v-tag-dropdown&gt;
      &lt;v-tag-dropdown value="name"&gt;
        &lt;v-tag-option title divided&gt;
          &lt;i class="fa fa-user"&gt;&lt;/i&gt; Name &lt;small&gt;(loading)&lt;/small&gt;
        &lt;/v-tag-option&gt;
        &lt;v-tag-option value="Grisha Yeager"&gt;Grisha Yeager&lt;/v-tag-option&gt;
        &lt;v-tag-option value="Eren Yeager"&gt;Eren Yeager&lt;/v-tag-option&gt;
        &lt;v-tag-option value="Armin Arlert"&gt;Armin Arlert&lt;/v-tag-option&gt;
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
          &lt;i class="fa fa-user"&gt;&lt;/i&gt; Height(m)
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
            @keydown.enter="<span class="lit">()</span> => <span class="lit">{</span> <span class="cyan-blue">$refs</span>.<span class="cyan-blue">inputHeight2</span>.focus<span class="purple">()</span>; <span class="lit">}</span>"
            ref="inputHeight1"
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
            @keydown.enter="<span class="lit">()</span> => <span class="lit">{</span> <span class="cyan-blue">$refs</span>.<span class="cyan-blue">vueTagsMultiselect</span>.pushValue<span class="purple">(</span>`${height1} ~ ${height2}`, 'height'<span class="purple">)</span>; <span class="lit">}</span>"
            ref="inputHeight2"
          /&gt;
        &lt;/v-tag-option&gt;
      &lt;/v-tag-dropdown&gt;
      &lt;v-tag-dropdown value="remark" display-all&gt;
        &lt;v-tag-option title&gt;
          &lt;i class="fa fa-sticky-note"&gt;&lt;/i&gt; Remark
        &lt;/v-tag-option&gt;
        &lt;v-tag-option value="yes"&gt;
          &lt;i class="fa fa-check"&gt;&lt;/i&gt;
        &lt;/v-tag-option&gt;
        &lt;v-tag-option value="no"&gt;
          &lt;i class="fa fa-close"&gt;&lt;/i&gt;
        &lt;/v-tag-option&gt;
      &lt;/v-tag-dropdown&gt;
    &lt;/vue-tags-multiselect&gt;
  </code></pre>
</template>

<script>
import { defineComponent } from "vue";
export default defineComponent({
  name: "code-html-main",
  inject: ["getDemo"],
  computed: {
    app() {
      return this.getDemo();
    },
  },
});
</script>
