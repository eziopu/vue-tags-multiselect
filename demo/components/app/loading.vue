<template>
  <div id="loading" class="demo">
    <h4>Loading</h4>
    <div class="depiction">
      {{ $t("attributes.description.app.loading") }}
    </div>

    <hr />
    <div class="attributes">
      <LabelAndSelect label="loading" v-model="app.loading" />

      <div class="attribute">
        <span> loading placeholder: </span>
        <div class="ui input">
          <input
            type="text"
            class="form-control"
            v-model="app.loadingPlaceholder"
            placeholder="default: Wait a moment, please."
          />
        </div>
      </div>

      <div class="attribute">
        <span> loading icon slot: </span>
        <div class="ui input">
          <input
            type="text"
            class="form-control"
            v-model="app.loadingContent"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LabelAndSelect from "../tools/label-and-select.vue";

export default {
  name: "app-loading",
  inject: ["getApp"],
  computed: {
    app() {
      return this.getApp();
    },
  },
  components: {
    LabelAndSelect,
  },
};
</script>

<style scoped lang="scss">
.attribute {
  margin-bottom: 6px;
}
</style>
