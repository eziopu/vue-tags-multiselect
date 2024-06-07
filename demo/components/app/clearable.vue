<template>
  <div id="clearable" class="demo">
    <ToolTitle>Clearable</ToolTitle>

    <div class="depiction">
      {{ $t(`attributes.app.clearable`) }}
    </div>

    <div class="attributes with-demo-control">
      <LabelAndControls label="clearable" v-model="clearable" />
    </div>

    <GeneralDemo
      :app="{
        clearable: clearable,
      }"
    ></GeneralDemo>
  </div>
</template>

<script>
export default {
  name: "app-clearable",
  data() {
    return {
      clearable: false,
    };
  },
};
</script>