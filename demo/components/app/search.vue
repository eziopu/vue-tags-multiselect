<template>
  <div id="search" class="demo">
    <ToolTitle>Search</ToolTitle>

    <div class="depiction">
      {{ $t("attributes.description.app.search") }}
    </div>

    <div class="attributes with-demo-control">
      <LabelAndControls label="search" v-model="search" />
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