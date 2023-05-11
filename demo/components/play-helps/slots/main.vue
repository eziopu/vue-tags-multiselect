<template>
  <div id="slots">
    <template v-if="app.operateMode == 'detail'">
      <div
        @click="app.displays.slots = !app.displays.slots"
        class="pointer"
        :class="{ active: app.displays.slots }"
      >
        <h5 class="title" :class="{ ui: app.theme == 'semantic-ui' }">Slots</h5>
        <span class="arrow"></span>
      </div>
      <transition name="slide">
        <Detail v-if="app.displays.slots" class="transition-top"></Detail>
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
