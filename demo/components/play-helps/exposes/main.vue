<template>
  <div id="exposes">
    <HelpTitle 
      label="Exposes"
      target="exposes"
    />
    
    <transition name="slide">
      <PushTag v-if="app.displays.exposes"></PushTag>
    </transition>
  </div>
</template>

<script>
import InjectApp from "../mixins/inject-app.js";
import HelpTitle from "../components/title.vue";
import PushTag from "./pushTag.vue";

import { defineComponent } from "vue";
export default defineComponent({
  name: "attributes-main",
  mixins: [InjectApp],
  components: {
    HelpTitle,
    PushTag,
  },
});
</script>
