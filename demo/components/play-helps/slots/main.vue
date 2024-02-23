<template>
  <div id="slots">
    <div
      @click="app.displays.slots = !app.displays.slots"
      class="help-title pointer "
      :class="{ active: app.displays.slots }"
    >
      <h3 class="title" :class="{ ui: app.framework == 'semantic-ui' }">
        Slots
      </h3>
      <span class="arrow"></span>
    </div>
    
    <Transition name="slide">
      <template v-if="app.displays.slots">

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
  name: "slots-main",
  mixins: [InjectApp],
  components: {
    Detail,
    Simple,
  },
});
</script>
