<template>
  <div id="keyboard" class="demo">
    <ToolTitle>Keyboard</ToolTitle>
    
    <div class="depiction">
      <p>{{ $t("attributes.app.keyboard") }}</p>
      <p>{{ $t("attributes.app.keyboard__detail") }}</p>
    </div>
    <KeyboardTemplate />
    
    <div class="attributes with-demo-control">
      <LabelAndControls label="keyboard" v-model="keyboard" />
    </div>

    <GeneralDemo
      :app="{
        keyboard: keyboard
      }"
    ></GeneralDemo>
  </div>
</template>

<script>
import KeyboardTemplate from "./keyboard-template.vue";

export default {
  name: "demo-keyboard",
  components: {
    KeyboardTemplate,
  },
  data() {
    return {
      keyboard: true
    };
  },
};
</script>
