<template>
  <div id="option-undo" class="demo">
    <h3>Option undo</h3>
    <div class="depiction">
      {{ $t("attributes.description.slots.option-undo") }}
    </div>

    <hr />
    <div class="attributes flex-between">
      <div class="attribute flex-between text">
        <span> option-undo: </span>
        <div class="ui input relative">
          <input type="text" class="form-control" v-model="optionUndo" />
          <div class="demo__fake-placeholder" v-if="optionUndo == ''">
            default: <i class="demo__arrow-left"></i>Undo
          </div>
        </div>
      </div>
    </div>

    <div class="code-block flex-between">
      <ShowHtmlCode
        class="a-line-code tag prettyprint lang-html customize"
        :slots="{
          optionUndo: optionUndo || '...'
        }"
        :dropdown="{
          country: {isDisplayForDemo: false},
          name: {isDisplayForDemo: false},
          remark: {isDisplayForDemo: false}
        }"
      />

      <GeneralDemo
        class="demo-app"
        :autoFocus="true"
        :displayRefreshBtn="true"
        :displayShowCodeBtn="false"
        :app="{
          loading: loading == 'true' ? true : false,
        }"
        :slots="{
          optionUndo: optionUndo,
        }"
        :dropdown="{
          name: {isDisplayForDemo: false}
        }"
        :option="{
          country: [{selected: true}],
        }"
      />
    </div>
  </div>
</template>

<script>
import GeneralDemo from "../tools/general-demo.vue";
import ShowHtmlCode from "../tools/show-html-code/main.vue"

export default {
  name: "option-undo",
  components: {
    GeneralDemo,
    ShowHtmlCode,
  },
  data() {
    return {
      appStatus: [],
      showpPlaceholder: false,
      optionUndo: "",
    };
  },
};
</script>

<style scoped lang="scss">
@import "./assets/stylesheets.scss";
</style>
