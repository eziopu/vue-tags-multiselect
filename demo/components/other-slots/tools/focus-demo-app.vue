<template>
  <v-tags-multiselect
    v-if="reloadByI18n"
    class="focus-demo-app"
    ref="vueTagsMultiselect"
    @status="(e) => (status = e)"
  >
    <template v-slot:option-undo v-if="verifyText(slots.optionUndo)">
      <span v-html="slots.optionUndo"></span>
    </template>
    <template
      v-slot:option-OR-conjunction
      v-if="verifyText(slots.optionORConjunction)"
    >
      <span v-html="slots.optionORConjunction"></span>
    </template>
    <v-tag-dropdown value="country">
      <v-tag-option title ref="option1Title">
        <i class="fa fa-flag"></i> {{ $t("ui.general.Country") }}
      </v-tag-option>
      <v-tag-option
        value="Māre"
        :selected="verifyText(slots.optionORConjunction)"
      >
        {{ $t("ui.data.country.Māre") }}
      </v-tag-option>
      <v-tag-option value="Eldia">
        {{ $t("ui.data.country.Eldia") }}
      </v-tag-option>
    </v-tag-dropdown>

    <v-tag-dropdown value="name">
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
import ReloadByI18n from "../../tools/mixins/reload-by-i18n.js";

export default {
  name: "focus-demo-app",
  mixins: [ReloadByI18n],
  props: {
    slots: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  model: {
    prop: "value",
    event: "update",
  },
  data() {
    return {
      status: [],
    };
  },
  watch: {
    status: {
      handler(value) {
        this.$emit("update", value);
      },
      immediate: true,
    },
    reloadByI18n: {
      handler(value) {
        if (value == true) {
          this.init();
        }
      },
    },
  },
  mounted() {
    let { slots } = this;
    let isUndo =
      this.verifyText(slots.optionUndo) ||
      (slots.optionORConjunction == undefined && slots.optionUndo == "");
    this.init(isUndo);
  },
  methods: {
    verifyText(value) {
      return value != undefined && value != "";
    },
    init(isUndo = false) {
      if (isUndo == true) {
        this.initByUndo();
        this.autoFocusinApp();
      } else {
        this.autoFocusinApp();
      }
    },
    autoFocusinApp() {
      this.$nextTick(() => {
        let app = this.$refs.vueTagsMultiselect;
        app.isFocus = true;
        document.removeEventListener("focusin", app.focusChanged);
      });
    },
    initByUndo() {
      this.$nextTick(() => {
        let app = this.$refs.vueTagsMultiselect;
        app.current.tag = {
          key: "country",
          elm: {
            title: this.$t("ui.general.Country"),
          },
        };
      });
    },
  },
};
</script>
