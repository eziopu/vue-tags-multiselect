<script>
export default {
  name: "methods-pushTag",
};
</script>

<script setup>
import { ref, reactive } from "vue";
import PushTagFunctionCode from "./tools/push-tag-function-code.vue";

const demoStatus = ref([]);

const parameters = reactive({
  key: { type: "string", default: "null", required: "no" },
  value: { type: "string", default: "null", required: "*yes" },
  valueElm: { type: "string", default: "null", required: "no" },
  titleElm: { type: "string", default: "null", required: "no" },
  classList: { type: "array", default: "[]", required: "no" },
  custom: { type: "boolean", default: "false", required: "no" },
  displayValue: { type: "boolean", default: "false", required: "no" },
})
</script>

<template>
  <div id="methods-pushTag" class="demo" :class="demoStatus">
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
        <PushTagFunctionCode simple />
        or
        <PushTagFunctionCode />
      </div>
    </div>

    <h4 class="ui title method-pushTag__parameter--title">
      Parameter : object
    </h4>
    
    <div class="demo__table method-pushTag__parameter--table container">
      <div class="row titles">
        <div>
          <h5>{{ $t("ui.general.Attribute") }}</h5>
        </div>
        <div>
          <h5>{{ $t("ui.general.Description") }}</h5>
        </div>
        <div>
          <h5>{{ $t("ui.general.Type") }}</h5>
        </div>
        <div>
          <h5>{{ $t("ui.general.Default") }}</h5>
        </div>
        <div>
          <h5>{{ $t("ui.general.Required") }}</h5>
        </div>
      </div>

      <div
        class="row"
        v-for="(value, key) in parameters"
        :key="`parameters_${key}`"
      >
        <div>{{ key }}</div>
        <div>
          <span class="i-block d-md-none"
            >{{ $t("ui.general.Description") }}:
          </span>
          <span>{{
            $t(`attributes.description.methods.pushTag.parameter.${key}`)
          }}</span>
        </div>

        <div>
          <span class="i-block d-md-none">
            {{ $t("ui.general.Type") }}:
          </span>
          {{ value.type }}
        </div>
        <div>
          <span class="i-block d-md-none">
            {{ $t("ui.general.Default") }}:
          </span>
          {{ value.default }}
        </div>
        <div v-if="value.required == 'no'">
          <div class="d-none d-md-block">no</div>
        </div>
        <div v-else>
          <span class="i-block d-md-none">
            {{ $t("ui.general.Required") }}:
          </span>
          {{ value.required }}
        </div>
      </div>
    </div>

    <div class="flex-between to5-5">
      <GeneralDemo
        v-model="demoStatus"
        :displayOutput="true"
        :displayRefreshBtn="true"
        :displayShowCodeBtn="false"
        :dropdown="{
          name: {isDisplayForDemo: false},
        }"
        :option="{
          country: [{}, {selected: true}],
        }"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.method-pushTag__parameter--title {
  margin-top: 1.6rem;
  margin-bottom: 1.2rem;
}

@media (min-width: 576px) {
  .method-pushTag__parameter--table .row {
    & > div:nth-child(1) {
      width: 15+2%;
      order: 1;
    }
    & > div:nth-child(2) {
      width: 45%;
      order: 2;
    }
    & > div:nth-child(3) {
      width: 12%;
      order: 3;
    }
    & > div:nth-child(4) {
      width: 14%;
      order: 4;
    }
    & > div:nth-child(5) {
      width: 12%;
      order: 5;
    }
  }
}
</style>