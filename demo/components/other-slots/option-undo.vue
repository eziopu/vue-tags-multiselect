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
        :app="{optionUndoContent: optionUndo}"
        :dropdownSetting="{
          display: {
            country: false,
            name: false,
            remark: false,
          }
        }"
      />

      <div class="demo-app" :class="['option-undo', appStatus]">
        <FocusDemoApp 
          isUndoDemo
          v-model="appStatus"
          :slots="{ optionUndo: optionUndo }"
        >
        </FocusDemoApp>
      </div>
    </div>
  </div>
</template>

<script>
import FocusDemoApp from "./tools/focus-demo-app.vue";
import ShowHtmlCode from "../tools/show-html-code/main.vue"

export default {
  name: "option-undo",
  components: {
    FocusDemoApp,
    ShowHtmlCode,
  },
  data() {
    return {
      appStatus: [],
      showpPlaceholder: false,
      optionUndo: " < Undo",
    };
  },
};
</script>

<style scoped lang="scss">
@import "./assets/stylesheets.scss";
</style>
