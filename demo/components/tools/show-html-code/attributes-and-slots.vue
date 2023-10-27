<!-- eslint-disable prettier/prettier -->
<template><!--
  --><span v-show="app.disabled == true"><Space /><span class="pln">:</span><span class="atn">disabled</span><span class="pun">=</span><span class="atv">"{{ app.disabled }}"</span><br></span><!--
  --><span v-show="app.loading == true"><Space /><span class="pln">:</span><span class="atn">loading</span><span class="pun">=</span><span class="atv">"{{ app.loading }}"</span><br></span><!--
  --><span v-show="app.dropdownLoading == true"><Space /><span class="pln">:</span><span class="atn">dropdownLoading</span><span class="pun">=</span><span class="atv">"{{ app.dropdownLoading }}"</span><br></span><!--
  --><span v-show="app.search == false"><Space /><span class="pln">:</span><span class="atn">search</span><span class="pun">=</span><span class="atv">"{{ app.search }}"</span><br></span><!--
  --><span v-show="app.transition == false"><Space /><span class="pln">:</span><span class="atn">transition</span><span class="pun">=</span><span class="atv">"{{ app.transition }}"</span><br></span><!--
  --><span v-show="app.create == false"><Space /><span class="pln">:</span><span class="atn">create</span><span class="pun">=</span><span class="atv">"{{ app.create }}"</span><br></span><!--
  --><span v-show="app.merge == false"><Space /><span class="pln">:</span><span class="atn">merge</span><span class="pun">=</span><span class="atv">"{{ app.merge }}"</span><br></span><!--
  --><span v-show="app.deleteIcon != 'always' && verify(app.deleteIcon)"><Space /><span class="pln">:</span><span class="atn">deleteIcon</span><span class="pun">=</span><span class="atv">"{{ app.deleteIcon }}"</span><br></span><!--
  --><span v-show="verify(app.conjunction)"><Space /><span class="pln">:</span><span class="atn">conjunction</span><span class="pun">=</span><span class="atv">"{{ app.conjunction }}"</span><br></span><!--
  --><span v-show="verifyText(app.placeholder)"><Space /><span class="pln">:</span><span class="atn">placeholder</span><span class="pun">=</span><span class="atv">"{{ app.placeholder }}"</span><br></span><!--
  --><span v-show="Object.values(cleanedObject(app.placeholders)).length != 0"><!--
    --><Space /><!--
    --><span class="pln">:</span><span class="atn">placeholders</span><span class="pun">=</span>"{<br><!--
    --><span v-for="(value, key) in cleanedObject(app.placeholders)" :key="key"><!--
      --><Space :n="2"/><!--
      --><span class="white">{{ key }}: </span><!--
      --><span class="atv">'{{ value }}'</span><span class="white">,</span><br><!--
    --></span><!--
  -->  }"<br><!-- 
  --></span><!--
-->&gt;<!--
  --><span v-show="verifyText(app.tagConjunction)">
  <span class="pln"></span><span class="tag">&lt;template</span><span class="pln"> </span><span class="atn">slot</span><span class="pun">=</span><span class="atv">"tag-conjunction"</span><span class="tag">&gt;</span><span class="pln">
    </span><span class="tag">&lt;span&gt;</span>{{ app.tagConjunction }}<span class="tag">&lt;/span&gt;</span><span class="pln">
  </span><span class="tag">&lt;/template&gt;</span><span class="pln"><!--
  --></span></span><!--
  --><span v-show="verifyText(app.loadingContent)">
  <span class="pln"></span><span class="tag">&lt;template</span><span class="pln"> </span><span class="atn">slot</span><span class="pun">=</span><span class="atv">"loading"</span><span class="tag">&gt;</span><span class="pln">
    </span><span class="tag">&lt;span&gt;</span>{{ app.loadingContent }}<span class="tag">&lt;/span&gt;</span><span class="pln">
  </span><span class="tag">&lt;/template&gt;</span><span class="pln"><!--
  --></span></span><!--
  --><span v-show="verifyText(app.optionUndoContent)">
  <span class="pln"></span><span class="tag">&lt;template</span><span class="pln"> </span><span class="atn">slot</span><span class="pun">=</span><span class="atv">"option-undo"</span><span class="tag">&gt;</span><span class="pln">
    </span><span class="tag">&lt;span&gt;</span>{{ app.optionUndoContent }}<span class="tag">&lt;/span&gt;</span><span class="pln">
  </span><span class="tag">&lt;/template&gt;</span><span class="pln"><!--
  --></span></span><!--
  --><span v-show="verifyText(app.optionORConjunctionContent)">
  <span class="pln"></span><span class="tag">&lt;template</span><span class="pln"> </span><span class="atn">slot</span><span class="pun">=</span><span class="atv">"option-OR-conjunction"</span><span class="tag">&gt;</span><span class="pln">
    </span><span class="tag">&lt;span&gt;</span>{{ app.optionORConjunctionContent }}<span class="tag">&lt;/span&gt;</span><span class="pln">
  </span><span class="tag">&lt;/template&gt;</span><span class="pln"><!--
  --></span></span><!--
  --><span v-show="verifyText(app.dropdownLoadingContent)">
  <span class="pln"></span><span class="tag">&lt;template</span><span class="pln"> </span><span class="atn">slot</span><span class="pun">=</span><span class="atv">"loading"</span><span class="tag">&gt;</span><span class="pln">
    </span><span class="tag">&lt;span&gt;</span>{{ app.dropdownLoadingContent }}<span class="tag">&lt;/span&gt;</span><span class="pln">
  </span><span class="tag">&lt;/template&gt;</span><span class="pln"><!--
  --></span></span><!--
--></template>

<script>
import Space from "./space.vue";

export default {
  name: "show-html-code__attributes-and-slots",
  components: {
    Space,
  },
  props: {
    app: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  methods: {
    verify(value) {
      return this.verifyText(value) && value != "null";
    },
    verifyText(value) {
      return value != "" && value != undefined;
    },
    cleanedObject(obj = {}) {
      return Object.fromEntries(
        Object.entries(obj).filter(
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          ([_, v]) => v != undefined && v != null && v != "" && v != []
        )
      );
    },
  },
};
</script>
