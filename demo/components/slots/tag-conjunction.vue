<template>
  <div id="tag-conjunction" class="demo">
    <h3>Tag conjunction</h3>
    <div class="depiction">
      {{ $t("attributes.description.slots.tag-conjunction") }}
      <div class="sub-depiction">
        <p v-html="$t('attributes.description.slots.tag-conjunction__notice')"></p>
      </div>
    </div>

    <hr />
    <div class="attributes flex-between">
      <div class="attribute flex-between text">
        <span> tag-conjunction: </span>
        <div class="ui input relative">
          <input
            type="text"
            class="form-control"
            v-model="tagConjunctionContent"
            :placeholder="`default: &`"
          />
        </div>
      </div>
      <LabelAndControls label="merge" v-model="merge" />
    </div>

    <div class="code-block flex-between">
      <ShowHtmlCode
        class="a-line-code tag prettyprint lang-html customize"
        :app="{
          merge: merge,
        }"
        :slots="{
          tagConjunction: tagConjunctionContent || '...',
        }"
        :dropdown="{
          name: {isDisplayForDemo: false},
          remark: {isDisplayForDemo: false}
        }"
      />

      <GeneralDemo
        class="demo-app"
        :displayRefreshBtn="true"
        :displayShowCodeBtn="false"
        :app="{
          merge: merge == 'true' ? true : false,
        }"
        :slots="{
          tagConjunction: tagConjunctionContent,
        }"
        :dropdown="{
          name: {isDisplayForDemo: false}
        }"
        :option="{
          country: [{}, {selected: true}, {selected: true}],
        }"
      />
    </div>
  </div>
</template>

<script>
import ShowHtmlCode from "../tools/show-html-code/main.vue"

export default {
  name: "tag-conjunction",
  components: {
    ShowHtmlCode,
  },
  data() {
    return {
      merge: "true",
      showpPlaceholder: false,
      tagConjunctionContent: "",
    };
  },
};
</script>

<style scoped lang="scss">
@import "./assets/stylesheets.scss";
.attributes.flex-between {
  width: 50%;
  @media all and (max-width: 992px) {
    width: 100%;
  }
}

@media all and (max-width: 500px) {
  .attributes {
    flex-direction: column;
  }
  .attribute:last-child {
    margin-top: .6rem;
  }
}

</style>
