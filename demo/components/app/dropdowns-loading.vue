<template>
  <div id="dropdowns-loading" class="demo">
    <h3>Dropdown loading</h3>
    <div class="depiction">
      {{ $t("attributes.description.app.dropdownLoading") }}
      <div class="sub-depiction">
        <p
          v-html="$t('attributes.description.slots.dropdowns-loading__notice')"
        ></p>
      </div>
    </div>

    <hr />
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
import LabelAndSelect from "../tools/label-and-select.vue";

export default {
  name: "app-dropdowns-loading",
  inject: ["getLoadingAttributes"],
  computed: {
    attributes() {
      return this.getLoadingAttributes();
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
