<template>
  <div
    class="v-option"
    ref="elOption"
    :class="{
      title: props.title == true,
      disabled: isDisabled,
      divided: props.divided,
      hover: isHover,
      'no-value': props.value == undefined || props.value == '',
      hidden: isDuplicateOption || isHidden,
    }"
    @mouseover="isHover = true"
    @mouseleave="isHover = false"
    @click="handleClick"
    :aria-disabled="isDisabled"
    :tabindex="isDisabled ? 0 : -1"
    collapse="false"
  >
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { vOptionProps } from './models'
import useSetTag from './composables/useSetTag'
import useSearch from './composables/useSearch'
import useOption from './composables/useOption'
import useRegistration from './composables/useRegistration'

defineOptions({ name: 'v-option' })

const props = defineProps(vOptionProps())
const emit = defineEmits<{ click: [event?: Event] }>()
const propsRaw = props as Record<string, unknown>

const { elOption, innerHTML, handleClick } = useSetTag(propsRaw, emit, {} as any)
const { isCanSearch, isSearchable } = useSearch(propsRaw, { innerHTML })
const { isDisabled, isSelected, isHover, isHidden } = useOption(propsRaw, { isCanSearch, isSearchable, handleClick })
const { isDuplicateOption } = useRegistration(propsRaw, { elOption, isHidden, isSelected, isSearchable })
</script>

<style scoped lang="scss">
.v-option {
  padding: 8px 18px;
  height: auto;
  text-align: left;
  cursor: pointer;
  visibility: visible;
  opacity: 1;

  &.title {
    padding-left: 9px;
  }

  &.disabled {
    cursor: default;
    pointer-events: none;
    opacity: 0.45;
  }

  &.divided {
    border-top: 1px solid #22242626;
  }

  &.hover {
    background: #f2f2f2;
  }

  &.hidden {
    height: 0 !important;
    width: 0 !important;
    padding: 0 !important;
    visibility: hidden;
    opacity: 0;
    transform: scaleY(0);
  }
}
</style>
