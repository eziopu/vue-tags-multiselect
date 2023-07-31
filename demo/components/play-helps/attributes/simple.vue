<template>
  <div>
    <div
      @click="app.displays.attributes = !app.displays.attributes"
      class="pointer"
      :class="{ active: app.displays.attributes }"
    >
      <h5 class="ui title">Attributes</h5>
      <span class="arrow"></span>
    </div>

    <transition name="slide">
      <div v-if="app.displays.attributes">
        <div
          class="simple attributes"
          :class="{
            ui: app.theme == 'semantic-ui',
            default: app.theme == 'default',
          }"
        >
          <LabelAndSelect value="disabled" />
          <LabelAndSelect value="loading" />
          <LabelAndSelect value="search" />
          <LabelAndSelect value="create" />
          <LabelAndSelect
            value="deleteIcon"
            :values="['always', 'edit', 'none']"
          />
          <LabelAndSelect value="conjunction" :values="['AND', 'OR', 'null']" />
          <LabelAndSelect value="transition" />
          <LabelAndSelect value="merge" :disabled="app.conjunction == 'AND'" />
          <div class="flex-between text">
            <div>placeholder</div>
            <div class="ui input">
              <input
                type="text"
                class="form-control"
                v-model="app.placeholder"
              />
            </div>
          </div>
        </div>

        <h6 style="margin: 18px 0">Placeholders</h6>

        <div
          class="simple placeholders attributes"
          :class="{
            ui: app.theme == 'semantic-ui',
            default: app.theme == 'default',
          }"
        >
          <div class="flex-between text">
            <div>initial</div>
            <div class="ui input">
              <input
                type="text"
                class="form-control"
                v-model="app.placeholders.initial"
              />
            </div>
          </div>
          <div class="flex-between text">
            <div>loading</div>
            <div class="ui input">
              <input
                type="text"
                class="form-control"
                v-model="app.placeholders.loading"
                :placeholder="`Wait a moment, please.`"
              />
            </div>
          </div>
          <div class="flex-between text">
            <div>tagValueRepeat</div>
            <div class="ui input">
              <input
                type="text"
                class="form-control"
                v-model="app.placeholders.tagValueRepeat"
                :placeholder="`repeat !`"
              />
            </div>
          </div>
          <div class="flex-between text">
            <div>selectDown</div>
            <div class="ui input">
              <input
                type="text"
                class="form-control"
                v-model="app.placeholders.selectDown"
                :placeholder="`Selected End.`"
              />
            </div>
          </div>
          <div class="flex-between text">
            <div>finish</div>
            <div class="ui input">
              <input
                type="text"
                class="form-control"
                v-model="app.placeholders.finish"
                :disabled="app.create == 'true'"
                :placeholder="`Finish.`"
              />
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import InjectApp from "../mixins/inject-app.js";
import LabelAndSelect from "./label-and-select.vue";

import { defineComponent } from "vue";
export default defineComponent({
  name: "attributes-simple",
  mixins: [InjectApp],
  components: {
    LabelAndSelect,
  },
});
</script>

<style lang="scss" scoped>
.attributes:first-child {
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr) !important;
  }
}
</style>
