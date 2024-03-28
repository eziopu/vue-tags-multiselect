<template>
  <div id="search" class="demo">
    <h3>Search</h3>
    <div class="depiction">
      {{ $t("attributes.description.app.search") }}
    </div>

    <hr />
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
