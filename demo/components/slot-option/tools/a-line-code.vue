<!-- eslint-disable prettier/prettier -->
<template>
  <pre class="tag prettyprint lang-html customize"><code><!--
  -->&lt;v-tags-multiselect v-model="result"&gt;<br><!--
    --><Space />&lt;v-tag-dropdown value="country"<span v-if="isBolder('displayAll')"> display-all</span>&gt;<br><!--

    --><Space :n="2"/>&lt;v-tag-option<span v-if="!isNotTitle" :class="getClass('title')"> title</span>&gt;<br><!--
      --><Space :n="3"/>&lt;i class="fa fa-flag"&gt;&lt;/i&gt; <span v-html="renderData('general.Country')"></span><br><!--
    --><Space :n="2"/>&lt;/v-tag-option&gt;<br><!--

    --><Space :n="2"/>&lt;v-tag-option<!--
      --><span :class="getClass('value')"> value</span>="Māre"<!--
      --><span class="bolder" v-if="isBolder('selected')"> selected</span><!--
      --><span class="bolder" v-if="isBolder('displayValue')"> display-value</span><!--
      --><span class="bolder" v-if="isBolder('disabled')"> disabled</span><!--
      --><span class="bolder" v-if="isBolder('divided')"> divided</span><!--
      --><span v-if="isBolder('displayValue')"><br/>   // or <span class="bolder">:displayValue="true"</span><br/>  </span><!--
      -->&gt;<br><!--
      --><Space :n="3"/><span v-html="renderData('data.country.Māre')"></span><br><!--
    --><Space :n="2"/>&lt;/v-tag-option&gt;<br><!--

    --><Space :n="2"/>&lt;v-tag-option <span :class="getClass('value')">value</span>="Eldia"&gt;<br><!--
      --><Space :n="3"/><span v-html="renderData('data.country.Eldia')"></span><br><!--
    --><Space :n="2"/>&lt;/v-tag-option&gt;<br><!--
  
      --><Space />&lt;/v-tag-dropdown&gt;<br><!--
    
    --><Space />...<br><!--
  -->&lt;/v-tags-multiselect&gt;<!--
--></code></pre>
</template>

<script>
import Space from '@tools/show-html-code/space.vue'

export default {
  name: 'option-tools-line-code',
  components: {
    Space
  },
  props: {
    isNotTitle: {
      type: Boolean,
      default: () => {
        return false
      }
    },
    bolders: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  methods: {
    renderData(input) {
      return this.$t('ui.' + input)
    },
    getClass(input) {
      return { bolder: this.isBolder(input) }
    },
    isBolder(input) {
      return this.bolders.includes(input)
    }
  }
}
</script>
