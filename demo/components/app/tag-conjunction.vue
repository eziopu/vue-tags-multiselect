<template>
  <div id="tag-conjunction" class="demo">
    <ToolTitle>Tag conjunction</ToolTitle>

    <div class="depiction">
      {{ $t("attributes.description.slots.tag-conjunction") }}
      *<span
        v-html="$t('attributes.description.slots.tag-conjunction__notice')"
      ></span>
    </div>

    <div class="attributes flex-between with-demo-control">
      <LabelAndSelect label="merge" v-model="merge" />
      <div class="attribute flex-between text">
        <span> tag-conjunction: </span>
        <div class="ui input">
          <input
            type="text"
            class="form-control"
            v-model="tagConjunctionContent"
            :disabled="merge == 'false'"
            :placeholder="`default: &`"
          />
        </div>
      </div>
    </div>

    <GeneralDemo
      :displayRefreshBtn="true"
      :option="{
        country: [{}, {selected: true}, {selected: true}],
      }"
      :app="{
        merge: merge,
      }"
      :slots="{
        tagConjunction: tagConjunctionContent,
      }"
    >
    </GeneralDemo>
  </div>
</template>

<script>
export default {
  name: "app-tag-conjunction",
  data() {
    return {
      merge: true,
      tagConjunctionContent: "",
    };
  },
};
</script>

<style scoped lang="scss">


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
