<template>
  <div class="general-demo-template">
    <div class="output" v-if="displayOutput == true">
      v-model output value: {{ appEvent.result }}
    </div>
    <div class="demo-component relative">
      <v-tags-multiselect
        v-model="appEvent.result"
        ref="VTagsMultiselect"
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
        :keyboard="appProps.keyboard"
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

        <slot name="country">
          <v-tag-dropdown
            value="country"
            v-if="appDropdown.country.isDisplayForDemo"
            :disabled="appDropdown.country.disabled"
            :divided="appDropdown.country.divided"
            :displayAll="appDropdown.country.displayAll"
            :hidden="appDropdown.country.hidden"
            :custom="appDropdown.country.custom"
          >
            <v-tag-option
              v-for="(item, index) in appOption.country"
              v-show="item.isDisplayForDemo"
              :key="`option_country_${index}`"
              :value="item.value"
              :title="item.title"
              :displayValue="item.displayValue"
              :disabled="item.disabled"
              :divided="item.divided"
              :selected="item.selected"
            >
              <template v-if="index == 0">
                <i class="fa fa-flag"></i> {{ $t("ui.general.Country") }}
              </template>
              <template v-else>
                {{ $t(`ui.data.country.${item.valueForDemo}`) }}
              </template>
            </v-tag-option>
          </v-tag-dropdown>
        </slot>

        <slot name="name">
          <v-tag-dropdown
            value="name"
            v-if="appDropdown.name.isDisplayForDemo"
            :disabled="appDropdown.name.disabled"
            :divided="appDropdown.name.divided"
            :displayAll="appDropdown.name.displayAll"
            :hidden="appDropdown.name.hidden"
            :custom="appDropdown.name.custom"
          >
            <v-tag-option 
              v-for="(item, index) in appOption.name"
              v-show="item.isDisplayForDemo"
              :key="`option_name_${index}`"
              :value="item.value"
              :title="item.title"
              :displayValue="item.displayValue"
              :disabled="item.disabled"
              :divided="item.divided"
              :selected="item.selected"
            >
              <template v-if="index == 0">
                <i class="fa fa-user"></i> {{ $t("ui.general.Name") }}
              </template>
              <template v-else>
                {{ $t(`ui.data.name.${item.valueForDemo}`) }}
              </template>
            </v-tag-option>
          </v-tag-dropdown>
        </slot>
        
        <slot name="remark">
          <v-tag-dropdown
            value="remark"
            v-if="appDropdown.remark.isDisplayForDemo"
            :disabled="appDropdown.remark.disabled"
            :divided="appDropdown.remark.divided"
            :displayAll="appDropdown.remark.displayAll"
            :hidden="appDropdown.remark.hidden"
            :custom="appDropdown.remark.custom"
          >
            <v-tag-option
              v-for="(item, index) in appOption.remark"
              v-show="item.isDisplayForDemo"
              :key="`option_remark_${index}`"
              :value="item.value"
              :title="item.title"
              :displayValue="item.displayValue"
              :disabled="item.disabled"
              :divided="item.divided"
              :selected="item.selected"
            >
              <template v-if="index == 0">
                <i class="fa fa-sticky-note"></i> {{ $t("ui.general.Remark") }}
              </template>
              <template v-if="item.value == 'yes'">
                <i class="fa fa-check"></i>
              </template>
              <template v-if="item.value == 'no'">
                <i class="fa fa-close"></i>
              </template>
            </v-tag-option>
          </v-tag-dropdown>
        </slot>
      </v-tags-multiselect>

      <div class="demo-control">
        <span
          v-if="displayRefreshBtn"
          class="show-code-btn pointer"
          @click="reload()"
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
import PackageAttributes from "./mixins/package-attributes.js";

export default {
  mixins: [PackageAttributes],
  props: {
    modelValue: {
      type: Array,
    },
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
  emits: ["update:modelValue"],
  watch: {
    "$i18n.locale": {
      handler() {
        this.$nextTick(() => {
          setTimeout(() => {
            if (this.autoFocus == true) {
              this.focusinApp();
            }
          }, 10);
        });
      },
      deep: true,
    },
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
        let app = this.$refs.VTagsMultiselect;
        app.focus();
        // document.removeEventListener("focusin", app.focusChanged);
      });
    },
    reload() {
      this.$nextTick(() => {
        let app = this.$refs.VTagsMultiselect;
        app.initialize();

        if (this.autoFocus == true) {
          this.focusinApp();
        }
      });
    },
  },
};
</script>
