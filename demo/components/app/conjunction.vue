<template>
  <div id="conjunction" class="demo">
    <h3>Conjunction</h3>
    <div class="depiction">
      {{ $t("attributes.description.app.conjunction") }},
      {{ $t("ui.general.defaultIs__key", { key: "null" }) }}
      <div class="sub-depiction">
        <p>
          {{ $t("attributes.description.app.conjunction__detail.1") }}
        </p>
        <p>
          {{ $t("attributes.description.app.conjunction__detail.2") }}
        </p>
        <p>
          {{ $t("attributes.description.app.conjunction__detail.3") }}
        </p>
      </div>
    </div>

    <hr />
    <div class="attributes flex-between">
      <LabelAndSelect
        label="conjunction"
        :values="['AND', 'OR', 'null']"
        v-model="attributes.conjunction"
      />
    </div>

    <GeneralDemo
      :app="attributes"
    ></GeneralDemo>
  </div>
</template>

<script>
export default {
  name: "app-conjunction",
  data() {
    return {
      attributes: {
        conjunction: "null",
      }
    };
  },
};
</script>

<style scoped lang="scss">
.attributes {
  padding-right: 80px;
}
.attribute {
  margin-right: 12px;
  margin-bottom: 6px;
}
.attributes.flex-between {
  align-items: flex-start;
  justify-content: flex-start;
}
@media all and (max-width: 376px) {
  .attributes.flex-between {
    display: block;
  }
}
</style>
