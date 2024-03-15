<template>
  <div id="option-value" class="demo">
    <h3>Value</h3>
    <div class="flex-between to6-4">
      <div class="depiction">
      {{ $t("attributes.description.option.value") }}
      *{{ $t("attributes.description.option.value__notice") }}
        <br />
        <ALineCode :bolders="['value']" />
      </div>
      <div>
        result is object array 
        <br />
        <pre><code>{ country: ["mare", "eldia"], ...}</code></pre>
      </div>
    </div>
  </div>
</template>

<script>
import ALineCode from "./tools/a-line-code.vue";

export default {
  name: "option-value",
  components: {
    ALineCode,
  },
};
</script>
