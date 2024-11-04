<!-- eslint-disable prettier/prettier -->
<template>
  <pre class="prettyprint lang-js customize"><code><!--
--><span class="keyword">const</span> elVTagsMultiselect = <span class="function">ref</span><span class="parenthesis">(null)</span>

<span class="keyword">const</span> colorPicker = <span class="function">ref</span><span class="parenthesis">()</span>
<span class="function">watch</span><span class="parenthesis">(</span>colorPicker, <span class="bracket">(</span><span class="variable">value</span><span class="bracket">) => &#123;</span>
  elVTagsMultiselect.<span class="variable">value</span>.<span class="function">pushTag(</span><span class="bracket">&#123;</span>
    <span class="variable">key</span>: <span class="string">'color'</span>,
    <span class="variable">valueElm</span>: <span class="string">`&lt;span class="color-box" style="background-color: <span class="bracket">$&#123;</span><span class="variable">value</span><span class="bracket">&#125;</span>"&gt;&lt;/span&gt;`</span>,
    <span class="variable">value</span>: <span class="variable">value</span>
  <span class="bracket">&#125;</span><span class="function">)</span>
<span class="bracket">&#125;</span><span class="parenthesis">)</span>

<span><!--
  --><span class="keyword">const </span><!--
  -->datePicker = <!--
  --><span class="function">ref</span><!--
  --><span class="parenthesis">(</span><!--
  --><span class="bracket">[]</span><!--
  --><span class="parenthesis">)</span><!--
--></span>
<span class="function">watch</span><span class="parenthesis">(</span>datePicker, <span class="bracket">(</span><span class="variable">value</span><span class="bracket">) => &#123;</span>
  elVTagsMultiselect.<span class="variable">value</span>.<span class="function">pushTag(</span><span class="bracket">&#123;</span>
    <span class="variable">key</span>: <span class="string">'date'</span>,
    <span class="variable">value</span>: <!--
    --><span class="string">`<!--
    --><span class="bracket">$&#123;</span><!--
    --><span class="variable">value</span><!--
    --><span class="bracket">[</span>0<span class="bracket">]</span><!--
    --><span class="bracket">&#125;</span><!--
    --> ~ <!--
    --><span class="bracket">$&#123;</span><!--
    --><span class="variable">value</span><!--
    --><span class="bracket">[</span>1<span class="bracket">]</span><!--
    --><span class="bracket">&#125;</span>`<!--
  --></span>
  <span class="bracket">&#125;</span><span class="function">)</span>
<span class="bracket">&#125;</span><span class="parenthesis">)</span>
</code></pre>
</template>

<script>
export default {
  name: 'exposes-pushTag__demo0--show-code',
}
</script>
<style scoped lang="scss">
@media (max-width: 414px) {
  code {
    font-size: 12px;
  }
}
</style>
