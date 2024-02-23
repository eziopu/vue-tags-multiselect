<template>
  <div id="events">
    <div
      @click="app.displays.events = !app.displays.events"
      class="help-title pointer "
      :class="{ active: app.displays.events }"
    >
      <h3 class="title" :class="{ ui: app.framework == 'semantic-ui' }">
        Events
      </h3>
      <span class="arrow"></span>
    </div>
    
    <Transition name="slide">
      <template v-if="app.displays.events">

        <Transition name="out-in">
          <Detail v-if="app.operateMode == 'detail'"></Detail>
          <Simple v-else></Simple>
        </Transition>

      </template>
    </Transition>
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
