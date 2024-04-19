<template>
  <div id="option-OR-conjunction" class="demo" :class="demoStatus">
    <ToolTitle>Option OR conjunction</ToolTitle>

    <div class="depiction">
      {{ $t(`attributes.slots.option-OR-conjunction`) }}
    </div>

    <div class="attributes flex-between to5-5">
      <LabelAndControls
        model="input"
        label="option-OR-conjunction"
        v-model="optionORConjunction"
        :placeholder="`default : OR`"
      />
    </div>

    <div class="flex-between to5-5">
      <div>
        <ShowHtmlCode
          class="tag prettyprint lang-html customize"
          :slots="{
            optionORConjunction: optionORConjunction || '...'
          }"
          :dropdown="{
            country: {isDisplayForDemo: false},
            name: {isDisplayForDemo: false},
            remark: {isDisplayForDemo: false}
          }"
        />
      </div>

      <GeneralDemo
        class="demo-app"
        v-model="demoStatus"
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
import ShowHtmlCode from "../tools/show-html-code/main.vue"

export default {
  name: "option-OR-conjunction",
  components: {
    ShowHtmlCode,
  },
  data() {
    return {
      demoStatus: [],
      optionORConjunction: "",
    };
  },
};
</script>

<style scoped lang="scss">
@import "./assets/stylesheets.scss";
</style>
