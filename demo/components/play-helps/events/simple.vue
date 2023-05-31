<template>
  <div>
    <div
      @click="app.displays.events = !app.displays.events"
      class="pointer"
      :class="{ active: app.displays.events }"
    >
      <h5 class="ui title">Events</h5>
      <span class="arrow"></span>
    </div>

    <transition name="slide">
      <div
        v-if="app.displays.events"
        class="simple attributes transition-top"
        :class="{
          ui: app.theme == 'semantic-ui',
          default: app.theme == 'default',
        }"
      >
        <div class="flex-between">
          <span>status</span>
          <span>{{ app.tool.status || "[]" }}</span>
        </div>
        <div class="flex-between">
          <span>selectingKey</span>
          <span>{{ app.tool.selectingKey || "-" }}</span>
        </div>
        <div class="flex-between">
          <span>inputValue</span>
          <span>{{ app.tool.inputValue || "-" }}</span>
        </div>
        <div class="flex-between text">
          <span>edintng</span>
          <p>{{ app.tool.editing || {} }}</p>
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
  name: "events-simple",
  mixins: [InjectApp],
});
</script>
<style lang="scss" scoped>
.default {
  .flex-between {
    width: calc(50% - 24px);
  }
  @media all and (max-width: 576px) {
    .flex-between {
      width: 100%;
    }
  }
}

.flex-between {
  width: 50%;
}
@media all and (max-width: 768px) {
  .flex-between.text {
    display: block !important;
  }
}
@media all and (max-width: 576px) {
  .flex-between {
    width: 100%;
  }
}
</style>
