<template>
  <div id="methods">
    <div
      @click="app.displays.methods = !app.displays.methods"
      class="pointer"
      :class="{ active: app.displays.methods }"
    >
      <h5 class="ui title" :class="{ ui: app.framework == 'semantic-ui' }">
        Methods
      </h5>
      <span class="arrow"></span>
    </div>

    <transition name="slide">
      <PushTag v-if="app.displays.methods"></PushTag>
    </transition>
  </div>
</template>

<script>
import InjectApp from "../mixins/inject-app.js";
import PushTag from "./pushTag.vue";

import { defineComponent } from "vue";
export default defineComponent({
  name: "attributes-main",
  mixins: [InjectApp],
  components: {
    PushTag,
  },
});
</script>
