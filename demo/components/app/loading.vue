<template>
  <div id="loading" class="demo">
    <ToolTitle>Loading</ToolTitle>

    <div class="depiction">
      {{ $t("attributes.description.app.loading") }}
    </div>

    <div class="attributes">
      <LabelAndSelect label="loading" v-model="attributes.loading" />

      <div class="attribute">
        <span> loading placeholder: </span>
        <div class="ui input">
          <input
            type="text"
            class="form-control"
            v-model="attributes.loadingPlaceholder"
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
            v-model="attributes.loadingContent"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "app-loading",
  inject: ["getLoadingAttributes"],
  computed: {
    attributes() {
      return this.getLoadingAttributes();
    },
  },
};
</script>

<style scoped lang="scss">
.attribute {
  margin-bottom: 6px;
}
</style>
