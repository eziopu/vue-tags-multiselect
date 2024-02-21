<template>
  <div>
    <div
      @click="app.displays.events = !app.displays.events"
      class="pointer"
      :class="{ active: app.displays.events }"
    >
      <h3 class="ui title">Events</h3>
      <span class="arrow"></span>
    </div>

    <transition name="slide">
      <div
        v-if="app.displays.events"
        class="simple container"
        :class="{
          ui: app.framework == 'semantic-ui',
          default: app.framework == 'default',
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
          <pre class="data" :class="app.framework">{{
            app.tool.selectingTag || "{}"
          }}</pre>
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
<style scoped lang="scss">
@import "./assets/stylesheets.scss";
.simple.container {
  display: flex;
  justify-content: space-between;
}
.row {
  width: 50%;
  align-content: flex-start;
  padding: 0 6px;
}
.flex-between {
  width: 100%;
  margin-top: 6px;
}

@media (max-width: 768px) {
  .simple.container {
    flex-direction: column;
  }
  .row {
    width: 100%;
  }
  .default .row {
    width: auto;
  }

  .row:last-child {
    margin-top: 6px;
  }
}
</style>
