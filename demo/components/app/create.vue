<template>
  <div id="create" class="demo">
    <ToolTitle>Create</ToolTitle>

    <div class="depiction">
      {{ $t("attributes.description.app.create") }} <br />
      {{ $t("attributes.description.app.create__notice") }}
    </div>

    <div class="attributes flex-between">
      <LabelAndSelect label="create" v-model="attributes.create" />
      <LabelAndSelect label="search" v-model="attributes.search" />
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
