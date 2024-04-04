<script>
export default {
  name: "methods-pushTag",
};
</script>

<script setup>
import ShowPushTagFunctionCode from "./show-codes/push-tag-function.vue";
import Parameter from "./pushTag-components/parameter.vue";
import Demo0 from "./pushTag-components/demos/demo0.vue";
import Demo1 from "./pushTag-components/demos/demo1.vue";
const i18n = "attributes.description.methods.pushTag";
</script>

<template>
  <div id="methods-pushTag" class="demo">
    <ToolTitle>pushTag</ToolTitle>

    <div class="depiction">
      <p>
        {{ $t(`${i18n}.description`) }}
      </p>
      <p>
        {{ $t(`${i18n}.sub-description`) }}
      </p>
      
      <div class="sub-depiction">
        <h4>{{ $t("ui.general.example") }} :</h4>
        <ShowPushTagFunctionCode simple />
        or
        <ShowPushTagFunctionCode />
      </div>
    </div>

    <h4 class="ui title method-pushTag__parameter--title">
      Parameter : object
    </h4>

    <Parameter />

    <Demo0 />
    <Demo1 />

  </div>
</template>

<style scoped lang="scss">
.method-pushTag__parameter--title {
  margin-top: 1.6rem;
  margin-bottom: 1.2rem;
}
</style>