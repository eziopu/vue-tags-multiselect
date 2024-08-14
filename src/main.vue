<template>
  <div
    class="v-tags-multiselect"
    hidefocus="true"
    tabindex="0"
    ref="elApp"
    @focus="elAppFocus"
    @keydown="handleKeydown"
    @keyup="handleKeyup"
    @click="isEnable = true"
    :key="elAppKeyForRerender"
    :class="{
      active: isActive,
      disabled: disabled,
      loading: loading,
      ['v-tag-' + tagPosition]: isTagPositionVisible
    }"
  >
    <div class="v-tags-multiselect__tags overflow-tags" ref="elTags" v-if="isTagPositionVisible">
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
    
    <div class="v-tags-multiselect__main" :class="{
      emptyTag: isTagPositionVisible ? stashTag.key == null : tagsGroupByTitle.length == 0 && stashTag.key == null
    }">
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
            :class="{
              loading: loading || dropdownLoading,
              transition: transition
            }"
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

<script>
// components
import VTag from './components/tag/main.vue'
import PartialLoading from './components/partial/loading.vue'
import PartialClose from './components/partial/close.vue'
import VTagDropdown from './components/slots/v-dropdown.vue'
import VTagOption from './components/slots/v-option.vue'

// resolve
import resolve from './utils/resolve'
import useLog from './composables/useLog'
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

import { defineComponent } from 'vue'

export default defineComponent({
  name: 'v-tags-multiselect',
  emits: [
    'update:modelValue',
    // app
    'focus',
    'blur',
    'clear',
    'status',
    'input-value',
    // dropdown
    'visible-change',
    // tag
    'remove-tag',
    'selecting-tag'
  ],
  components: {
    VTag,
    PartialLoading,
    PartialClose,
    VTagDropdown,
    VTagOption
  },
  props: {
    disabled: { type: Boolean, default: false },
    loading: { type: Boolean, default: false },
    dropdownLoading: { type: Boolean, default: false },
    search: { type: Boolean, default: true },
    transition: { type: Boolean, default: true },
    create: { type: Boolean, default: true },
    clearable: { type: Boolean, default: true },
    merge: { type: Boolean, default: true },
    keyboard: { type: Boolean, default: true },
    conjunction: { type: String, default: '' }, // 'OR', 'AND'
    deleteIcon: { type: String, default: 'always' }, // 'always', 'edit', 'none'
    tagPosition: { type: String, default: '' }, // 'top', 'bottom'
    debugLog: { type: Boolean, default: false },
    /**
     * placeholder
     **/
    placeholders: { type: Object, default: () => {} },
    placeholder: { type: String, default: '' }
  },
  setup(props, context) {
    return resolve(props, context, [
      useLog,
      usePreprocessedData,
      useTag,
      useElInput,
      useApp,
      useSystemOption,
      useElDropdown,
      useStatus,
      useKeyboard,
      useClearable,
      useExposeSetTag,
      useExpose
    ])
  }
})
</script>

<style>
:root {
  --v-tags-multiselect__tag-spacing: 3px;
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

  .v-tags-multiselect__tags:not(.overflow-tags) .v-tag,
  .v-tags-multiselect__main--stashTag .v-tag {
    margin-top: var(--v-tags-multiselect__tag-spacing);
    margin-right: var(--v-tags-multiselect__tag-spacing);
  }

  .v-tags-multiselect__tags:not(.overflow-tags):not(:empty) {
    display: contents;
  }
  
  .v-tags-multiselect__tags.overflow-tags {
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
  &.disabled input {
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

  &.v-tag-top .overflow-tags {
    padding-bottom: 3px;
  }

  &.v-tag-bottom .overflow-tags {
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
    padding-left: 1em;
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
