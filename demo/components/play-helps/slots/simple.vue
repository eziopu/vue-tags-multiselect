<template>
  <div>
    <div
      @click="app.displays.slots = !app.displays.slots"
      class="pointer"
      :class="{ active: app.displays.slots }"
    >
      <h5 class="ui title">Slots</h5>
      <span class="arrow"></span>
    </div>

    <transition name="slide">
      <div
        v-if="app.displays.slots"
        class="simple attributes"
        :class="{
          ui: app.theme == 'semantic-ui',
          default: app.theme == 'default',
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
    </transition>
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
