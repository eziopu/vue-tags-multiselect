<template>
  <div id="slots">
    <template v-if="app.operateMode == 'detail'">
      <div
        @click="app.displays.slots = !app.displays.slots"
        class="pointer"
        :class="{ active: app.displays.slots }"
      >
        <h3 class="title" :class="{ ui: app.framework == 'semantic-ui' }">Slots</h3>
        <span class="arrow"></span>
      </div>
      <transition name="slide">
        <Detail v-if="app.displays.slots"></Detail>
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
  name: "slots-main",
  mixins: [InjectApp],
  components: {
    Detail,
    Simple,
  },
});
</script>
