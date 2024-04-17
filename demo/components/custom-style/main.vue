<template>
  <div id="custom-style" class="demo">
    <div class="depiction">
      <p v-html="$t('ui.page.customStyle')"></p>

      <div class="sub-depiction">
        <p v-html="$t('ui.page.customStyleSub.1')"></p>
      </div>
    </div>
    <FocusDemoApp></FocusDemoApp>
  </div>
</template>

<script>
import FocusDemoApp from "./tools/focus-demo-app.vue";

export default {
  name: "custom-style",
  components: {
    FocusDemoApp,
  },
};
</script>
<style scoped>
#custom-style {
  margin-bottom: 82px;
}
</style>
