<template>
  <div class="custom-diff-demo">
    <div class="depiction">
      <h6>{{ appCustomer }}</h6>
      <span v-if="appCustomer == false"> *{{ $t("ui.general.Default", 0) }} </span>
    </div>

    <div class="demo-component relative">
      <v-tags-multiselect
        v-if="reloadByI18n"
        deleteIcon="none"
      >
        <v-tag-dropdown value="country" :custom="appCustomer">
          <v-tag-option title>
            <i class="fa fa-flag"></i> {{ $t(`ui.general.Country`) }}
          </v-tag-option>
          <v-tag-option value="Māre" selected>
            {{ $t(`ui.data.country.Māre`) }}
          </v-tag-option>
          <v-tag-option value="Eldia">
            {{ $t(`ui.data.country.Eldia`) }}
          </v-tag-option>
        </v-tag-dropdown>
        <v-tag-dropdown value="name">
          <v-tag-option title>
            <i class="fa fa-user"></i> {{ $t(`ui.general.Name`) }}
          </v-tag-option>
          <v-tag-option value="Grisha Yeager">
            {{ $t(`ui.data.name.Grisha Yeager`) }}
          </v-tag-option>
          <v-tag-option value="Eren Yeager">
            {{ $t(`ui.data.name.Eren Yeager`) }}
          </v-tag-option>
          <v-tag-option value="Armin Arlert">
            {{ $t(`ui.data.name.Armin Arlert`) }}
          </v-tag-option>
        </v-tag-dropdown>
      </v-tags-multiselect>
    </div>

    <ALineCode :bolders="['custom']" v-if="appCustomer == true" />
  </div>
</template>

<script>
import ALineCode from "./a-line-code.vue";
import ReloadByI18n from "@tools/mixins/reload-by-i18n.js";

export default {
  name: "dropdown-custom-diff-demo",
  mixins: [ReloadByI18n],
  props: {
    appCustomer: {
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

  span {
    padding-left: 12px;
  }
}
</style>
