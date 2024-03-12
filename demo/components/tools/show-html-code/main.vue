<template>
  <pre><code><!--
-->&lt;v-tags-multiselect<br><!--
--><Space />v-model="result"<br><!--

  --><AttributesAndSlots :app="app" :slots="slots" /><!--
  --><slot name="country" v-if="appDropdown.country.isDisplayForDemo"><!--
  -->
  &lt;v-tag-dropdown value="country"<DropdownProps :props="appDropdown.country" />&gt;
    &lt;v-tag-option title<OptionProps :props="appOption.country[0]" />&gt;
      &lt;i class="fa fa-flag"&gt;&lt;/i&gt; <span v-html="renderData('general.Country')"></span>
    &lt;/v-tag-option&gt;
    &lt;v-tag-option value="Māre"<OptionProps :props="appOption.country[1]" />&gt;<span v-html="renderData('data.country.Māre')"></span>&lt;/v-tag-option&gt;
    &lt;v-tag-option value="Eldia"<OptionProps :props="appOption.country[2]" />&gt;<span v-html="renderData('data.country.Eldia')"></span>&lt;/v-tag-option&gt;
  &lt;/v-tag-dropdown&gt;<!--
  --></slot><!--
  --><slot name="name" v-if="appDropdown.name.isDisplayForDemo"><!--
  -->
  &lt;v-tag-dropdown value="name"<DropdownProps :props="appDropdown.name" />&gt;
    &lt;v-tag-option title<OptionProps :props="appOption.name[0]" />&gt;
      &lt;i class="fa fa-user"&gt;&lt;/i&gt; <span v-html="renderData('general.Name')"></span>
    &lt;/v-tag-option&gt;
    &lt;v-tag-option value="Grisha Yeager"<OptionProps :props="appOption.name[1]" />&gt;
      <span v-html="renderData('data.name.Grisha Yeager')"></span>
    &lt;/v-tag-option&gt;
    &lt;v-tag-option value="Eren Yeager"<OptionProps :props="appOption.name[2]" />&gt;
      <span v-html="renderData('data.name.Eren Yeager')"></span>
    &lt;/v-tag-option&gt;
    &lt;v-tag-option value="Armin Arlert"<OptionProps :props="appOption.name[3]" />&gt;
      <span v-html="renderData('data.name.Armin Arlert')"></span>
    &lt;/v-tag-option&gt;
  &lt;/v-tag-dropdown&gt;<!--
  --></slot><!--  

  --><slot name="remark" v-if="appDropdown.remark.isDisplayForDemo"><!--
  -->
  &lt;v-tag-dropdown value="remark"<DropdownProps :props="appDropdown.remark" />&gt;
    &lt;v-tag-option title<OptionProps :props="appOption.remark[0]" />&gt;
      &lt;i class="fa fa-sticky-note"&gt;&lt;/i&gt; <span v-html="renderData('general.Remark')"></span>
    &lt;/v-tag-option&gt;
    &lt;v-tag-option value="yes<OptionProps :props="appOption.remark[1]" />"&gt;
      &lt;i class="fa fa-check"&gt;&lt;/i&gt;
    &lt;/v-tag-option&gt;
    &lt;v-tag-option value="no"<OptionProps :props="appOption.remark[2]" />&gt;
      &lt;i class="fa fa-close"&gt;&lt;/i&gt;
    &lt;/v-tag-option&gt;
  &lt;/v-tag-dropdown&gt;<!--
  --></slot><!--
  --><span v-if="appDropdown.remark.isDisplayForDemo == false"><!--
    --><br v-if="appDropdown.country.isDisplayForDemo || appDropdown.name.isDisplayForDemo" /><!--
    --><Space />...<!--
  --></span>
&lt;/v-tags-multiselect&gt;
</code></pre>
</template>

<script>
import Space from "./space.vue";
import AttributesAndSlots from "./attributes-and-slots.vue";
import DropdownProps from "./dropdown-props-template.vue";
import OptionProps from "./option-props-template.vue";
import PackageAttributes from "../mixins/package-attributes.js";

export default {
  name: "show-html-code",
  mixins: [PackageAttributes],
  components: {
    Space,
    AttributesAndSlots,
    DropdownProps,
    OptionProps,
  },
  props: {
    selecteds: { // need delete
      type: Object,
      default: () => {
        return {};
      },
    },
    dropdownSetting: { // need delete
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  watch: {
    "$i18n.locale": {
      handler() {
        this.$forceUpdate();
      },
      deep: true,
    },
  },
  methods: {
    renderData(value) {
      return this.$t("ui." + value);
    },
  },
};
</script>
