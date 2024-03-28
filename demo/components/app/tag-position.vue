<template>
  <div id="tag-position" class="demo">
    <h3>Tag position</h3>
    <div class="depiction">
      {{ $t("attributes.description.app.tagPosition") }}
      <br>
      *<span v-html="$t('attributes.description.app.tagPosition__notice')"></span>
    </div>

    <hr />
    <div class="attributes flex-between">
      <LabelAndSelect
        label="tagPosition"
        v-model="tagPosition"
        :values="['null', 'top', 'bottom']"
      />
    </div>

    <GeneralDemo
      :displayRefreshBtn="true"
      :option="{
        country: [{}, {selected: true}],
      }"
      :app="{
        tagPosition: tagPosition,
      }"
    >
    </GeneralDemo>
  </div>
</template>

<script>
export default {
  name: "app-tag-position",
  data() {
    return {
      tagPosition: "null",
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
