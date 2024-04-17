<template>
  <div id="loading" class="demo">
    <ToolTitle>Loading</ToolTitle>

    <div class="depiction">
      {{ $t("attributes.app.loading") }}
    </div>

    <div class="attributes">
      <LabelAndControls label="loading" v-model="attributes.loading" />
      <LabelAndControls
        model="input"
        class="flex-column"
        label="loading placeholder"
        v-model="attributes.loadingPlaceholder"
        placeholder="default: Wait a moment, please."
      />
      <LabelAndControls
        model="input"
        class="flex-column"
        label="loading icon slot"
        v-model="attributes.loadingContent"
      />
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