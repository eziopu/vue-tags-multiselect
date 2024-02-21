<template>
  <div id="tag-conjunction" class="demo">
    <h3>Tag conjunction</h3>
    <div class="depiction">
      {{ $t("attributes.description.slots.tag-conjunction") }}
      *<span
        v-html="$t('attributes.description.slots.tag-conjunction__notice')"
      ></span>
    </div>

    <hr />
    <div class="attributes flex-between">
      <LabelAndSelect label="merge" v-model="merge" />
      <div class="attribute flex-between text">
        <span> tag-conjunction: </span>
        <div class="ui input">
          <input
            type="text"
            class="form-control"
            v-model="tagConjunction"
            :disabled="merge == 'false'"
            :placeholder="`default: &`"
          />
        </div>
      </div>
    </div>

    <GeneralDemo
      :displayRefreshBtn="true"
      :selecteds="{
        country: [true, true],
      }"
      :app="{
        merge: merge == 'true' ? true : false,
        tagConjunction: tagConjunction,
      }"
    >
    </GeneralDemo>
  </div>
</template>

<script>
import GeneralDemo from "../tools/general-demo.vue";
import LabelAndSelect from "../tools/label-and-select.vue";

export default {
  name: "app-tag-conjunction",
  components: {
    LabelAndSelect,
    GeneralDemo,
  },
  data() {
    return {
      countryValuesSelected: true,
      merge: "true",
      tagConjunction: "",
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

@media all and (max-width: 992px) {
  .attributes {
    &:nth-child(1) {
      width: 30%;
    }
    &:nth-child(2) {
      width: 80%;
    }
  }
}
@media all and (max-width: 768px) {
  .attributes {
    display: block !important;
  }
  .flex-between.text {
    display: block !important;
  }
}
</style>
