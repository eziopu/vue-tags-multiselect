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
        class="simple container"
        :class="{
          ui: app.theme == 'semantic-ui',
          default: app.theme == 'default',
        }"
      >
        <div class="row">
          <div class="flex-between">
            <span>status</span>
            <span>{{ app.tool.status || "[]" }}</span>
          </div>
          <div class="flex-between">
            <span>inputValue</span>
            <span>{{ app.tool.inputValue || "-" }}</span>
          </div>
        </div>
        <div class="row">
          <div>selectingTag</div>
          <pre class="data">{{ app.tool.selectingTag || "{}" }}</pre>
        </div>
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
.simple.container {
  display: flex;
  justify-content: space-between;
}
.row {
  width: 50%;
  align-content: flex-start;
}
.flex-between {
  width: 100%;
  margin-top: 6px;
}
pre.data {
  padding: 6px;
  margin-left: 12px;
}
</style>
