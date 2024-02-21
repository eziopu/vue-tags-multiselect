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
      :selecteds="{
        country: [true, true],
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
      countryValuesSelected: true,
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
@media all and (max-width: 768px) {
  .flex-between.text {
    display: block !important;
  }
}
@media all and (max-width: 992px) {
  .attributes {
    flex-wrap: wrap;
  }
  .attribute {
    &:nth-child(1) {
      width: 50%;
    }
    &:nth-child(2) {
      width: 50%;
    }
  }
}
@media all and (max-width: 470px) {
  .attribute {
    &:nth-child(1) {
      width: 100%;
    }
    &:nth-child(2) {
      width: 100%;
    }
  }
}
</style>
