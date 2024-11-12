<template>
  <div class="tool-toggle-switch">
    <label class="switch" :class="{ disabled: disabled }">
      <input type="checkbox" v-model="checked" />
      <span class="slider"></span>
    </label>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:modelValue'])

const checked = computed({
  get: () => props.modelValue,
  set: (value) => {
    emit('update:modelValue', value)
  }
})
</script>

<style scoped lang="scss">
.tool-toggle-switch {
  display: flex;
  user-select: none;
}

.switch.disabled {
  opacity: 0.5;
  pointer-events: none;
}

/* 
  Tooltip
  Source: https://www.w3schools.com/howto/howto_css_switch.asp
*/

$switch-width: 42px;
$switch-height: 20px;
$slider-before-width: ($switch-height * 0.8);
$slider-before-height: ($switch-height * 0.8);
$translateX-value: $switch-width - $slider-before-width - 5px;

.switch {
  position: relative;
  display: inline-block;
  width: $switch-width;
  height: $switch-height;
  margin: 0 !important;
}

/* Hide default HTML checkbox */
.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

/* The slider */
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

.slider:before {
  position: absolute;
  content: '';
  height: $slider-before-height;
  width: $slider-before-width;
  left: 2px;
  bottom: 2px;
  background-color: white;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

input:checked + .slider {
  background-color: #2196f3;
}

input:focus + .slider {
  box-shadow: 0 0 1px #2196f3;
}

input:checked + .slider:before {
  -webkit-transform: translateX($translateX-value);
  -ms-transform: translateX($translateX-value);
  transform: translateX($translateX-value);
}
</style>
