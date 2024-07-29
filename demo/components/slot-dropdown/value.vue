<script>
export default {
  name: 'dropdown-value'
}
</script>

<script setup>
import ALineCode from './tools/a-line-code.vue'
</script>

<template>
  <div id="dropdown-value" class="demo">
    <ToolTitle>Value</ToolTitle>

    <div class="flex-between to6-4">
      <div class="depiction">
        {{ $t(`attributes.dropdown.value`) }}
        *{{ $t(`ui.general.required`) }}
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
