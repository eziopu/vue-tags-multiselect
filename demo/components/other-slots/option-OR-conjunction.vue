<template>
  <div id="option-OR-conjunction" class="demo">
    <h3>Option OR conjunction</h3>
    <div class="depiction">
      {{ $t("attributes.description.slots.option-OR-conjunction") }}
    </div>

    <hr />
    <div class="attributes flex-between">
      <div class="attribute flex-between text">
        <span> option-OR-conjunction: </span>
        <div class="ui input">
          <input
            type="text"
            class="form-control"
            v-model="optionORConjunction"
            :placeholder="`default: OR`"
          />
        </div>
      </div>
    </div>

    <div class="code-block flex-between">
      <ShowHtmlCode
        class="a-line-code tag prettyprint lang-html customize"
        :slots="{
          optionORConjunction: optionORConjunction || '...'
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
          optionORConjunction: optionORConjunction,
        }"
        :dropdown="{
          name: {isDisplayForDemo: false}
        }"
        :option="{
          country: [{}, {selected: true}],
        }"
      />
    </div>
  </div>
</template>

<script>
import GeneralDemo from "../tools/general-demo.vue";
import ShowHtmlCode from "../tools/show-html-code/main.vue"

export default {
  name: "option-OR-conjunction",
  components: {
    GeneralDemo,
    ShowHtmlCode,
  },
  data() {
    return {
      appStatus: [],
      optionORConjunction: "",
    };
  },
};
</script>

<style scoped lang="scss">
@import "./assets/stylesheets.scss";
</style>
