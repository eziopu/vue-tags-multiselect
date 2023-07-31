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
      <div
        v-if="app.displays.attributes"
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
            <input type="text" class="form-control" v-model="app.placeholder" />
          </div>
        </div>

        <div class="flex-between text">
          <h6>Placeholders</h6>
        </div>

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
        <div class="clear"></div>
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
.default {
  .flex-between {
    width: calc(33.33% - 24px);
  }
  @media all and (max-width: 991px) {
    .flex-between {
      width: calc(50% - 24px);
    }
  }
  @media all and (max-width: 576px) {
    .flex-between {
      width: 100%;
    }
  }
}
.flex-between {
  width: 33.33%;
}
@media all and (max-width: 991px) {
  .flex-between {
    width: 50%;
  }
  .flex-between.text {
    width: 100%;
  }
  .ui.input {
    min-width: 60% !important;
  }
}
@media all and (max-width: 576px) {
  .flex-between {
    width: 100%;
  }
  .ui.input {
    min-width: auto;
  }
}
@media all and (max-width: 409px) {
  .flex-between.text {
    display: block !important;
  }
  .ui.input {
    width: 100%;
  }
}
</style>
