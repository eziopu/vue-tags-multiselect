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
        :tagPosition="appProps.tagPosition"
        :create="appProps.create"
        :merge="appProps.merge"
        :deleteIcon="appProps.deleteIcon"
        :conjunction="appProps.conjunction"
        :debugLog="appProps.debugLog"
        :placeholder="appProps.placeholder"
        :placeholders="appProps.placeholders"
      >
        <template v-slot:tag-conjunction v-if="appSlots.tagConjunction != ''">
          <span v-html="appSlots.tagConjunction"></span>
        </template>
        <template v-slot:loading v-if="appSlots.loading != ''">
          <span v-html="appSlots.loading"></span>
        </template>
        <template v-slot:option-undo v-if="appSlots.optionUndo != ''">
          <span v-html="appSlots.optionUndo"></span>
        </template>
        <template
          v-slot:optionU-OR-conjunction
          v-if="appSlots.optionORConjunction != ''"
        >
          <span v-html="appSlots.optionORConjunction"></span>
        </template>
        <template
          v-slot:dropdowns-loading
          v-if="appSlots.dropdownLoading != ''"
        >
          <span v-html="appSlots.dropdownLoading"></span>
        </template>

        <v-tag-dropdown
          value="country"
          v-if="appDropdown.country.isDisplayForDemo"
          :disabled="appDropdown.country.disabled"
          :divided="appDropdown.country.divided"
          :displayAll="appDropdown.country.displayAll"
          :hidden="appDropdown.country.hidden"
          :custom="appDropdown.country.custom"
        >
          <v-tag-option title
            v-if="appOption.country[0].isDisplayForDemo"
            :displayValue="appOption.country[0].displayValue"
            :disabled="appOption.country[0].disabled"
            :divided="appOption.country[0].divided"
            :selected="appOption.country[0].selected"
          >
            <i class="fa fa-flag"></i> {{ $t("ui.general.Country") }}
          </v-tag-option>
          <v-tag-option value="Māre"
            v-if="appOption.country[1].isDisplayForDemo"
            :displayValue="appOption.country[1].displayValue"
            :disabled="appOption.country[1].disabled"
            :divided="appOption.country[1].divided"
            :selected="appOption.country[1].selected"
          >
            {{ $t("ui.data.country.Māre") }}
          </v-tag-option>
          <v-tag-option value="Eldia"
            v-if="appOption.country[2].isDisplayForDemo"
            :displayValue="appOption.country[2].displayValue"
            :disabled="appOption.country[2].disabled"
            :divided="appOption.country[2].divided"
            :selected="appOption.country[2].selected"
          >
            {{ $t("ui.data.country.Eldia") }}
          </v-tag-option>
        </v-tag-dropdown>

        <v-tag-dropdown
          value="name"
          v-if="appDropdown.name.isDisplayForDemo"
          :disabled="appDropdown.name.disabled"
          :divided="appDropdown.name.divided"
          :displayAll="appDropdown.name.displayAll"
          :hidden="appDropdown.name.hidden"
          :custom="appDropdown.name.custom"
        >
          <v-tag-option title 
            v-if="appOption.name[0].isDisplayForDemo"
            :displayValue="appOption.name[0].displayValue"
            :disabled="appOption.name[0].disabled"
            :divided="appOption.name[0].divided"
            :selected="appOption.name[0].selected"
          >
            <i class="fa fa-user"></i> {{ $t("ui.general.Name") }}
          </v-tag-option>
          <v-tag-option value="Grisha Yeager"
            v-if="appOption.name[1].isDisplayForDemo"
            :displayValue="appOption.name[1].displayValue"
            :disabled="appOption.name[1].disabled"
            :divided="appOption.name[1].divided"
            :selected="appOption.name[1].selected"
          >
            {{ $t("ui.data.name.Grisha Yeager") }}
          </v-tag-option>
          <v-tag-option value="Eren Yeager"
            v-if="appOption.name[2].isDisplayForDemo"
            :displayValue="appOption.name[2].displayValue"
            :disabled="appOption.name[2].disabled"
            :divided="appOption.name[2].divided"
            :selected="appOption.name[2].selected"
          >
            {{ $t("ui.data.name.Eren Yeager") }}
          </v-tag-option>
          <v-tag-option value="Armin Arlert"
            v-if="appOption.name[3].isDisplayForDemo"
            :displayValue="appOption.name[3].displayValue"
            :disabled="appOption.name[3].disabled"
            :divided="appOption.name[3].divided"
            :selected="appOption.name[3].selected"
          >
            {{ $t("ui.data.name.Armin Arlert") }}
          </v-tag-option>
        </v-tag-dropdown>

        <v-tag-dropdown
          value="remark"
          v-if="appDropdown.remark.isDisplayForDemo"
          :disabled="appDropdown.remark.disabled"
          :divided="appDropdown.remark.divided"
          :displayAll="appDropdown.remark.displayAll"
          :hidden="appDropdown.remark.hidden"
          :custom="appDropdown.remark.custom"
        >
          <v-tag-option title
            v-if="appOption.remark[0].isDisplayForDemo"
            :displayValue="appOption.remark[0].displayValue"
            :disabled="appOption.remark[0].disabled"
            :divided="appOption.remark[0].divided"
            :selected="appOption.remark[0].selected"
          >
            <i class="fa fa-sticky-note"></i> {{ $t("ui.general.Remark") }}
          </v-tag-option>
          <v-tag-option value="yes"
            v-if="appOption.remark[1].isDisplayForDemo"
            :displayValue="appOption.remark[1].displayValue"
            :disabled="appOption.remark[1].disabled"
            :divided="appOption.remark[1].divided"
            :selected="appOption.remark[1].selected"
          >
            <i class="fa fa-check"></i>
          </v-tag-option>
          <v-tag-option value="no"
            v-if="appOption.remark[2].isDisplayForDemo"
            :displayValue="appOption.remark[2].displayValue"
            :disabled="appOption.remark[2].disabled"
            :divided="appOption.remark[2].divided"
            :selected="appOption.remark[2].selected"
          >
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
          v-if="displayShowCodeBtn"
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
          :app="appProps"
          :slots="appSlots"
          :dropdown="appDropdown"
          :option="appOption"
        ></ShowHtmlCode>
      </transition>
    </div>
  </div>
</template>

<script>
import ShowHtmlCode from "./show-html-code/main.vue";
import ReloadByI18n from "./mixins/reload-by-i18n.js";
import ReloadByBtn from "./mixins/reload-by-btn.js";
import PackageAttributes from "./mixins/package-attributes.js";

export default {
  mixins: [ReloadByI18n, ReloadByBtn, PackageAttributes],
  props: {
    autoFocus: {
      type: Boolean,
      default: () => {
        return false;
      },
    },
    displayOutput: {
      type: Boolean,
      default: () => {
        return false;
      },
    },
    displayShowCodeBtn: {
      type: Boolean,
      default: () => {
        return true;
      },
    },
    displayRefreshBtn: {
      type: Boolean,
      default: () => {
        return false;
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
    autoFocus: {
      handler(value) {
        if (value == true) {
          this.focusinApp();
        }
      },
      immediate: true,
    },
  },
  methods: {
    focusinApp() {
      this.$nextTick(() => {
        let app = this.$refs.vueTagsMultiselect;
        app.isActive = true;
        // document.removeEventListener("focusin", app.focusChanged);
      });
    },
  },
};
</script>
