<template>
  <div>
    <div
      class="simple attributes"
      :class="{
        ui: app.framework == 'semantic-ui',
        default: app.framework == 'default',
      }"
    >
      <LabelAndControls value="disabled" />
      <LabelAndControls value="search" />
      <LabelAndControls value="loading" />
      <LabelAndControls value="dropdownLoading" />
      <LabelAndControls value="create" />
      <LabelAndControls
        value="deleteIcon"
        :values="['always', 'edit', 'none']"
      />

      <LabelAndControls value="merge" :disabled="app.conjunction == 'AND'" />
      <LabelAndControls value="conjunction" :values="['AND', 'OR', 'null']" />

      <LabelAndControls value="transition" />
      <LabelAndControls value="keyboard" />
      <LabelAndControls value="debugLog" />
      <LabelAndControls value="tagPosition" :values="['null', 'top', 'bottom']" />

      <div class="flex-between text">
        <div>placeholder</div>
        <div class="ui input">
          <input
            type="text"
            class="form-control"
            v-model="app.placeholder"
            :style="{
              'min-width': app.framework != 'bootstrap' ? '100px' : '',
              'width': app.framework != 'bootstrap' ? '100%' : ''
            }"
          />
        </div>
      </div>
    </div>

    <h4 style="margin: 18px 0">Placeholders</h4>

    <div
      class="simple placeholders attributes"
      :class="{
        ui: app.framework == 'semantic-ui',
        default: app.framework == 'default',
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
</template>

<script>
import InjectApp from "../mixins/inject-app.js";

import { defineComponent } from "vue";
export default defineComponent({
  name: "attributes-simple",
  mixins: [InjectApp],
});
</script>

<style scoped lang="scss">
.attributes:first-child {
  @media (max-width: 768px) and (min-width: 476px) {
    grid-template-columns: repeat(2, 1fr) !important;
  }
}
</style>
