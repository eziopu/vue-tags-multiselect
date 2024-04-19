<script>
export default {
  name: "exposes-pushTag",
};
</script>

<script setup>
import ShowPushTagFunctionCode from "./pushTag-components/show-codes/main.vue";
import Parameter from "./pushTag-components/parameter.vue";
import Demo0 from "./pushTag-components/demos/demo0.vue";
import Demo1 from "./pushTag-components/demos/demo1.vue";
const i18n = "attributes.exposes.pushTag__details";
const i18nNoKey = `${i18n}.no-key`;
const i18nHasKey = `${i18n}.has-key`;
</script>

<template>
  <div id="exposes-pushTag" class="demo">
    <ToolTitle>pushTag({ ... })</ToolTitle>

    <div class="depiction">
      <p>
        {{ $t(`attributes.exposes.pushTag`) }}
      </p>
      <p>
        {{ $t(`${i18n}.sub-description`) }}
      </p>
      
      <div class="sub-depiction">
        <h4>{{ $t(`ui.general.example`) }} :</h4>
        <ShowPushTagFunctionCode />
      </div>

      <div class="depiction__no-key">
        <p v-html="$t(`${i18nNoKey}.description`)"></p>
        <ul>
          <li v-html="$t(`${i18nNoKey}.1`)"></li>
          <li v-html="$t(`${i18nNoKey}.2`)"></li>
        </ul>
      </div>

      <div class="depiction__has-key">
        <p v-html="$t(`${i18nHasKey}.description`)"></p>
        <ul>
          <li v-html="$t(`${i18nHasKey}.1`)"></li>
          <li v-html="$t(`${i18nHasKey}.2`)"></li>
        </ul>
      </div>
    </div>

    <h4 class="ui title method-pushTag__parameter--title">
      Attributes
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

.depiction__no-key,
.depiction__has-key {
  ul {
    margin-top: 0;
  }
  p, li {
    margin-bottom: .3rem;
  }
}
.depiction__no-key {
  margin-top: 1rem;
}

</style>