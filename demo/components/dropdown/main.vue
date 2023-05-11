<template>
  <div id="dropdown-slots" class="demo">
    <Value></Value>
    <Custom></Custom>
    <div class="flex-between">
      <div class="attributes">
        <div class="attribute">
          <h4>DisplayAll</h4>
          <div class="flex-between">
            <div class="depiction">
              {{ $t("attributes.description.dropdown.display-all") }}
            </div>
            <LabelAndSelect
              label=""
              v-model="displayAll"
              :disabled="hidden == 'true'"
            />
          </div>
        </div>
        <div class="attribute">
          <h4>Disabled</h4>
          <div class="flex-between">
            <div class="depiction">
              {{ $t("attributes.description.dropdown.disabled") }}
            </div>
            <LabelAndSelect
              label=""
              :disabled="hidden == 'true'"
              v-model="disabled"
            />
          </div>
        </div>
        <div class="attribute">
          <h4>Divided</h4>
          <div class="flex-between">
            <div class="depiction">
              {{ $t("attributes.description.dropdown.divided") }}
            </div>
            <LabelAndSelect
              label=""
              :disabled="hidden == 'true'"
              v-model="divided"
            />
          </div>
        </div>
        <div class="attribute">
          <h4>Hidden</h4>
          <div class="flex-between">
            <div class="depiction">
              {{ $t("attributes.description.dropdown.hidden") }}
            </div>
            <LabelAndSelect label="" v-model="hidden" />
          </div>
        </div>
      </div>

      <div class="demo-app" :class="[appStatus, { hidden: toBoolean(hidden) }]">
        <h6>
          *{{ $t("ui.page.sentence.attribute_only_change_first_dropdown") }}
        </h6>
        <FocusDemoApp
          v-model="appStatus"
          :dropdown="{
            displayAll: toBoolean(displayAll),
            disabled: toBoolean(disabled),
            divided: toBoolean(divided),
            hidden: toBoolean(hidden),
          }"
        >
        </FocusDemoApp>
      </div>
    </div>
  </div>
</template>

<script>
import Value from "./value.vue";
import Custom from "./custom.vue";
import LabelAndSelect from "../tools/label-and-select.vue";
import FocusDemoApp from "../tools/focus-demo-app.vue";

export default {
  name: "dropdown-slots-main",
  components: {
    Value,
    Custom,
    LabelAndSelect,
    FocusDemoApp,
  },
  data() {
    return {
      displayAll: "false",
      disabled: "false",
      divided: "false",
      hidden: "false",
      appStatus: [],
    };
  },
  methods: {
    toBoolean(value) {
      return value == "false" ? false : true;
    },
  },
};
</script>
<style scoped lang="scss">
.flex-between {
  .attributes {
    width: 52%;
  }
  .demo-app {
    width: 40%;
  }
  @media all and (max-width: 1200px) {
    .demo-app {
      width: 30%;
    }
  }
  @media all and (max-width: 992px) {
    .demo-app {
      width: 40%;
    }
    .demo-app {
      margin-top: 24px;
    }
  }
  @media all and (max-width: 576px) {
    & {
      flex-direction: column;
    }
    .attributes,
    .demo-app {
      width: 100%;
    }
    .demo-app {
      margin-top: 24px;

      &.selecting.hidden {
        margin-bottom: 30px;
      }
      &.selecting {
        margin-bottom: 150px;
      }
    }
  }
}
</style>
