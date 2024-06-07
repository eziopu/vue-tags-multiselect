<!-- eslint-disable prettier/prettier -->
<template><!--
  --><span v-show="equality(app.disabled, true)"><Space /><span class="pln">:</span><span class="atn">disabled</span><span class="pun">=</span><span class="atv">"{{ app.disabled }}"</span><br></span><!--
  --><span v-show="equality(app.loading, true)"><Space /><span class="pln">:</span><span class="atn">loading</span><span class="pun">=</span><span class="atv">"{{ app.loading }}"</span><br></span><!--
  --><span v-show="equality(app.dropdownLoading, true)"><Space /><span class="pln">:</span><span class="atn">dropdownLoading</span><span class="pun">=</span><span class="atv">"{{ app.dropdownLoading }}"</span><br></span><!--
  --><span v-show="equality(app.search, false)"><Space /><span class="pln">:</span><span class="atn">search</span><span class="pun">=</span><span class="atv">"{{ app.search }}"</span><br></span><!--
  --><span v-show="equality(app.transition, false)"><Space /><span class="pln">:</span><span class="atn">transition</span><span class="pun">=</span><span class="atv">"{{ app.transition }}"</span><br></span><!--
  --><span v-show="equality(app.create, false)"><Space /><span class="pln">:</span><span class="atn">create</span><span class="pun">=</span><span class="atv">"{{ app.create }}"</span><br></span><!--
  --><span v-show="equality(app.clearable, true)"><Space /><span class="pln">:</span><span class="atn">clearable</span><span class="pun">=</span><span class="atv">"{{ app.clearable }}"</span><br></span><!--
  --><span v-show="equality(app.merge, false)"><Space /><span class="pln">:</span><span class="atn">merge</span><span class="pun">=</span><span class="atv">"{{ app.merge }}"</span><br></span><!--
  --><span v-show="equality(app.keyboard, false)"><Space /><span class="pln">:</span><span class="atn">keyboard</span><span class="pun">=</span><span class="atv">"{{ app.keyboard }}"</span><br></span><!--
  --><span v-show="equality(app.debugLog, true)"><Space /><span class="pln">:</span><span class="atn">debugLog</span><span class="pun">=</span><span class="atv">"{{ app.debugLog }}"</span><br></span><!--
  --><span v-show="verify(app.deleteIcon) && app.deleteIcon != 'always'"><Space /><span class="pln">:</span><span class="atn">deleteIcon</span><span class="pun">=</span><span class="atv">"{{ app.deleteIcon }}"</span><br></span><!--
  --><span v-show="verify(app.conjunction)"><Space /><span class="pln">:</span><span class="atn">conjunction</span><span class="pun">=</span><span class="atv">"{{ app.conjunction }}"</span><br></span><!--
  --><span v-show="verify(app.tagPosition)"><Space /><span class="pln">:</span><span class="atn">tagPosition</span><span class="pun">=</span><span class="atv">"{{ app.tagPosition }}"</span><br></span><!--
  --><span v-show="verifyText(app.placeholder)"><Space /><span class="pln">:</span><span class="atn">placeholder</span><span class="pun">=</span><span class="atv">"{{ app.placeholder }}"</span><br></span><!--
  --><span v-show="Object.values(cleanedObject(app.placeholders)).length != 0"><!--
    --><Space /><!--
    --><span class="pln">:</span><span class="atn">placeholders</span><span class="pun">=</span>"{<br><!--
    --><span v-for="(value, key) in cleanedObject(app.placeholders)" :key="key"><!--
      --><Space :n="2"/><!--
      --><span class="white">{{ key }}: </span><!--
      --><span class="atv">'{{ value }}'</span><span class="white">,</span><br><!--
    --></span><!--
  --><Space />}"<br><!-- 
  --></span><!--
-->&gt;<!--
  --><br><SlotsTemplate v-for="slotKey in slotKeise"
    :value="slots[slotKey]"
    :key="slotKey"
    :keyName="slotKey"
  /><br v-show="isAnySlot"><!--
--></template>

<script>
import Space from "./space.vue";
import SlotsTemplate from "./slots-template.vue";

export default {
  name: "show-html-code__attributes-and-slots",
  components: {
    Space,
    SlotsTemplate,
  },
  props: {
    app: {
      type: Object,
      default: () => {
        return {};
      },
    },
    slots: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  data() {
    return {
      slotKeise: [
        "tagConjunction",
        "loading",
        "optionUndo",
        "optionORConjunction",
        "dropdownLoading",
      ],
    };
  },
  computed: {
    isAnySlot() {
      let result = false;
      this.slotKeise.forEach(slotKey => {
        if (this.slots[slotKey] != undefined && this.slots[slotKey] != "") {
          result = true
        }
      });
      return result;
    },
  },
  methods: {
    verify(value) {
      return this.verifyText(value) && value != "null";
    },
    verifyText(value) {
      return value != "" && value != undefined;
    },
    cleanedObject(obj = {}) {
      return Object.fromEntries(
        Object.entries(obj).filter(
          // eslint-disable-next-line no-unused-vars
          ([_, v]) => v != undefined && v != null && v != "" && v != []
        )
      );
    },
    equality(value, ans) {
      let newValue = value;
      if (value === "true") {
        newValue = true;
      }
      if (value === "false") {
        newValue = false;
      }
      return newValue == ans;
    },
  },
};
</script>
