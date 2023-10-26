<template>
  <pre><code><!--
-->&lt;vue-tags-multiselect
  v-model="result"<br><!--
  --><span v-show="app.disabled == true">  <span class="pln">:</span><span class="atn">disabled</span><span class="pun">=</span><span class="atv">"{{ app.disabled }}"</span><br></span><!--
  --><span v-show="app.loading == true">  <span class="pln">:</span><span class="atn">loading</span><span class="pun">=</span><span class="atv">"{{ app.loading }}"</span><br></span><!--
  --><span v-show="app.dropdownLoading == true">  <span class="pln">:</span><span class="atn">dropdownLoading</span><span class="pun">=</span><span class="atv">"{{ app.dropdownLoading }}"</span><br></span><!--
  --><span v-show="app.search == false">  <span class="pln">:</span><span class="atn">search</span><span class="pun">=</span><span class="atv">"{{ app.search }}"</span><br></span><!--
  --><span v-show="app.transition == false">  <span class="pln">:</span><span class="atn">transition</span><span class="pun">=</span><span class="atv">"{{ app.transition }}"</span><br></span><!--
  --><span v-show="app.create == false">  <span class="pln">:</span><span class="atn">create</span><span class="pun">=</span><span class="atv">"{{ app.create }}"</span><br></span><!--
  --><span v-show="app.merge == false">  <span class="pln">:</span><span class="atn">merge</span><span class="pun">=</span><span class="atv">"{{ app.merge }}"</span><br></span><!--
  --><span v-show="app.deleteIcon != 'always' && verify(app.deleteIcon)">  <span class="pln">:</span><span class="atn">deleteIcon</span><span class="pun">=</span><span class="atv">"{{ app.deleteIcon }}"</span><br></span><!--
  --><span v-show="verify(app.conjunction)">  <span class="pln">:</span><span class="atn">conjunction</span><span class="pun">=</span><span class="atv">"{{ app.conjunction }}"</span><br></span><!--
  --><span v-show="verifyText(app.placeholder)">  <span class="pln">:</span><span class="atn">placeholder</span><span class="pun">=</span><span class="atv">"{{ app.placeholder }}"</span><br></span><!--
  --><span v-show="Object.values(cleanedObject(app.placeholders)).length != 0"><!--
    -->  <!--
    --><span class="pln">:</span><span class="atn">placeholders</span><span class="pun">=</span>"{<br><!--
    --><span v-for="(value, key) in cleanedObject(app.placeholders)" :key="key"><!--
      -->    <!--
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
  --></span></span>
  <slot name="country" v-if="appDropdownSetting.display.country"><!--
  -->&lt;v-tag-dropdown value="country"<span v-show="appDropdownSetting.custom.country"> custom</span>&gt;
    &lt;v-tag-option title&gt;
      &lt;i class="fa fa-flag"&gt;&lt;/i&gt; <span v-html="renderData('general.Country')"></span>
    &lt;/v-tag-option&gt;
    &lt;v-tag-option value="Māre"<span v-show="appSelecteds.country[0]"> selected</span>&gt;<span v-html="renderData('data.country.Māre')"></span>&lt;/v-tag-option&gt;
    &lt;v-tag-option value="Eldia"<span v-show="appSelecteds.country[1]"> selected</span>&gt;<span v-html="renderData('data.country.Eldia')"></span>&lt;/v-tag-option&gt;
  &lt;/v-tag-dropdown&gt;
  </slot>
  <slot name="name" v-if="appDropdownSetting.display.name"><!--
  -->&lt;v-tag-dropdown value="name"<span v-show="appDropdownSetting.custom.name"> custom</span>&gt;
    &lt;v-tag-option title&gt;
      &lt;i class="fa fa-user"&gt;&lt;/i&gt; <span v-html="renderData('general.Name')"></span>
    &lt;/v-tag-option&gt;
    &lt;v-tag-option value="Grisha Yeager"<span v-show="appSelecteds.name[0]"> selected</span>&gt;
      <span v-html="renderData('data.name.Grisha Yeager')"></span>
    &lt;/v-tag-option&gt;
    &lt;v-tag-option value="Eren Yeager"<span v-show="appSelecteds.name[1]"> selected</span>&gt;
      <span v-html="renderData('data.name.Eren Yeager')"></span>
    &lt;/v-tag-option&gt;
    &lt;v-tag-option value="Armin Arlert"<span v-show="appSelecteds.name[2]"> selected</span>&gt;
      <span v-html="renderData('data.name.Armin Arlert')"></span>
    &lt;/v-tag-option&gt;
  &lt;/v-tag-dropdown&gt;
  </slot>
  <slot name="remark" v-if="appDropdownSetting.display.remark"><!--
  -->&lt;v-tag-dropdown value="remark" display-all<span v-show="appDropdownSetting.custom.remark"> custom</span>&gt;
    &lt;v-tag-option title&gt;
      &lt;i class="fa fa-sticky-note"&gt;&lt;/i&gt; <span v-html="renderData('general.Remark')"></span>
    &lt;/v-tag-option&gt;
    &lt;v-tag-option value="yes<span v-show="appSelecteds.remark[0]"> selected</span>"&gt;
      &lt;i class="fa fa-check"&gt;&lt;/i&gt;
    &lt;/v-tag-option&gt;
    &lt;v-tag-option value="no"<span v-show="appSelecteds.remark[1]"> selected</span>&gt;
      &lt;i class="fa fa-close"&gt;&lt;/i&gt;
    &lt;/v-tag-option&gt;
  &lt;/v-tag-dropdown&gt;
  </slot>
&lt;/v-tags-multiselect&gt;
</code></pre>
</template>

<script>
export default {
  props: {
    app: {
      type: Object,
      default: () => {
        return {};
      },
    },
    selecteds: {
      type: Object,
      default: () => {
        return {};
      },
    },
    dropdownSetting: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  data() {
    return {
      appSelecteds: {
        country: [false, false],
        name: [false, false, false],
        remark: [false, false],
      },
      appDropdownSetting: {
        display: {
          country: true,
          name: true,
          remark: true,
        },
        custom: {
          country: false,
          name: false,
          remark: false,
        },
      },
    };
  },
  watch: {
    "$i18n.locale": {
      handler() {
        this.$forceUpdate();
      },
      deep: true,
    },
    selecteds: {
      handler(value) {
        this.appSelecteds = {
          ...this.appSelecteds,
          ...value,
        };
      },
      deep: true,
    },
    dropdownSetting: {
      handler(value) {
        this.appDropdownSetting = {
          ...this.appDropdownSetting,
          ...value,
        };
      },
      deep: true,
    },
  },
  created() {
    this.appSelecteds = { ...this.appSelecteds, ...this.selecteds };
    this.appDropdownSetting = {
      ...this.appDropdownSetting,
      ...this.dropdownSetting,
    };
  },
  methods: {
    verify(value) {
      return this.verifyText(value) && value != "null";
    },
    verifyText(value) {
      return value != "" && value != undefined;
    },
    renderData(value) {
      return this.$t("ui." + value);
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
