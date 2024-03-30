<template>
  <div id="create" class="demo">
    <ToolTitle>Create</ToolTitle>

    <div class="depiction">
      {{ $t("attributes.description.app.create") }} <br />
      {{ $t("attributes.description.app.create__notice") }}
    </div>

    <div class="attributes flex-between to4-6 with-demo-control">
      <LabelAndControls label="create" v-model="attributes.create" />
      <LabelAndControls label="search" v-model="attributes.search" />
    </div>

    <GeneralDemo
      :app="attributes"
    ></GeneralDemo>
  </div>
</template>

<script>

export default {
  name: "app-create",
  data() {
    return {
      attributes: {
        create: true,
        search: false,
      }
    };
  },
};
</script>