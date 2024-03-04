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
          <div class="fake-placeholder" v-if="optionUndo == ''">
            default: <i class="arrow-left"></i>Undo
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

.fake-placeholder {
  position: absolute;
  top: 3px;
  left: 13px;
  color: #6c757d;
}

.arrow-left {
  margin-left: 8px;

  border: solid #6c757d;
  border-width: 0 3px 3px 0;
  display: inline-block;
  padding: 4px;
  transform: rotate(135deg);
  -webkit-transform: rotate(135deg);
}
</style>
