<template>
  <div id="refOperates">
    <div
      @click="app.displays.refOperates = !app.displays.refOperates"
      class="pointer"
      :class="{ active: app.displays.refOperates }"
    >
      <h5 class="ui title" :class="{ ui: app.theme == 'semantic-ui' }">
        Methods
      </h5>
      <span class="arrow"></span>
    </div>

    <transition name="slide">
      <div class="detail attributes container" v-if="app.displays.refOperates">
        <div class="row titles">
          <div><h6>Function name</h6></div>
          <div>
            <h6>{{ $t("ui.general.Description") }}</h6>
          </div>
          <div>
            <h6>{{ $t("ui.general.ParameterType") }}</h6>
          </div>
        </div>
        <div class="row">
          <div><div>pushTag</div></div>
          <div>
            <span class="i-block d-md-none"
              >{{ $t("ui.general.Description") }}:
            </span>
            <span>
              {{ $t("attributes.description.refOperates.pushTag") }},
              <br class="d-none d-sm-block" />
              {{ $t("attributes.description.refOperates.pushTag2") }}
            </span>
          </div>
          <div>
            <span class="i-block d-md-none">{{ $t("ui.general.Type") }}: </span>
            <span>tag object*{{ $t("ui.general.required") }}</span>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import InjectApp from "./mixins/inject-app.js";
import { defineComponent } from "vue";
export default defineComponent({
  name: "app-methods",
  mixins: [InjectApp],
});
</script>

<style lang="scss" scoped>
@media all and (min-width: 576px) {
  .row {
    & > div:nth-child(1) {
      width: 20%;
      order: 1;
    }
    & > div:nth-child(2) {
      width: 60%;
      order: 2;
    }
    & > div:nth-child(3) {
      width: 20%;
      order: 3;
    }
    & > div:nth-child(4) {
      width: 100%;
      order: 34;
    }
  }
}
</style>
