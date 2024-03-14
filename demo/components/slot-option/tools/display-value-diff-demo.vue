<template>
  <div class="display-value-demo">
    <div class="depiction">
      <h6>{{ appDisplayValue }}</h6>
      <span v-if="appDisplayValue == false">
        *{{ $t("ui.general.default") }}
      </span>
    </div>

    <div class="demo-component relative">
      <v-tags-multiselect
        v-if="reloadByI18n"
        deleteIcon="none"
        conjunction="OR"
      >
        <v-tag-dropdown value="country">
          <v-tag-option title>
            <i class="fa fa-flag"></i> {{ $t("ui.general.Country") }}
          </v-tag-option>
          <v-tag-option value="mare" selected :displayValue="appDisplayValue">
            {{ $t("ui.data.country.Māre") }}
          </v-tag-option>
          <v-tag-option value="eldia">
            {{ $t("ui.data.country.Eldia") }}
          </v-tag-option>
        </v-tag-dropdown>
      </v-tags-multiselect>
    </div>

    <div class="depiction" v-if="appDisplayValue == true">
      <ALineCode bolder="displayValue selected" class="a-line-code" />
    </div>
  </div>
</template>

<script>
import ALineCode from "./a-line-code.vue";
import ReloadByI18n from "../../tools/mixins/reload-by-i18n.js";

export default {
  name: "option-display-value-demo",
  mixins: [ReloadByI18n],
  props: {
    appDisplayValue: {
      type: Boolean,
      default: () => {
        return true;
      },
    },
  },
  components: {
    ALineCode,
  },
};
</script>

<style scoped lang="scss">
.demo-component {
  margin-bottom: 6px;
}

.depiction {
  display: flex;
  &:first-child {
    margin-bottom: 0px;
  }

  .a-line-code {
    width: 100%;
    padding-left: 12px;
  }
}
</style>
