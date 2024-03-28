<template>
  <div id="search" class="demo">
    <ToolTitle>Search</ToolTitle>

    <div class="depiction">
      {{ $t("attributes.description.app.search") }}
    </div>

    <div class="attributes flex-between">
      <LabelAndSelect label="search" v-model="search" />
    </div>

    <GeneralDemo
      :app="{
        search: search,
      }"
    ></GeneralDemo>
  </div>
</template>

<script>
export default {
  name: "app-search",
  data() {
    return {
      search: true,
    };
  },
};
</script>

<style scoped lang="scss">
.attributes {
  padding-right: 80px;
}
.attribute {
  margin-bottom: 6px;
}
</style>
