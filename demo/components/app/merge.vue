<template>
  <div id="merge" class="demo">
    <h3>Merge</h3>
    <div class="depiction">
      {{ $t("attributes.description.app.merge") }}
    </div>

    <hr />
    <div class="attributes flex-between">
      <LabelAndSelect label="merge" v-model="merge" />
    </div>

    <GeneralDemo
      :displayRefreshBtn="true"
      :option="{
        country: [{}, {selected: true}, {selected: true}],
      }"
      :app="{
        merge: merge == 'true' ? true : false,
      }"
    >
    </GeneralDemo>
  </div>
</template>

<script>
import GeneralDemo from "../tools/general-demo.vue";
import LabelAndSelect from "../tools/label-and-select.vue";

export default {
  name: "app-merge",
  components: {
    LabelAndSelect,
    GeneralDemo,
  },
  data() {
    return {
      merge: "true",
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
