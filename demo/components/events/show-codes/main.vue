<!-- eslint-disable prettier/prettier -->
<template>
<pre class="tag prettyprint lang-html customize"><code><!--
  -->&lt;v-tags-multiselect<br><!--
    --><span v-for="(item, key) in items" :key="key"><!--
        --><Space /><!--
            -->@{{ key }}<span>=</span><!--
            -->"<!--
                
            --><span class="lit">(</span><!--
                --><span class="red">{{ item[0] }}</span><!--
            --><span class="lit">)</span><!--

            --><span class="atv"> => </span><!--

            --><span class="lit">(</span><!--
                --><span>{{ item[1] }}</span>.<!--
                --><span class="red">value</span><!--
                --><span class="cyan-blue">{{ item[2] }}</span><!--
                --><span class="red">{{ item[3] }}</span><!--
            --><span class="lit">)</span><!--
            -->"<!--
        --><br><!--
    --></span><!--
    --><Space />v-model=<span class="atv">"result"</span><br><!--
    -->&gt;<br><!--
	--> ... <!--
--></code></pre>
</template>

<script>
import Space from '../../tools/show-html-code/space.vue'
export default {
  name: 'events-show-code',
  components: {
    Space
  },
  data() {
    return {
      items: {
        focus: ['', 'focusCount', '++', ''],
        blur: ['', 'blurCount', '++', ''],
        clear: ['', 'clearCount', '++', ''],
        status: ['e', 'statusArray', ' = ', 'e'],
        'input-value': ['e', 'inputValue', ' = ', 'e'],
        'visible-change': ['e', 'visibleChange', ' = ', 'e'],
        'remove-tag': ['e', 'removeTag', ' = ', 'e'],
        'selecting-tag': ['e', 'selectingTag', ' = ', 'e']
      }
    }
  }
}
</script>
