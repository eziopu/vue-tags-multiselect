<template>
  <div class="general-demo-template">
    <div class="output" v-if="displayOutput == true">
      v-model output value: {{ appEvent.result }}
    </div>
    <div class="demo-component relative">
      <v-tags-multiselect
        v-if="reloadByI18n && reloadByBtn"
        v-model="appEvent.result"
        ref="vueTagsMultiselect"
        @status="(e) => (appEvent.status = e)"
        @selectingTag="(e) => (appEvent.selectingTag = e)"
        @inputValue="(e) => (appEvent.inputValue = e)"
        @editing="(e) => (appEvent.editing = e)"
        :disabled="appProps.disabled"
        :loading="appProps.loading"
        :dropdownLoading="appProps.dropdownLoading"
        :search="appProps.search"
        :transition="appProps.transition"
        :create="appProps.create"
        :merge="appProps.merge"
        :deleteIcon="appProps.deleteIcon"
        :conjunction="appProps.conjunction"
        :placeholder="appProps.placeholder"
        :loadingPlaceholder="appProps.loadingPlaceholder"
        :selectDownPlaceholder="appProps.selectDownPlaceholder"
        :finishPlaceholder="appProps.finishPlaceholder"
      >
        <template v-slot:tag-conjunction v-if="appProps.tagConjunction != ''">
          <span v-html="appProps.tagConjunction"></span>
        </template>
        <template v-slot:loading v-if="appProps.loadingContent != ''">
          <span v-html="appProps.loadingContent"></span>
        </template>
        <template v-slot:option-undo v-if="appProps.optionUndoContent != ''">
          <span v-html="appProps.optionUndoContent"></span>
        </template>
        <template
          v-slot:optionU-OR-conjunction
          v-if="appProps.optionORConjunctionContent != ''"
        >
          <span v-html="appProps.optionORConjunctionContent"></span>
        </template>
        <template
          v-slot:dropdowns-loading
          v-if="appProps.dropdownLoadingContent != ''"
        >
          <span v-html="appProps.dropdownLoadingContent"></span>
        </template>

        <v-tag-dropdown value="country">
          <v-tag-option title>
            <i class="fa fa-flag"></i> {{ $t("ui.general.Country") }}
          </v-tag-option>
          <v-tag-option value="Māre" :selected="appSelecteds.country[0]">
            {{ $t("ui.data.country.Māre") }}
          </v-tag-option>
          <v-tag-option value="Eldia" :selected="appSelecteds.country[1]">
            {{ $t("ui.data.country.Eldia") }}
          </v-tag-option>
        </v-tag-dropdown>
        <v-tag-dropdown value="name">
          <v-tag-option title>
            <i class="fa fa-user"></i> {{ $t("ui.general.Name") }}
          </v-tag-option>
          <v-tag-option value="Grisha Yeager" :selected="appSelecteds.name[0]">
            {{ $t("ui.data.name.Grisha Yeager") }}
          </v-tag-option>
          <v-tag-option value="Eren Yeager" :selected="appSelecteds.name[1]">
            {{ $t("ui.data.name.Eren Yeager") }}
          </v-tag-option>
          <v-tag-option value="Armin Arlert" :selected="appSelecteds.name[2]">
            {{ $t("ui.data.name.Armin Arlert") }}
          </v-tag-option>
        </v-tag-dropdown>
        <v-tag-dropdown value="remark" display-all>
          <v-tag-option title>
            <i class="fa fa-sticky-note"></i> {{ $t("ui.general.Remark") }}
          </v-tag-option>
          <v-tag-option value="yes" :selected="appSelecteds.remark[0]">
            <i class="fa fa-check"></i>
          </v-tag-option>
          <v-tag-option value="no" :selected="appSelecteds.remark[1]">
            <i class="fa fa-close"></i>
          </v-tag-option>
        </v-tag-dropdown>
      </v-tags-multiselect>

      <div class="demo-control">
        <span
          v-if="displayRefreshBtn"
          class="show-code-btn pointer"
          :class="{ active: !reloadByBtn }"
          @click="reloadByBtnFun()"
        >
          <i class="fa fa-refresh"></i>
        </span>
        <span
          class="show-code-btn pointer"
          :class="{ active: showCode }"
          @click="showCode = !showCode"
        >
          &lt; / &gt;
          <!-- < / > -->
        </span>
      </div>

      <transition name="slide">
        <ShowHtmlCode
          v-show="showCode"
          class="prettyprint lang-html customize"
          :app="app"
          :selecteds="appSelecteds"
        ></ShowHtmlCode>
      </transition>
    </div>
  </div>
</template>

<script>
import ShowHtmlCode from "./show-html-code.vue";
import ReloadByI18n from "./mixins/reload-by-i18n.js";
import ReloadByBtn from "./mixins/reload-by-btn.js";

export default {
  mixins: [ReloadByI18n, ReloadByBtn],
  props: {
    autoFocus: {
      type: Boolean,
      default: () => {
        return false;
      },
    },
    app: {
      type: Object,
      default: () => {
        return {};
      },
    },
    displayOutput: {
      type: Boolean,
      default: () => {
        return false;
      },
    },
    displayRefreshBtn: {
      type: Boolean,
      default: () => {
        return false;
      },
    },
    countryValuesSelected: {
      type: Boolean,
      default: () => {
        return false;
      },
    },
    selecteds: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  components: {
    ShowHtmlCode,
  },
  data() {
    return {
      search: "true",
      showCode: false,
      // default values
      appProps: {
        disabled: false,
        loading: false,
        search: true,
        transition: true,
        create: true,
        merge: true,
        conjunction: "",
        deleteIcon: "always",
        placeholder: "",
        dropdownLoading: false,
        loadingPlaceholder: "Wait a moment, please.",
        selectDownPlaceholder: "Selected End.",
        finishPlaceholder: "Finish.",
        tagConjunction: "",
        loadingContent: "",
        dropdownLoadingContent: "",
        optionUndoContent: "",
        optionORConjunctionContent: "",
      },
      appEvent: {
        result: [],
        status: [],
        selectingTag: {},
        inputValue: "",
        editing: {},
      },
      appSelecteds: {
        country: [false, false],
        name: [false, false, false],
        remark: [false, false],
      },
    };
  },
  model: {
    prop: "value",
    event: "update:modelValue",
  },
  watch: {
    "appEvent.status": {
      handler(value) {
        this.$emit("update:modelValue", value);
      },
      immediate: true,
    },
    app: {
      handler(value) {
        this.appProps = { ...this.appProps, ...value };
      },
      immediate: true,
    },
    autoFocus: {
      handler(value) {
        if (value == true) {
          this.autoFocusinApp();
        }
      },
      immediate: true,
    },
  },
  created() {
    this.appSelecteds = { ...this.appSelecteds, ...this.selecteds };
  },
  methods: {
    autoFocusinApp() {
      this.$nextTick(() => {
        let app = this.$refs.vueTagsMultiselect;
        app.isFocus = true;
        document.removeEventListener("focusin", app.focusChanged);
      });
    },
  },
};
</script>
