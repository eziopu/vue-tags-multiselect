<!-- eslint-disable prettier/prettier -->
<template>
  <!--
  --><span
    v-for="(value, key) in Object.fromEntries(
      Object.entries(modelAttributes).filter(([key, __value]) => key !== 'placeholders')
    )"
    v-show="app[key] != value"
    :key="key"
    ><Space /><span class="pln">:</span><span class="atn">{{ key }}</span
    ><span class="pun">=</span><span class="atv">"{{ app[key] }}"</span><br /></span
  ><!--

  --><span v-show="isAnyPlaceholders"
    ><!--
    --><Space /><!--
    --><span class="pln">:</span><span class="atn">placeholders</span
    ><span class="pun">=</span>"{<br /><!--
    --><span
      v-for="(pValue, pKey) in modelAttributes.placeholders"
      :key="pKey"
      v-show="app.placeholders[pKey] != pValue && verify(app.placeholders[pKey])"
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
    v-for="(value, key) in modelSlot"
    v-show="isShowSlot(slots[key], key)"
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
        return this.isShowSlot(value, key)
      })
    },
    isAnyPlaceholders() {
      return Object.keys(this.modelAttributes.placeholders).some((key) =>
        this.isShowPlaceholder(this.app.placeholders[key], key)
      )
    }
  },
  methods: {
    verify(value) {
      return value != '' && value != undefined
    },
    isShowSlot(value, key) {
      return this.verify(value) && value != this.modelSlot[key]
    },
    isShowPlaceholder(value, key) {
      return this.verify(value) && value != this.modelAttributes.placeholders[key]
    }
  }
}
</script>
