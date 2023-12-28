<template>
  <div id="tag-position" class="demo">
    <h4>Tag position</h4>
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
      :selecteds="{
        country: [true],
      }"
      :app="{
        tagPosition: tagPosition,
      }"
    >
    </GeneralDemo>
  </div>
</template>

<script>
import GeneralDemo from "../tools/general-demo.vue";
import LabelAndSelect from "../tools/label-and-select.vue";

export default {
  name: "app-tag-position",
  components: {
    LabelAndSelect,
    GeneralDemo,
  },
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
