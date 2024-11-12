<template>
  <div class="attribute flex tool-attribute" :class="model">
    <div v-if="label" class="tool-attribute__label">
      {{ label }}<span class="tool-attribute__label--colon">:</span>
    </div>
    <div class="tool-attribute__operate" :class="{ 'tool-tooltip': $slots.tooltip }">
      <template v-if="model == 'select' && JSON.stringify(options) === JSON.stringify(['true', 'false'])">
        <ToggleSwitch v-model="newValue" :disabled="disabled" />
      </template>
      <template v-if="model == 'select' && JSON.stringify(options) !== JSON.stringify(['true', 'false'])">
        <select
          v-model="newValue"
          class="tool-attribute__select"
          :disabled="disabled"
          :style="{ width: width }"
        >
          <option v-for="item in options" :key="item">
            {{ item }}
          </option>
        </select>
      </template>
      
      <template v-if="model == 'input'">
        <div class="ui input tool-attribute__input">
          <div
            class="tool-attribute__input--fake-placeholder"
            :class="[framework, { active: isActive }]"
            v-show="newValue == ''"
          >
            <slot name="fake-placeholder"></slot>
          </div>
          <input
            v-model="newValue"
            class="form-control"
            :style="{ width: width }"
            :type="text"
            :disabled="disabled"
            :placeholder="placeholder"
            @focus="isActive = true"
            @blur="isActive = false"
          />
        </div>
      </template>
  
      <span class="tool-tooltip__text">
        <slot name="tooltip"></slot>
      </span>
    </div>
  </div>
</template>

<script setup>
import { ref, inject, computed } from 'vue';
import { defineProps, defineEmits } from 'vue';
import ToggleSwitch from './toggle-switch.vue';

const props = defineProps({
  disabled: { type: Boolean, default: false },
  label: { type: String, default: '' },
  modelValue: { type: [String, Boolean], default: '' },
  model: { type: String, default: 'select' },
  text: { type: String, default: 'text' },
  placeholder: { type: String, default: '' },
  width: { type: String, default: 'auto' },
  values: { type: Array, default: () => [] }
});

const emit = defineEmits(['update:modelValue']);
const framework = inject('framework');
const isActive = ref(false);

const newValue = computed({
  get: () => props.modelValue,
  set: (value) => {
    emit('update:modelValue', toBoolean(value));
  }
});

const options = computed(() => (props.values.length > 0 ? props.values : ['true', 'false']));

/**
 * Converts given value to boolean type.
 * @param {String|Boolean} value - value to convert
 * @returns {Boolean} - converted boolean value
 */
function toBoolean(value) {
  if (value === 'true' || value === true) return true;
  if (value === 'false' || value === false) return false;
  return value;
}
</script>

<style scoped lang="scss">
.tool-attribute {
  flex-flow: wrap;
}

.tool-attribute__label--colon {
  margin: 0 0.3rem;
}

.tool-attribute__input {
  position: relative;
}

.tool-attribute__select:disabled,
.tool-attribute__input input[disabled] {
  cursor: not-allowed !important;
}

.tool-attribute__inpput {
  position: relative;
  flex: 1 1 auto;
}

.tool-attribute__input--fake-placeholder {
  position: absolute;
  top: 50%;
  user-select: none;
  pointer-events: none;
  transform: translate(0%, -50%);
  color: #6c757d;

  display: flex;
  align-items: center;

  &.default {
    padding-left: 0.3rem;
  }
  &.bootstrap {
    padding-left: 0.9rem;
  }
  &.semantic-ui {
    padding-left: 1.1rem;
    opacity: 0.6;
    &.active {
      opacity: 1;
    }
  }
}
</style>
