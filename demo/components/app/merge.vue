<template>
  <div id="merge" class="demo">
    <ToolTitle>Merge</ToolTitle>

    <div class="depiction">
      {{ $t("attributes.description.app.merge") }}
    </div>

    <div class="attributes with-demo-control">
      <LabelAndControls label="merge" v-model="attributes.merge" />
    </div>

    <GeneralDemo
      :displayRefreshBtn="true"
      :option="{
        country: [{}, {selected: true}, {selected: true}],
      }"
      :app="attributes"
    >
    </GeneralDemo>
  </div>
</template>

<script>
export default {
  name: "app-merge",
  data() {
    return {
      attributes: {
        merge: true,
      }
    };
  },
};
</script>