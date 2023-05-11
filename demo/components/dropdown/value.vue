<template>
  <div id="dropdown-value" class="demo">
    <h4>Value</h4>
    <div class="depiction">
      {{ $t("attributes.description.dropdown.value") }}
      *{{ $t("ui.general.required") }}
      <br />
      <ALineCode bolder="value" />
    </div>
  </div>
</template>

<script>
import ALineCode from "./tools/a-line-code.vue";

export default {
  name: "dropdown-value",
  components: {
    ALineCode,
  },
};
</script>
