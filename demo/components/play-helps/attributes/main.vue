<template>
  <div id="attributes">
    <div
      @click="app.displays.attributes = !app.displays.attributes"
      class="help-title pointer "
      :class="{ active: app.displays.attributes }"
    >
      <h3 class="title" :class="{ ui: app.framework == 'semantic-ui' }">
        Attributes
      </h3>
      <span class="arrow"></span>
    </div>
    
    <Transition name="slide">
      <template v-if="app.displays.attributes">

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
  name: "attributes-main",
  components: {
    Detail,
    Simple,
  },
  mixins: [InjectApp],
});
</script>
