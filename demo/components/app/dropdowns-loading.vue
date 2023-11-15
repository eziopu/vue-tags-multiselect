<template>
  <div id="dropdowns-loading" class="demo">
    <h4>Dropdown loading</h4>
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
        v-model="app.dropdownLoading"
        :disabled="app.loading == 'true'"
      />

      <div class="attribute">
        <span> dropdown loading icon slot: </span>
        <div class="ui input">
          <input
            type="text"
            class="form-control"
            v-model="app.dropdownLoadingContent"
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
  props: {
    app: {
      type: Object,
      default: () => {
        return {};
      },
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
