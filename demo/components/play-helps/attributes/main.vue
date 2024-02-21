<template>
  <div id="attributes">
    <template v-if="app.operateMode == 'detail'">
      <div
        @click="app.displays.attributes = !app.displays.attributes"
        class="pointer"
        :class="{ active: app.displays.attributes }"
      >
        <h3 class="title" :class="{ ui: app.framework == 'semantic-ui' }">
          Attributes
        </h3>
        <span class="arrow"></span>
      </div>
      <transition name="slide">
        <Detail v-if="app.displays.attributes"></Detail>
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
  name: "attributes-main",
  components: {
    Detail,
    Simple,
  },
  mixins: [InjectApp],
});
</script>
