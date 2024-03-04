<template>
  <div id="tag-conjunction" class="demo">
    <h3>tag conjunction</h3>
    <div class="depiction">
      {{ $t("attributes.description.slots.tag-conjunction") }}
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
      <LabelAndSelect label="merge" v-model="merge" />
    </div>

    <div class="code-block flex-between">
      <ShowHtmlCode
        class="a-line-code tag prettyprint lang-html customize"
        :app="{tagConjunctionContent: tagConjunctionContent}"
        :dropdownSetting="{
          display: {
            country: false,
            name: false,
            remark: false,
          }
        }"
      />

      <GeneralDemo
        :displayRefreshBtn="true"
        :displayShowCodeBtn="false"
        :selecteds="{
          country: [true, true],
        }"
        :app="{
          merge: merge == 'true' ? true : false,
          tagConjunctionContent: tagConjunctionContent,
        }"
      />
    </div>
  </div>
</template>

<script>
import GeneralDemo from "../tools/general-demo.vue";
import LabelAndSelect from "../tools/label-and-select.vue";
import ShowHtmlCode from "../tools/show-html-code/main.vue"

export default {
  name: "tag-conjunction",
  components: {
    GeneralDemo,
    LabelAndSelect,
    ShowHtmlCode,
  },
  data() {
    return {
      merge: "true",
      showpPlaceholder: false,
      tagConjunctionContent: "&",
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
