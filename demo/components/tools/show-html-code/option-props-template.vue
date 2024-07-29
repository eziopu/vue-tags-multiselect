<template>
  <!--
  --><span v-show="props.value != ''"> value="{{ props.value }}"</span
  ><!--
  --><span v-show="props.title"> title</span
  ><!--
  --><span v-show="props.displayValue"> displayValue</span
  ><!--
  --><span v-show="props.disabled"> disabled</span
  ><!--
  --><span v-show="props.divided"> divided</span
  ><!--
  --><span v-show="props.selected"> selected</span
  ><!--
--></template>

<script>
import { V_OPTION_PROPS } from '@models/attributes/default.js'

export default {
  name: 'show-html-code__option-props-template',
  props: {
    props: {
      type: Object,
      default: () => {
        return V_OPTION_PROPS
      }
    }
  }
}
</script>
