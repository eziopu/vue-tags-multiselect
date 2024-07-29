<template>
  <div class="cyberpunk">
    <v-tags-multiselect
      v-if="reloadByI18n"
      class="focus-demo-app custom cybr-search-bar"
      ref="VTagsMultiselect"
    >
      <v-tag-dropdown class="blue" value="country" display-all custom>
        <v-tag-option title>
          <i class="fa fa-flag"></i> {{ $t(`ui.general.Country`) }}
        </v-tag-option>
        <v-tag-option value="Māre" selected>{{
          $t(`ui.data.country.Māre`)
        }}</v-tag-option>
        <v-tag-option value="Eldia">{{
          $t(`ui.data.country.Eldia`)
        }}</v-tag-option>
      </v-tag-dropdown>
      <v-tag-dropdown class="yellow" value="name">
        <v-tag-option title>
          <i class="fa fa-user"></i> {{ $t(`ui.general.Name`) }}
        </v-tag-option>
        <v-tag-option value="Grisha Yeager" selected>{{
          $t(`ui.data.name.Grisha Yeager`)
        }}</v-tag-option>
        <v-tag-option value="Eren Yeager">{{
          $t(`ui.data.name.Eren Yeager`)
        }}</v-tag-option>
        <v-tag-option value="Armin Arlert">{{
          $t(`ui.data.name.Armin Arlert`)
        }}</v-tag-option>
      </v-tag-dropdown>
      <v-tag-dropdown class="purple" value="remark" display-all>
        <v-tag-option title>
          <i class="fa fa-sticky-note"></i> {{ $t(`ui.general.Remark`) }}
        </v-tag-option>
        <v-tag-option value="yes">
          <i class="fa fa-check"></i>
        </v-tag-option>
        <v-tag-option value="no">
          <i class="fa fa-close"></i>
        </v-tag-option>
      </v-tag-dropdown>
    </v-tags-multiselect>
    <i class="cybr-search-bar-bottom-bevel"></i>
  </div>
</template>

<script>
import ReloadByI18n from "@toolstools/mixins/reload-by-i18n.js";

export default {
  name: "focus-demo-app",
  mixins: [ReloadByI18n],
  watch: {
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
      setTimeout(() => {
        this.$nextTick(() => {
          let app = this.$refs.VTagsMultiselect;
          app.isFocus = true;
          document.removeEventListener("focusin", app.focusChanged);
        });
      }, 300);
    },
  },
};
</script>
<style lang="scss">
@import "../assets/cyberpunk.scss";
</style>
