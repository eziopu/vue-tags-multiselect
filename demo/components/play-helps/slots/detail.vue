<script>
export default {
  name: 'play-slots-detail'
}
</script>
<script setup>
import { inject, getCurrentInstance } from 'vue'
import { GET_ATTRIBUTE_INVALID_REASON } from '../../models.js'

const { $toKebabCase } = getCurrentInstance().appContext.config.globalProperties

const appSlots = inject('slots')
const appAttributes = inject('attributes')

const labelToKebabCase = (input) => {
  return input != 'optionORConjunction' ? $toKebabCase(input) : 'option-OR-conjunction'
}
</script>

<template>
  <div class="detail attributes container" id="play-slots-detail">
    <div class="row titles">
      <div>
        <h4>{{ $t(`ui.general.Name`) }}</h4>
      </div>
      <div>
        <h4>{{ $t(`ui.general.Description`) }}</h4>
      </div>
      <div>
        <h4>{{ $t(`ui.general.Default`) }}</h4>
      </div>
    </div>

    <div class="row" v-for="(attribute, key) in appSlots" :key="key">
      <template v-if="attribute.default == ''">
        <div>
          <div>{{ key }}</div>
        </div>
      </template>
      <template v-else>
        <LabelAndControls
          v-model="attribute.value"
          :label="labelToKebabCase(key)"
          :class="labelToKebabCase(key)"
          model="input"
          :disabled="!!GET_ATTRIBUTE_INVALID_REASON(key, appAttributes)"
        >
          <template v-slot:fake-placeholder>
            <span v-html="attribute.default"></span>
          </template>
        </LabelAndControls>
      </template>

      <div>
        <span v-html="$t(`attributes.slots.${labelToKebabCase(key)}`)"></span>
        <span v-if="$te(`attributes.slots.${labelToKebabCase(key)}__notice`)">
          <br />
          *<span v-html="$t(`attributes.slots.${labelToKebabCase(key)}__notice`)"></span>
        </span>
      </div>

      <div v-if="attribute.default == ''" class="d-none d-md-block">
        <span class="i-block d-md-none">{{ $t(`ui.general.Default`) }}: </span>
        <span>-</span>
      </div>
      <div v-else class="attribute-default">
        <span class="i-block d-md-none">{{ $t(`ui.general.Default`) }}: </span>
        <div v-html="attribute.default"></div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
// for tool css
#play-slots-detail {
  @media (min-width: 992px) {
    .tool-attribute {
      justify-content: space-between;
    }
    .tool-attribute__input {
      width: 120px !important;
    }
  }
  @media (max-width: 450px) {
    .tool-attribute {
      align-items: flex-start !important;
      flex-direction: column;
    }
  }
}
</style>

<style scoped lang="scss">
#play-slots-detail {
  .attribute-default {
    display: flex;
    align-items: center;
  }
}

@media all and (min-width: 576px) {
  .row {
    & > div:nth-child(1) {
      width: 30%;
      order: 1;
    }
    & > div:nth-child(2) {
      width: 60%;
      order: 2;
    }
    & > div:nth-child(3) {
      width: 10%;
      order: 3;
    }
  }
}

@media all and (max-width: 992px) {
  .row {
    .ui.input {
      max-width: auto !important;
      width: 100%;
    }
    & > div:nth-child(1) {
      width: 84%;
    }
    &.titles > div:nth-child(2) {
      display: none;
    }
    & > div:nth-child(3) {
      width: 16%;
    }
    & > div:nth-child(2) {
      width: 100%;
      order: 4;
    }
  }
}

@media all and (max-width: 576px) {
  .flex-between.text {
    display: block !important;
  }
  .ui.input {
    min-width: 100% !important;
  }
}
</style>
