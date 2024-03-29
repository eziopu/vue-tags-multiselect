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
      <LabelAndControls label="merge" v-model="merge" />
      <LabelAndControls
        model="input"
        label="tag-conjunction"
        v-model="tagConjunctionContent"
        :disabled="merge == 'false'"
        :placeholder="`default: &`"
      />
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
.attribute.text {
  width: 50%;

  @media all and (max-width: 992px) {
    width: 60%;
  }
  @media all and (max-width: 768px) {
    width: 100%;
  }
}
@media all and (max-width: 768px) {
  .attributes {
    flex-direction: column;
  }
}

</style>
