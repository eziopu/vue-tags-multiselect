<template>
  <div id="keyboard" class="demo">
    <ToolTitle>{{ $t("ui.page.description.keyboard") }}</ToolTitle>
    
    <div class="depiction">
      {{ $t("ui.page.description.keyboardSub") }}
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
