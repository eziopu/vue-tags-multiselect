<script>
export default {
  name: 'play-events-components-value'
}
</script>
<script setup>
import { inject } from 'vue'
defineProps({
  keyName: String,
  attribute: Object
})

const framework = inject('framework')
const getOperateMode = inject('getOperateMode')
const appAttributes = inject('attributes')
</script>

<template>
  <pre
    v-if="attribute.default == '(tag: object) => void'"
    :class="['data', getOperateMode(), framework, keyName]"
  ><!-- 
    -->{{ attribute.value || '{}' }}<!--
  --></pre>
  <span v-else>
    <template v-if="typeof attribute.value == 'number' && attribute.value != 0">
      {{ attribute.value }} triggered
    </template>
    <template v-else>
      <template v-if="keyName == 'clear' && appAttributes.clearable.value == false">
        not enabled
        <i class="fa fa-info-circle" aria-hidden="true" title="*clearable is false"></i>
      </template>
      <template v-else>
        {{ attribute.value || '-' }}
      </template>
    </template>
  </span>
</template>

<style scoped lang="scss">
pre.data {
  padding: 6px;
  margin: 12px;

  &.default {
    min-height: 130px;
  }

  &.semantic-ui,
  &.bootstrap {
    min-height: 200px;
  }

  &.simple {
    width: 90%;
  }

  &.remove-tag {
    &.detail {
      min-height: 100px;
    }
    &.simple {
      @media (max-width: 768px) {
        min-height: 100px;
      }
    }
  }
}
</style>
