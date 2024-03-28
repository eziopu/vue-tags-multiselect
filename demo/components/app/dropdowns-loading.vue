<template>
  <div id="dropdowns-loading" class="demo">
    <ToolTitle>Dropdown loading</ToolTitle>

    <div class="depiction">
      {{ $t("attributes.description.app.dropdownLoading") }}
      <div class="sub-depiction">
        <p
          v-html="$t('attributes.description.slots.dropdowns-loading__notice')"
        ></p>
      </div>
    </div>

    <div class="attributes">
      <LabelAndSelect
        label="dropdownLoading"
        v-model="attributes.dropdownLoading"
        :disabled="attributes.loading == 'true'"
      />

      <div class="attribute">
        <span> dropdown loading icon slot: </span>
        <div class="ui input">
          <input
            type="text"
            class="form-control"
            v-model="attributes.dropdownLoadingContent"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "app-dropdowns-loading",
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
