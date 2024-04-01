<script>
export default {
  name: "methods-pushTag",
};
</script>

<script setup>
import ShowPushTagFunctionCode from "./show-codes/push-tag-function.vue";
import Parameter from "./pushTag-components/parameter.vue";
import Demo0 from "./pushTag-components/demos/demo0.vue";
</script>

<template>
  <div id="methods-pushTag" class="demo">
    <ToolTitle>pushTag</ToolTitle>

    <div class="depiction">
      <p>
        {{ $t("attributes.description.methods.pushTag.1") }}
      </p>
      <p>
        {{ $t("attributes.description.methods.pushTag.2") }}
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

    <Parameter></Parameter>

    <Demo0></Demo0>

  </div>
</template>

<style scoped lang="scss">
.method-pushTag__parameter--title {
  margin-top: 1.6rem;
  margin-bottom: 1.2rem;
}
</style>