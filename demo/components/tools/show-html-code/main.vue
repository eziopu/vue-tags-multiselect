<template>
  <pre><code><!--
-->&lt;v-tags-multiselect<br><!--
--><Space />v-model="result"<br><!--

  --><AttributesAndSlots :app="app" /><!--
  --><slot name="country" v-if="appDropdownSetting.display.country"><!--
  --><Space />&lt;v-tag-dropdown value="country"<span v-show="appDropdownSetting.custom.country"> custom</span>&gt;
    &lt;v-tag-option title&gt;
      &lt;i class="fa fa-flag"&gt;&lt;/i&gt; <span v-html="renderData('general.Country')"></span>
    &lt;/v-tag-option&gt;
    &lt;v-tag-option value="Māre"<span v-show="appSelecteds.country[0]"> selected</span>&gt;<span v-html="renderData('data.country.Māre')"></span>&lt;/v-tag-option&gt;
    &lt;v-tag-option value="Eldia"<span v-show="appSelecteds.country[1]"> selected</span>&gt;<span v-html="renderData('data.country.Eldia')"></span>&lt;/v-tag-option&gt;
  &lt;/v-tag-dropdown&gt;
  </slot><!--  

  --><slot name="name" v-if="appDropdownSetting.display.name"><!--
  -->
  &lt;v-tag-dropdown value="name"<span v-show="appDropdownSetting.custom.name"> custom</span>&gt;
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
  </slot><!--  

  --><slot name="remark" v-if="appDropdownSetting.display.remark"><!--
  -->
  &lt;v-tag-dropdown value="remark" display-all<span v-show="appDropdownSetting.custom.remark"> custom</span>&gt;
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
  </slot><span v-if="appDropdownSetting.display.remark == false">...</span>
&lt;/v-tags-multiselect&gt;
</code></pre>
</template>

<script>
import Space from "./space.vue";
import AttributesAndSlots from "./attributes-and-slots.vue";

export default {
  name: "show-html-code",
  components: {
    Space,
    AttributesAndSlots,
  },
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
    renderData(value) {
      return this.$t("ui." + value);
    },
  },
};
</script>
