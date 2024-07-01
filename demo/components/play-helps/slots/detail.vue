<script>
export default {
  name: 'play-slots-detail'
}
</script>
<script setup>
import { inject, getCurrentInstance } from 'vue'
import { GET_ATTRIBUTES_IS_DISABLED } from '../../models.js'

const { $toKebabCase } = getCurrentInstance().appContext.config.globalProperties

const appSlots = inject('slots')
const appAttributes = inject('attributes')

const labelToKebabCase = (input) => {
  return input != 'optionORConjunction' ? $toKebabCase(input) : 'option-OR-conjunction'
}
console.log('////')
console.log(appSlots)
console.log('////')
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
          :disabled="GET_ATTRIBUTES_IS_DISABLED(key, appAttributes)"
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

    <div class="row">
      <div><div>v-tag-dropdown</div></div>
      <div v-html="$t(`attributes.slots.v-tag-dropdown`)"></div>
      <div class="d-none d-md-block">
        <span class="i-block d-md-none">{{ $t(`ui.general.Default`) }}: </span>
        <span>-</span>
      </div>
    </div>
    <div class="row">
      <div><div>v-tag-option</div></div>
      <div v-html="$t(`attributes.slots.v-tag-option`)"></div>
      <div class="d-none d-md-block">
        <span class="i-block d-md-none">{{ $t(`ui.general.Default`) }}: </span>
        <span>-</span>
      </div>
    </div>
    <div class="row">
      <div class="flex-between text">
        <div>loading</div>
        <div class="ui input loading">
          <input type="text" class="form-control" v-model="appSlots.loadingContent" />
        </div>
      </div>
      <div>
        <span> {{ $t(`attributes.slots.loading`) }} *</span>
        <span v-html="$t(`attributes.slots.loading__notice`)"></span>
      </div>
      <div style="display: inline-flex">
        <span class="i-block d-md-none" style="margin-right: 6px">
          {{ $t(`ui.general.Default`) }}:
        </span>
        <div class="demo__loading">
          <i class="demo__loading--icon"></i>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="flex-between text">
        <div>tag-conjunction</div>
        <div class="ui input mini-width">
          <input
            type="text"
            class="form-control"
            v-model="appSlots.tagConjunctionContent"
            :disabled="appAttributes.merge == 'false'"
            :placeholder="`&`"
          />
        </div>
      </div>
      <div>
        <span v-html="$t(`attributes.slots.tag-conjunction`)"></span>
        *<span v-html="$t(`attributes.slots.tag-conjunction__notice`)"></span>
      </div>
      <div>
        <span class="i-block d-md-none">{{ $t(`ui.general.Default`) }}: </span>
        &
      </div>
    </div>
    <div class="row">
      <div class="flex-between text">
        <div>option-undo</div>
        <div class="ui input mini-width relative">
          <input type="text" class="form-control" v-model="appSlots.optionUndoContent" />
          <div class="demo__fake-placeholder" v-if="appSlots.optionUndoContent == ''">
            <i class="demo__arrow-left"></i>Undo
          </div>
        </div>
      </div>
      <div>
        <span v-html="$t(`attributes.slots.option-undo`)"></span>
        *<span v-html="$t(`attributes.slots.option-undo__notice`)"></span>
      </div>
      <div>
        <span class="i-block d-md-none">{{ $t(`ui.general.Default`) }}: </span>
        <i class="demo__arrow-left"></i> Undo
      </div>
    </div>
    <div class="row">
      <div class="flex-between text">
        <div>option-OR-conjunction</div>
        <div class="ui input mini-width">
          <input
            type="text"
            class="form-control"
            v-model="appSlots.optionORConjunctionContent"
            :placeholder="`OR`"
          />
        </div>
      </div>
      <div>
        <span v-html="$t(`attributes.slots.option-OR-conjunction`)"></span>
        *<span v-html="$t(`attributes.slots.option-OR-conjunction__notice`)"></span>
      </div>
      <div>
        <span class="i-block d-md-none">{{ $t(`ui.general.Default`) }}: </span>
        OR
      </div>
    </div>
  </div>
</template>

<style lang="scss">
// for tool css
#play-slots-detail {
  .tool-attribute {
    justify-content: space-between;
    // flex-flow: row;
    .tool-attribute__input {
      position: relative;
      width: 120px !important;
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

// .row {
//   .ui.input {
//     &.loading {
//       max-width: 160px;
//     }
//     &.mini-width {
//       max-width: 100px;
//     }
//   }
// }

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
