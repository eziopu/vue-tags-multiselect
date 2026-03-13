<template>
  <div
    class="v-dropdown"
    ref="elDropdown"
    :class="{
      'no-title': !hasVNodeTitle,
      'display-all': myDisplayAll,
      disabled: props.disabled,
      divided: props.divided,
      selecting: isSelecting,
      editing: isChildEditing,
      hidden: isHidden,
    }"
  >
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { vDropdownProps } from './models'
import useDropdown from './composables/useDropdown'

defineOptions({ name: 'v-dropdown' })

const props = defineProps(vDropdownProps())

const {
  elDropdown,
  myDisplayAll,
  hasVNodeTitle,
  isHidden,
  isSelecting,
  isChildEditing,
} = useDropdown(props as Record<string, unknown>)
</script>

<style scoped lang="scss">
.v-dropdown {
  &.hidden {
    display: none;
  }
  &.divided {
    border-top: 1px solid #22242626;
  }
  &.disabled {
    cursor: not-allowed;
  }
}
</style>
