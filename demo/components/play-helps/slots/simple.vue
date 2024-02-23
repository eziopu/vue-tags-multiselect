<template>
  <div class="simple attributes"
    :class="{
      ui: app.framework == 'semantic-ui',
      default: app.framework == 'default',
    }"
  >
    <div class="flex-between text">
      <div>loading</div>
      <div class="ui input">
        <input
          type="text"
          class="form-control"
          v-model="app.loadingContent"
        />
      </div>
    </div>
    <div class="flex-between text">
      <div>tag-conjunction</div>
      <div class="ui input">
        <input
          type="text"
          class="form-control"
          v-model="app.tagConjunction"
          :disabled="app.merge == 'false'"
          :placeholder="`&`"
        />
      </div>
    </div>
    <div class="flex-between text">
      <div>option-undo</div>
      <div class="ui input relative">
        <input
          type="text"
          class="form-control"
          v-model="app.optionUndoContent"
        />
        <div class="fake-placeholder" v-if="app.optionUndoContent == ''">
          <i class="arrow-left"></i>Undo
        </div>
      </div>
    </div>
    <div class="flex-between text">
      <div>option-OR-conjunction</div>
      <div class="ui input">
        <input
          type="text"
          class="form-control"
          v-model="app.optionORConjunctionContent"
          :placeholder="`OR`"
        />
      </div>
    </div>
    <div class="clear"></div>
  </div>
</template>

<script>
import InjectApp from "../mixins/inject-app.js";
import { defineComponent } from "vue";
export default defineComponent({
  name: "slots-simple",
  mixins: [InjectApp],
});
</script>

<style scoped lang="scss">
@import "./assets/stylesheets.scss";
</style>
