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
    :class="{ active: isActive, disabled: disabled, loading: loading, ['tag-'+tagPosition] :isTagPositionVisible }"
  >
    <div
      class="v-tags-multiselect__tags overflow-tags"
      ref="elTags" v-if="isTagPositionVisible"
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
    <div class="v-tags-multiselect__main">
      <div
        class="v-tags-multiselect__main--tags v-tags-multiselect__tags"
        ref="elTags" v-if="!isTagPositionVisible"
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
        <Transition :name="transition ? 'dropdown' : ''">
          <div
            class="v-tags-multiselect__main--dropdowns"
            v-show="isElDropdownVisible"
            ref="elDropdown"
            :style="elDropdownStyle"
            :class="{
              loading: loading || dropdownLoading,
              transition: transition,
            }"
          >
            <div
              v-show="loading == true || dropdownLoading == true"
              class="dropdowns__loading"
              :tabindex="-1"
            >
              <slot name="dropdowns-loading">
                <slot name="loading">
                  <Loading></Loading>
                </slot>
              </slot>
            </div>

            <VTagDropdown system>
              <VTagOption v-if="isUndoOptionVisible" class="undo">
                <!-- :divided="optionDisplayCount != 0" -->
                <div @click="elOptionUndo()">
                  <slot name="option-undo">
                    <i class="option__undo--arrow-left"></i>Undo
                  </slot>
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

        <div class="fill" ref="elFill__div">
          <div v-show="loading == true" class="fill__loading" ref="loading">
            <slot name="loading">
              <Loading></Loading>
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
            :disabled="elInputDisabled"
            :maxlength="elInputMaxlength"
            :placeholder="elInputPlaceholder"
          />
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import VTag from "./components/tag/main.vue";
import Loading from "./components/partial/loading.vue";
import VTagDropdown from "./components/slots/v-dropdown.vue";
import VTagOption from "./components/slots/v-option.vue";

import resolve from "./utils/resolve";
import useLog from "./composables/useLog";
import usePreprocessedData from "./composables/usePreprocessedData";
import useTag from "./composables/useTag";
import useElInput from "./composables/useElInput";
import useApp from "./composables/useApp";
import useElDropdown from "./composables/useElDropdown";
import useSystemOption from "./composables/useSystemOption";
import useStatus from "./composables/useStatus";
import useKeyboard from "./composables/useKeyboard";
import useMethodSetTag from "./composables/useMethodSetTag";

import { defineComponent } from "vue";

export default defineComponent({
  name: "v-tags-multiselect",
  emits: [
    "update:modelValue",
    "status",
    "edit",
    "inputValue",
    "keydown",
    "keyup",
    "selectingTag",
  ],

  components: {
    VTag,
    Loading,
    VTagDropdown,
    VTagOption,
  },
  props: {
    disabled: { type: Boolean, default: false },
    loading: { type: Boolean, default: false },
    dropdownLoading: { type: Boolean, default: false },
    search: { type: Boolean, default: true },
    transition: { type: Boolean, default: true },
    create: { type: Boolean, default: true },
    merge: { type: Boolean, default: true },
    keyboard: { type: Boolean, default: true },
    conjunction: { type: String, default: "" }, // 'OR', 'AND'
    deleteIcon: { type: String, default: "always" }, // 'always', 'edit', 'none'
    tagPosition: { type: String, default: "" }, // 'top', 'bottom'
    debugLog: { type: Boolean, default: false },
    /**
     * placeholder
     **/
    placeholders: { type: Object, default: () => {} },
    placeholder: { type: String, default: "" },
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
      useMethodSetTag,
    ]);
  },
});
</script>

<style scoped lang="scss">
.v-tags-multiselect {
  .v-tags-multiselect__main {
    display: flex;
    flex-wrap: wrap;
    position: relative;
    border: 1px solid rgba(34, 36, 38, 0.15);
    text-align: left;
    cursor: text;
    min-width: 0;
    min-height: 30px;
    padding: 0 0.2em;
    padding-right: 0.8em;
  }
  &.disabled,
  &.disabled input {
    cursor: no-drop !important;
  }

  &.loading,
  &.loading input {
    cursor: wait !important;
  }
  &.tag-bottom {
    display: flex;
    flex-direction: column-reverse;
  }

  .v-tags-multiselect__main--controls {
    & {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      position: relative;
      width: 100%;
      flex: 1;
      // overflow: hidden;
    }

    .fill {
      flex-grow: 1;
      display: flex;
      align-items: center;
    }
  }

  input {
    position: static;
    padding: 0;
    margin: 0.2em;
    margin-left: 0.14em !important;
    cursor: text;
    background: none transparent !important;
    border: none !important;
    box-shadow: none !important;
    overflow: visible;
    width: 100%;

    &:focus {
      outline: none;
    }
  }

  .v-tags-multiselect__main--dropdowns {
    position: absolute;
    border: 1px solid rgba(34, 36, 38, 0.15);
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

    .dropdowns__loading {
      display: flex;
      align-items: center;
      justify-content: center;
      position: absolute;
      width: 100%;
      height: 100%;
      background: rgb(242 242 242 / 63%);
      z-index: 1;
    }
  }

  .option__undo--arrow-left {
    border: solid black;
    border-width: 0 3px 3px 0;
    display: inline-block;
    padding: 4px;
    transform: rotate(135deg);
    -webkit-transform: rotate(135deg);
  }

  .loading:not(.v-tags-multiselect):not(.v-tags-multiselect__main--dropdowns) {
    display: flex;
    align-items: center;
  }

  .transition {
    transition: all 0.3s ease;
  }

  .dropdown-enter-active,
  .dropdown-leave-active {
    animation: growDown 300ms ease-in-out forwards;
    transform-origin: top center;
  }

  .dropdown-enter,
  .dropdown-leave-to {
    animation: growUP 300ms ease-in-out forwards;
    transform-origin: top center;
  }

  @keyframes growDown {
    0% {
      transform: scaleY(0);
    }
    80% {
      transform: scaleY(1.1);
    }
    100% {
      transform: scaleY(1);
    }
  }

  @keyframes growUP {
    0% {
      transform: scaleY(1);
    }
    100% {
      transform: scaleY(0);
    }
  }
}
</style>
