<template>
  <div id="disabled" class="demo">
    <ToolTitle>Disabled</ToolTitle>

    <div class="depiction">
      {{ $t("attributes.description.app.disabled") }}
    </div>

    <div class="attributes flex-between">
      <LabelAndSelect label="disabled" v-model="attributes.disabled" />
    </div>

    <GeneralDemo
      :app="attributes"
    ></GeneralDemo>
  </div>
</template>

<script>
export default {
  name: "app-disabled",
  data() {
    return {
      attributes: {
        disabled: true,
      }
    };
  },
};
</script>