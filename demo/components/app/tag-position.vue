<template>
  <div id="tag-position" class="demo">
    <ToolTitle>Tag position</ToolTitle>

    <div class="depiction">
      {{ $t("attributes.description.app.tagPosition") }}
      <br>
      *<span v-html="$t('attributes.description.app.tagPosition__notice')"></span>
    </div>

    <div class="attributes with-demo-control">
      <LabelAndControls
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
