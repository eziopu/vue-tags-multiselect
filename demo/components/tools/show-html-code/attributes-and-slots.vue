<!-- eslint-disable prettier/prettier -->
<template>
  <!--
  --><span
    v-for="(value, key) in Object.fromEntries(
      Object.entries(modelAttributes).filter(([key, __value]) => key !== 'placeholders')
    )"
    :key="key"
    v-show="app[key] != value"
    ><Space /><span class="pln">:</span><span class="atn">{{ key }}</span
    ><span class="pun">=</span><span class="atv">"{{ app[key] }}"</span><br /></span
  ><!--

  --><span v-show="isShowPlaceholders"
    ><!--
    --><Space /><!--
    --><span class="pln">:</span><span class="atn">placeholders</span
    ><span class="pun">=</span>"{<br /><!--
    --><span
      v-for="(pValue, pKey) in modelAttributes.placeholders"
      :key="pKey"
      v-show="app.placeholders[pKey] != pValue && app.placeholders[pKey] != ''"
      ><!--
      --><Space :n="2" /><!--
      --><span class="white">{{ pKey }}: </span
      ><!--
      --><span class="atv">'{{ app.placeholders[pKey] }}'</span><span class="white">,</span
      ><br /><!--
    --></span
    ><!--
  --><Space />}"<br /><!-- 
  --></span
  ><!--
-->&gt;<!--
  --><br /><SlotsTemplate
    v-for="(__value, key) in modelSlot"
    :value="slots[key]"
    :key="key"
    :keyName="key"
  /><br v-show="isAnySlot" /><!--
--></template>

<script>
import Space from './space.vue'
import SlotsTemplate from './slots-template.vue'
import { ATTRIBUTES, SLOTS } from '../../../models/attributes/default.js'

export default {
  name: 'show-html-code__attributes-and-slots',
  components: {
    Space,
    SlotsTemplate
  },
  props: {
    app: {
      type: Object,
      default: () => {
        return {}
      }
    },
    slots: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {
      modelAttributes: ATTRIBUTES,
      modelSlot: SLOTS
    }
  },
  computed: {
    isAnySlot() {
      return Object.keys(this.modelSlot).some((key) => {
        const value = this.slots[key]
        return value != undefined && value != '' && value != this.modelSlot[key]
      })
    },
    isShowPlaceholders() {
      const placeholders = this.modelAttributes.placeholders
      const appPlaceholders = this.app.placeholders

      return Object.keys(placeholders).some(
        (key) => placeholders[key] !== appPlaceholders[key] && appPlaceholders[key] != ''
      )
    }
  }
}
</script>
