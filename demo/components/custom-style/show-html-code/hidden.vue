<!-- eslint-disable prettier/prettier -->
<template>
  <pre class="tag prettyprint lang-html customize"><code><!--
  -->&lt;v-tags-multiselect v-model="result"&gt;<br><!--
    --><Space />&lt;v-tag-dropdown value="country" display-all&gt;<br><!--

    --><Space :n="2"/>&lt;v-tag-option title&gt;<br><!--
      --><Space :n="3"/>&lt;span class="v-hidden-in-dropdown"&gt;<br><!--
        --><Space :n="4"/>&lt;i class="fa fa-flag-o"&gt;&lt;/i&gt;<br><!--
      --><Space :n="3"/>&lt;/span&gt;<br><!--
      --><Space :n="3"/>&lt;span class="v-hidden-in-tag"&gt;<br><!--
        --><Space :n="4"/>&lt;i class="fa fa-flag"&gt;&lt;/i&gt;<br><!--
        --><Space :n="4"/><span v-html="renderData('general.Country')"></span><br><!--
      --><Space :n="3"/>&lt;/span&gt;<br><!--
    --><Space :n="2"/>&lt;/v-tag-option&gt;<br><br><!--

    --><Space :n="2"/>&lt;v-tag-option value="Māre"&gt;<!--
      --><span v-html="renderData('data.country.Māre')"></span><!--
    -->&lt;/v-tag-option&gt;<br><!--

    --><Space :n="2"/>&lt;v-tag-option value="Eldia"&gt;<!--
      --><span v-html="renderData('data.country.Eldia')"></span><!--
    -->&lt;/v-tag-option&gt;<br><!--
  
      --><Space />&lt;/v-tag-dropdown&gt;<br><!--
    
    --><Space />...<br><!--
  -->&lt;/v-tags-multiselect&gt;<!--
--></code></pre>
</template>

<script>
import Space from '@tools/show-html-code/space.vue'

export default {
  name: 'custom-style-show-html-code-hidden',
  components: {
    Space
  },
  methods: {
    renderData(input) {
      return this.$t('ui.' + input)
    },
  }
}
</script>
