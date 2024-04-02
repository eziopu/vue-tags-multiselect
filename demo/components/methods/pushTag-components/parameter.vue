<script>
export default {
  name: "methods-pushTag__parameter",
};
</script>

<script setup>
import { PARAMETERS } from "./models.js";
</script>

<template>
  <div id="method-pushTag__parameter--table" class="demo__table container">
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
      v-for="(value, key) in PARAMETERS"
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
</template>

<style scoped lang="scss">
@media (min-width: 768px) {
  #method-pushTag__parameter--table .row {
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