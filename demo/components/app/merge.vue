<template>
  <div id="merge" class="demo">
    <h3>Merge</h3>
    <div class="depiction">
      {{ $t("attributes.description.app.merge") }}
    </div>

    <hr />
    <div class="attributes flex-between">
      <LabelAndSelect label="merge" v-model="attributes.merge" />
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

<style scoped lang="scss">
.attributes {
  padding-right: 80px;
}
.attribute {
  margin-bottom: 6px;
}
</style>
