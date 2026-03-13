<template>
  <div
    class="v-tags-multiselect"
    hidefocus="true"
    tabindex="0"
    ref="elApp"
    @focus="elAppFocus"
    @keydown="handleKeydown"
    @click="isEnable = true"
    :key="elAppKeyForRerender"
    :class="{
      active: isActive,
      disabled: disabled,
      loading: loading,
      ['v-tag-' + tagPosition]: isTagPositionVisible
    }"
  >
    <div class="v-tags-multiselect__tags v-overflow-tags" ref="elTags" v-if="isTagPositionVisible">
      <VTag
        v-for="(tag, index) in merge == true
          ? tagsGroupByTitle
          : tags.filter((tag) => tag !== undefined)"
        ref="elTag"
        :key="`tag-${index}`"
        :tag="tag"
      >
        <template v-slot:tag-conjunction>
          <slot name="tag-conjunction"></slot>
        </template>
      </VTag>
    </div>

    <div
      class="v-tags-multiselect__main"
      :class="{
        emptyTag: isTagPositionVisible
          ? stashTag.key == null
          : tagsGroupByTitle.length == 0 && stashTag.key == null
      }"
    >
      <div
        class="v-tags-multiselect__main--tags v-tags-multiselect__tags"
        ref="elTags"
        v-if="!isTagPositionVisible"
      >
        <VTag
          v-for="(tag, index) in merge == true
            ? tagsGroupByTitle
            : tags.filter((tag) => tag !== undefined)"
          ref="elTag"
          :key="`tag-${index}`"
          :tag="tag"
        >
          <template v-slot:tag-conjunction>
            <slot name="tag-conjunction"></slot>
          </template>
        </VTag>
      </div>

      <div
        class="v-tags-multiselect__main--stashTag"
        ref="elStashTag"
        v-if="stashTag.key != null && isEditMode == false"
      >
        <VTag :tag="stashTag"> </VTag>
      </div>

      <div class="v-tags-multiselect__main--controls" ref="elControls">
        <Transition :name="transition ? 'slide' : ''">
          <div
            class="v-tags-multiselect__main--dropdowns"
            v-show="isElDropdownVisible"
            ref="elDropdown"
            :style="elDropdownStyle"
            :class="[
              stashTag.classList,
              {
                loading: loading || dropdownLoading,
                transition: transition,
                stash: stashTag.key != null && isEditMode == false
              }
            ]"
          >
            <div
              v-show="loading == true || dropdownLoading == true"
              class="v-dropdowns__loading"
              :tabindex="-1"
            >
              <slot name="dropdown-loading">
                <slot name="loading">
                  <PartialLoading></PartialLoading>
                </slot>
              </slot>
            </div>

            <VTagDropdown system>
              <VTagOption v-if="isUndoOptionVisible" class="undo">
                <!-- :divided="optionDisplayCount != 0" -->
                <div @click="elOptionUndo()">
                  <slot name="option-undo"> <i class="v-option__undo--arrow-left"></i>Undo </slot>
                </div>
              </VTagOption>
              <VTagOption v-if="isORConjunctionOptionVisible" class="conjunction">
                <!-- :divided="haveOptionCanSelect" -->
                <div @click="elOptionORConjunction()">
                  <slot name="option-OR-conjunction">OR</slot>
                </div>
              </VTagOption>
            </VTagDropdown>

            <VTagDropdown
              v-for="(dropdown, key) in processedOptions"
              class="data-dropdown"
              :key="`data_${key}`"
              :disabled="dropdown.disabled"
              :divided="dropdown.divided"
              :displayAll="dropdown.displayAll"
              :hidden="dropdown.hidden"
              :custom="dropdown.custom"
              :value="dropdown.value"
              :class="dropdown.class"
            >
              <VTagOption
                v-for="(option, value_key) in dropdown.values"
                class="data-option"
                :key="`data_${value_key}`"
                :title="option.title"
                :displayValue="option.displayValue"
                :disabled="option.disabled"
                :divided="option.divided"
                :selected="option.selected"
                :value="option.value"
                :class="option.class"
              >
                <div v-html="option.element"></div>
              </VTagOption>
            </VTagDropdown>

            <slot></slot>
          </div>
        </Transition>

        <div class="v-tags-multiselect__main--fill">
          <div
            v-show="loading == true"
            class="v-tags-multiselect__main--fill__loading"
            ref="loading"
          >
            <slot name="loading">
              <PartialLoading></PartialLoading>
            </slot>
          </div>

          <input
            v-model="elInputValue"
            ref="elInput"
            autocomplete="off"
            tabindex="0"
            type="search"
            @focus="elInputFocus"
            @blur="elInputBlur"
            :maxlength="elInputMaxlength"
            :placeholder="elInputPlaceholder"
          />

          <PartialClose v-show="isClearableVisible" @click="clear" class="v-tags-clear">
          </PartialClose>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// components
import VTag from './components/tag/main.vue'
import PartialLoading from './components/partial/loading.vue'
import PartialClose from './components/partial/close.vue'
import VTagDropdown from './components/slots/v-dropdown.vue'
import VTagOption from './components/slots/v-option.vue'

// composables
import type { PropType } from 'vue'
import type { PlaceholdersModel, OptionsInput } from './types'
import useLog from './composables/useLog'
import useProcessOptions from './composables/useProcessOptions'
import usePreprocessedData from './composables/usePreprocessedData'
import useTag from './composables/useTag'
import useElInput from './composables/useElInput'
import useApp from './composables/useApp'
import useElDropdown from './composables/useElDropdown'
import useSystemOption from './composables/useSystemOption'
import useStatus from './composables/useStatus'
import useKeyboard from './composables/useKeyboard'
import useExposeSetTag from './composables/useExposeSetTag'
import useExpose from './composables/useExpose'
import useClearable from './composables/useClearable'

defineOptions({ name: 'v-tags-multiselect' })

const props = defineProps({
  disabled: { type: Boolean as PropType<boolean>, default: false },
  loading: { type: Boolean as PropType<boolean>, default: false },
  dropdownLoading: { type: Boolean as PropType<boolean>, default: false },
  search: { type: Boolean as PropType<boolean>, default: true },
  transition: { type: Boolean as PropType<boolean>, default: true },
  create: { type: Boolean as PropType<boolean>, default: true },
  clearable: { type: Boolean as PropType<boolean>, default: true },
  merge: { type: Boolean as PropType<boolean>, default: true },
  keyboard: { type: Boolean as PropType<boolean>, default: true },
  conjunction: { type: String as PropType<string>, default: '' },
  deleteIcon: { type: String as PropType<string>, default: 'always' },
  tagPosition: { type: String as PropType<string>, default: '' },
  debugLog: { type: Boolean as PropType<boolean>, default: false },
  placeholders: { type: Object as PropType<Partial<PlaceholdersModel>>, default: () => ({}) },
  placeholder: { type: String as PropType<string>, default: '' },
  options: { type: [Object, Array] as PropType<OptionsInput>, default: () => ({}) },
})

const emit = defineEmits<{
  'update:modelValue': [value: any]
  focus: []
  blur: []
  clear: []
  status: [value: string[]]
  'input-value': [value: any]
  'visible-change': [value: any]
  'remove-tag': [value: any]
  'selecting-tag': [value: any]
}>()

const propsRaw = props as Record<string, unknown>

// ============== Composable chain ==============

const { log, log2, log3 } = useLog(propsRaw)

const { dropdownStatus, isAllDropdownIsDown, isAllDropdownIsHidden, isPassTagInputBlur, appIsLock, appIsFinish } = usePreprocessedData(propsRaw)

const { processedOptions } = useProcessOptions(propsRaw, { log })

const { tags, stashTag, isEditMode, editTagIndex, tagsGroupByKey, tagsGroupByTitle, updateTag, deleteTags, setStashTag, setTagToTags, isDuplicateTag } = useTag(emit, { log, log2 })

const { elInput, elInputValue, elInputMaxlength, elInputPlaceholder } = useElInput(propsRaw, emit, { tags, stashTag, appIsLock, appIsFinish, isAllDropdownIsDown })

const { elApp, elControls, elTags, isActive, isEnable, focusReInit, conjunction: appConjunction, keydown, isTagPositionVisible, init, elInputFocus, elInputBlur, focusApp, elAppFocus, isActiveElementContainApp } = useApp(propsRaw, emit, { elInput, editTagIndex, elInputValue, log, log2, setStashTag })

const { isUndoOptionVisible, isORConjunctionOptionVisible, elOptionUndo, elOptionORConjunction } = useSystemOption({ tagsGroupByTitle, stashTag, focusReInit, elInputValue, conjunction: appConjunction, dropdownStatus, isEditMode, tagsGroupByKey, isAllDropdownIsDown, setStashTag, elAppFocus, log })

const { elDropdown, elDropdownStyle, isElDropdownVisible } = useElDropdown(propsRaw, emit, { isActive, editTagIndex, stashTag, dropdownStatus, isAllDropdownIsDown, isAllDropdownIsHidden, isUndoOptionVisible, isORConjunctionOptionVisible, elApp, elControls })

useStatus(propsRaw, emit, { elInputValue, isEditMode, isElDropdownVisible, appIsFinish, isAllDropdownIsDown, log })

const { handleKeydown } = useKeyboard(propsRaw, { focusApp, tags, tagsGroupByTitle, conjunction: appConjunction, keydown, elInputValue, isEditMode, stashTag, setTagToTags, elDropdown, elTags, appIsLock, setStashTag, deleteTags, log, init, isPassTagInputBlur, isActiveElementContainApp, focusReInit, editTagIndex, isUndoOptionVisible, isORConjunctionOptionVisible, elOptionUndo, elOptionORConjunction })

const { isClearableVisible, clear } = useClearable(propsRaw, emit, { tags, tagsGroupByTitle, elInputValue, isEditMode, init, log })

const { pushTag } = useExposeSetTag(propsRaw, { appIsLock, dropdownStatus, isEditMode, stashTag, focusApp, updateTag, isDuplicateTag, setStashTag, setTagToTags, tagsGroupByKey, log, log3 })

const { elAppKeyForRerender, exposed } = useExpose({ init, isActive, elInputValue, tags, pushTag })
defineExpose(exposed)
</script>

<style>
:root {
  --v-tags-multiselect__tag-spacing: 3px;
}
</style>

<style lang="scss">
.v-tags-multiselect {
  .v-tags-multiselect__main--dropdowns .v-hidden-in-dropdown {
    display: none;
  }

  .v-tags-multiselect__tags .v-hidden-in-tag,
  .v-tags-multiselect__main--stashTag .v-hidden-in-tag {
    display: none;
  }
}
</style>

<style scoped lang="scss">
.v-tags-multiselect {
  // tag spacing
  .v-tags-multiselect__main {
    padding-left: var(--v-tags-multiselect__tag-spacing);
    padding-bottom: var(--v-tags-multiselect__tag-spacing);
    &.emptyTag {
      padding-top: var(--v-tags-multiselect__tag-spacing);
    }
    &:not(.emptyTag) .v-tags-multiselect__main--controls {
      margin-top: var(--v-tags-multiselect__tag-spacing);
    }
  }

  .v-tags-multiselect__tags:not(.v-overflow-tags) .v-tag,
  .v-tags-multiselect__main--stashTag .v-tag {
    margin-top: var(--v-tags-multiselect__tag-spacing);
    margin-right: var(--v-tags-multiselect__tag-spacing);
  }

  .v-tags-multiselect__tags:not(.v-overflow-tags):not(:empty) {
    display: contents;
  }

  .v-tags-multiselect__tags.v-overflow-tags {
    display: flex;
    flex-wrap: wrap;
    gap: var(--v-tags-multiselect__tag-spacing);
  }

  .v-tags-multiselect__main {
    display: flex;
    flex-wrap: wrap;
    position: relative;
    border: 1px solid #22242626;
    text-align: left;
    cursor: text;
    min-width: 0;
    min-height: 24px;
  }

  &.disabled,
  &.disabled input,
  &.disabled .v-tags-clear {
    cursor: not-allowed !important;
  }

  &.loading,
  &.loading input,
  &.loading .v-tags-multiselect__main {
    cursor: wait !important;
  }

  &[class*='v-tag-bottom'] {
    display: flex;
    flex-direction: column-reverse;
  }

  .v-tags-multiselect__main--controls {
    & {
      display: flex;
      align-items: center;
      position: relative;
      width: 100%;
      flex: 1;
    }

    .v-tags-multiselect__main--fill {
      flex-grow: 1;
      display: flex;
      align-items: center;
    }
  }

  &.v-tag-top .v-overflow-tags {
    padding-bottom: 3px;
  }

  &.v-tag-bottom .v-overflow-tags {
    padding-top: 3px;
  }

  input {
    position: static;
    padding: 0;
    margin-left: 4.8px !important;
    cursor: text;
    background: none transparent !important;
    border: none !important;
    box-shadow: none !important;
    overflow: visible;
    width: 100%;
    min-width: 120px;
    min-height: 20px;

    &:focus {
      outline: none;
    }
  }

  .v-tags-multiselect__main--dropdowns {
    position: absolute;
    border: 1px solid #22242626;
    background-color: white;
    overflow: hidden;
    z-index: 11;
    top: 90%;

    &.loading {
      cursor: wait !important;
    }

    &:empty {
      display: none;
      border: none !important;
    }

    &.transition {
      transition: all 0.3s ease-in-out;
      transform-origin: top;
    }

    .v-dropdowns__loading {
      display: flex;
      align-items: center;
      justify-content: center;
      position: absolute;
      width: 100%;
      height: 100%;
      background: #f2f2f2a1;
      z-index: 1;
    }
  }

  .v-option__undo--arrow-left {
    border: solid black;
    border-width: 0 3px 3px 0;
    display: inline-block;
    padding: 4px;
    transform: rotate(135deg);
    -webkit-transform: rotate(135deg);
  }

  .v-tags-clear {
    cursor: pointer;
    padding-right: 3px;
    transform: scale(0.8);
  }

  .loading:not(.v-tags-multiselect):not(.v-tags-multiselect__main--dropdowns) {
    display: flex;
    align-items: center;
  }

  .slide-enter,
  .slide-leave-to {
    transform: scaleY(0);
  }

  /* clears the ‘X’ from Internet Explorer */
  input[type='search']::-ms-clear {
    display: none;
    width: 0;
    height: 0;
  }
  input[type='search']::-ms-reveal {
    display: none;
    width: 0;
    height: 0;
  }
  /* clears the ‘X’ from Chrome */
  input[type='search']::-webkit-search-decoration,
  input[type='search']::-webkit-search-cancel-button,
  input[type='search']::-webkit-search-results-button,
  input[type='search']::-webkit-search-results-decoration {
    display: none;
  }
}
</style>
