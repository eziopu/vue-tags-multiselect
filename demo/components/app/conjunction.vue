<template>
  <div id="conjunction" class="demo">
    <ToolTitle>Conjunction</ToolTitle>

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

    <div class="attributes with-demo-control">
      <LabelAndControls
        label="conjunction"
        :values="['AND', 'OR', 'null']"
        v-model="attributes.conjunction"
      />
    </div>

    <GeneralDemo
      :displayRefreshBtn="true"
      :app="attributes"
      :option="{
        country: [{}, {selected: true}],
      }"
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