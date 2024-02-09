<template>
  <div id="events">
    <template v-if="app.operateMode == 'detail'">
      <div
        @click="app.displays.events = !app.displays.events"
        class="pointer"
        :class="{ active: app.displays.events }"
      >
        <h5 class="title" :class="{ ui: app.framework == 'semantic-ui' }">
          Events
        </h5>
        <span class="arrow"></span>
      </div>
      <transition name="slide">
        <Detail v-if="app.displays.events"></Detail>
      </transition>
    </template>
    <Simple v-else></Simple>
  </div>
</template>

<script>
import InjectApp from "../mixins/inject-app.js";
import Detail from "./detail.vue";
import Simple from "./simple.vue";

import { defineComponent } from "vue";
export default defineComponent({
  name: "events-main",
  mixins: [InjectApp],
  components: {
    Detail,
    Simple,
  },
});
</script>
