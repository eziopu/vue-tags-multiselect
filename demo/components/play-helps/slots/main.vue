<template>
  <div id="slots">
    <HelpTitle 
      label="Slots"
      target="slots"
    />
    
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
import HelpTitle from "../components/title.vue";
import Detail from "./detail.vue";
import Simple from "./simple.vue";

import { defineComponent } from "vue";
export default defineComponent({
  name: "slots-main",
  mixins: [InjectApp],
  components: {
    HelpTitle,
    Detail,
    Simple,
  },
});
</script>
