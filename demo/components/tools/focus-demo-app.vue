<template>
  <v-tags-multiselect
    v-if="reloadByI18n"
    class="focus-demo-app"
    ref="vueTagsMultiselect"
    conjunction="AND"
    @status="(e) => (status = e)"
  >
    <v-tag-dropdown
      value="country"
      :displayAll="settings.dropdown.displayAll"
      :disabled="settings.dropdown.disabled"
      :divided="settings.dropdown.divided"
      :hidden="settings.dropdown.hidden"
    >
      <v-tag-option
        title
        v-if="settings.option.title == true"
        :disabled="settings.option.disabled"
        :divided="settings.option.divided"
        :displayValue="settings.option.displayValue"
      >
        <i class="fa fa-flag"></i> {{ $t("ui.general.Country") }}
      </v-tag-option>
      <v-tag-option value="Māre" :selected="settings.option.selected">
        {{ $t("ui.data.country.Māre") }}
      </v-tag-option>
      <v-tag-option value="Eldia">
        {{ $t("ui.data.country.Eldia") }}
      </v-tag-option>
    </v-tag-dropdown>

    <v-tag-dropdown value="name" v-if="settings.dropdown.hiddenName == false">
      <v-tag-option title>
        <i class="fa fa-user"></i>{{ $t("ui.general.Name") }}
      </v-tag-option>
      <v-tag-option value="Eren Yeager">
        {{ $t("ui.data.name.Eren Yeager") }}
      </v-tag-option>
    </v-tag-dropdown>
  </v-tags-multiselect>
</template>

<script>
import ReloadByI18n from "./mixins/reload-by-i18n.js";

export default {
  name: "focus-demo-app",
  mixins: [ReloadByI18n],
  props: {
    dropdown: {
      type: Object,
      default: () => {
        return {};
      },
    },
    option: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  model: {
    prop: "value",
    event: "update:modelValue",
  },
  data() {
    return {
      status: [],
      settings: {
        dropdown: {
          displayAll: false,
          disabled: false,
          divided: false,
          hidden: false,
          hiddenName: false,
        },
        option: {
          title: true,
          displayValue: false,
          disabled: false,
          divided: false,
          selected: false,
        },
      },
    };
  },
  watch: {
    status: {
      handler(value) {
        this.$emit("update:modelValue", value);
      },
      immediate: true,
    },
    dropdown: {
      handler(value) {
        this.updateDropdown(value);
      },
      immediate: true,
      deep: true,
    },
    option: {
      handler(value) {
        this.updateOption(value);
      },
      immediate: true,
      deep: true,
    },
    reloadByI18n: {
      handler(value) {
        if (value == true) {
          this.autoFocusinApp();
        }
      },
    },
  },
  mounted() {
    this.autoFocusinApp();
  },
  methods: {
    autoFocusinApp() {
      this.$nextTick(() => {
        let app = this.$refs.vueTagsMultiselect;
        app.isFocus = true;
        document.removeEventListener("focusin", app.focusChanged);
      });
    },
    updateDropdown(value) {
      this.$set(this.settings, "dropdown", {
        ...this.settings.dropdown,
        ...value,
      });
    },
    updateOption(value) {
      this.$set(this.settings, "option", {
        ...this.settings.option,
        ...value,
      });
    },
  },
};
</script>
