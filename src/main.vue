<template>
  <div
    class="vue-tags-multiselect"
    hidefocus="true"
    tabindex="0"
    ref="elApp"
    @focus="elAppFocus"
    @keydown="handleKeydown"
    @keyup="handleKeyup"
    @click="isAppActived = true"
    :class="{ active: isActive, disabled: disabled, loading: loading }"
  >
    <!-- <div class="logs" style="width: 100%">
      elDropdownLeft = {{ elDropdownLeft }} <br />
      transition = {{ transition }}

      tags = 
    <pre>
      {{ tags }}
    </pre>
    </div>
  -->

    <!-- @blur="inputDisabled ? inputBlur() : false" -->
    <div class="tags" ref="elTags">
      <VTag
        v-for="(tag, index) in merge == true ? tagsGroupByTitle : tags"
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
      class="stashTag"
      ref="elStashTag"
      v-if="stashTag.key != null && isEditMode == false"
    >
      <VTag :tag="stashTag"> </VTag>
    </div>

    <div class="main" ref="elMain">
      <Transition :name="transition ? 'dropdown' : ''">
        <div
          class="dropdowns"
          v-show="isElDropdownVisible"
          ref="elDropdown"
          :style="{ left: `${elDropdownLeft}px` }"
          :class="{ loading: loading || dropdownLoading }"
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
</template>

<script lang="ts">
import VTag from "./components/tag/main.vue";
import Loading from "./components/partial/loading.vue";
import VTagDropdown from "./components/slots/v-dropdown.vue";
import VTagOption from "./components/slots/v-option.vue";

// import EmitOutput from "./mixins/emits/output";
// import EmitGetStatus from "./mixins/emits/get-status";
// import EmitGetEditing from "./mixins/emits/get-editing";
// import EmitGetInputValue from "./mixins/emits/get-input-value";
// import EmitGetSelectingKey from "./mixins/emits/get-selecting-key";

// import RefOperatePushValue from "./mixins/ref-operates/push-value";
import resolve from "./utils/resolve";
import usePreprocessedData from "./composables/usePreprocessedData";
import useTag from "./composables/useTag";
import useElInput from "./composables/useElInput";
import useApp from "./composables/useApp";
import useElDropdown from "./composables/useElDropdown";
import useSystemOption from "./composables/useSystemOption";
import useStatus from "./composables/useStatus";
import useKeyboard from "./composables/useKeyboard";

import { defineComponent } from "vue";

export default defineComponent({
  name: "v-tags-multiselect",
  emits: ["update:modelValue", "status", "edit", "inputValue", "keydown", "keyup", "selectingTag"],
  // mixins: [
  //   EmitOutput,
  //   EmitGetStatus,
  //   EmitGetEditing,
  //   EmitGetInputValue,
  //   EmitGetSelectingKey,
  //   RefOperatePushValue,
  // ],
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
    conjunction: { type: String, default: "" }, // 'OR', 'AND'
    deleteIcon: { type: String, default: "always" }, // 'always', 'edit', 'none'
    /**
     * placeholder
     **/
    placeholders: { type: Object, default: () => {} },
    placeholder: { type: String, default: "" },
    // loadingPlaceholder: { type: String, default: "Wait a moment, please." },
    // selectDownPlaceholder: { type: String, default: "Selected End." },
    // finishPlaceholder: { type: String, default: "Finish." },
  },
  setup(props, context) {
    return resolve(props, context, [
      usePreprocessedData,
      useTag,
      useElInput,
      useApp,
      useElDropdown,
      useSystemOption,
      useStatus,
      useKeyboard,
    ]);
  },
});
</script>

<style scoped lang="scss">
.vue-tags-multiselect {
  & {
    display: flex;
    flex-wrap: wrap;
    position: relative;
    border: 1px solid rgba(34, 36, 38, 0.15);
    text-align: left;
    cursor: text;
    min-width: 0;
    padding: 0 0.2em;
    padding-right: 0.8em;

    &.disabled,
    &.disabled input {
      cursor: no-drop !important;
    }

    &.loading,
    &.loading input {
      cursor: wait !important;
    }
  }
  .main {
    & {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      position: relative;
      // overflow: hidden;
    }

    .fill {
      & {
        flex-grow: 1;
        display: flex;
        align-items: center;
      }

      .fill__fake-input {
        & {
          margin-left: 4px;
          position: relative;
        }

        .fill__fake-input--line {
          border-right: 1px solid black;
          margin-left: -1px;
          height: 20px;
          animation: focus 1.2s infinite;
        }
        .fill__fake-input--placeholder .select-down {
          position: absolute;
          opacity: 0;
          color: #757575;
          bottom: -10px;
          white-space: nowrap;
          animation: flickerAnimation 1.2s infinite;
          animation-iteration-count: 2;
        }
      }
      @keyframes flickerAnimation {
        0% {
          opacity: 0;
        }
        50% {
          opacity: 1;
        }
        100% {
          opacity: 0;
        }
      }

      @keyframes focus {
        0% {
          opacity: 1;
        }
        49% {
          opacity: 1;
        }
        50% {
          opacity: 0;
        }
        100% {
          opacity: 0;
        }
      }
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

  .dropdowns {
    position: absolute;
    border: 1px solid rgba(34, 36, 38, 0.15);
    background-color: white;
    overflow: hidden;
    z-index: 11;
    top: 90%;
    transition: all 0.3s ease;

    &.loading {
      cursor: wait !important;
    }

    &:empty {
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

  .loading:not(.vue-tags-multiselect):not(.dropdowns) {
    display: flex;
    align-items: center;
  }

  // .transition {
  //   transition: transform 0.3s ease-in-out;
  // }

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
