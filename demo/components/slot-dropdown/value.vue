<template>
  <div id="dropdown-value" class="demo">
    <h3>Value</h3>
    <div class="flex-between to6-4">
      <div class="depiction">
        {{ $t("attributes.description.dropdown.value") }}
        *{{ $t("ui.general.required") }}
        <br />
        <ALineCode :bolders="['value']" />
      </div>
      <div>
        result is object array 
        <br />
        <pre><code>{ country: [...], ...}</code></pre>
      </div>
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
