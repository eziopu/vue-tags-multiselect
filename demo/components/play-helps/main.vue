<template>
  <div id="play-helps" class="demo">
    <div class="operate-mode" :class="operateMode">
      <button
        class="btn pointer"
        v-for="(mode, index) in ['simple', 'detail']"
        @click="operateMode = mode"
        :key="`mode${index}`"
        :class="{
          active: operateMode == mode,
          'btn-outline-primary': framework == 'bootstrap',
          'ui primary button': framework == 'semantic-ui',
          'basic ': framework == 'semantic-ui' && operateMode != mode
        }"
      >
        {{ mode }}
      </button>
    </div>

    <div id="helps">
      <Attributes />
      <Slots />
      <Events />
      <Exposes />
      <SlotsAttributesDropdown />
      <SlotsAttributesOption />
    </div>

    <Transition name="slide">
      <div v-if="Object.keys(result).length != 0">output: {{ result }}</div>
    </Transition>

    <div class="demo-component relative">
      <v-tags-multiselect
        v-if="reloadByI18n"
        v-model="result"
        ref="VTagsMultiselect"
        @focus="() => (events.focus.value += 1)"
        @blur="() => (events.blur.value += 1)"
        @clear="() => (events.clear.value += 1)"
        @input-value="(e) => (events.inputValue.value = e)"
        @visible-change="(e) => (events.visibleChange.value = e)"
        @status="(e) => (events.status.value = e)"
        @remove-tag="(e) => (events.removeTag.value = e)"
        @selecting-tag="(e) => (events.selectingTag.value = e)"
        :disabled="attributes.disabled.value"
        :loading="attributes.loading.value"
        :dropdownLoading="attributes.dropdownLoading.value"
        :search="attributes.search.value"
        :transition="attributes.transition.value"
        :keyboard="attributes.keyboard.value"
        :debugLog="attributes.debugLog.value"
        :create="attributes.create.value"
        :merge="attributes.merge.value"
        :deleteIcon="attributes.deleteIcon.value"
        :conjunction="attributes.conjunction.value"
        :tagPosition="attributes.tagPosition.value"
        :placeholder="attributes.placeholder.value"
        :placeholders="
          Object.fromEntries(
            Object.entries(attributes.placeholders).map(([key, value]) => [key, value.value])
          )
        "
      >
        <template v-slot:tag-conjunction v-if="slots.tagConjunction.value != ''">
          <span v-html="slots.tagConjunction.value"></span>
        </template>
        <template v-slot:loading v-if="slots.loading.value != ''">
          <span v-html="slots.loading.value"></span>
        </template>
        <template v-slot:dropdown-loading v-if="slots.dropdownLoading.value != ''">
          <span v-html="slots.dropdownLoading.value"></span>
        </template>
        <template v-slot:option-undo v-if="slots.optionUndo.value != ''">
          <span v-html="slots.optionUndo.value"></span>
        </template>
        <template v-slot:option-OR-conjunction v-if="slots.optionORConjunction.value != ''">
          <span v-html="slots.optionORConjunction.value"></span>
        </template>

        <v-tag-dropdown value="country" display-all custom>
          <v-tag-option title>
            <i class="fa fa-flag"></i> {{ $t(`ui.general.Country`) }}
          </v-tag-option>
          <v-tag-option value="Māre">{{ $t(`ui.data.country.Māre`) }}</v-tag-option>
          <v-tag-option value="Eldia">{{ $t(`ui.data.country.Eldia`) }}</v-tag-option>
        </v-tag-dropdown>
        <v-tag-dropdown value="name">
          <v-tag-option title divided>
            <i class="fa fa-user"></i> {{ $t(`ui.general.Name`) }}
            <small>(loading)</small>
          </v-tag-option>
          <v-tag-option value="Grisha Yeager">{{ $t(`ui.data.name.Grisha Yeager`) }}</v-tag-option>
          <v-tag-option value="Eren Yeager">{{ $t(`ui.data.name.Eren Yeager`) }}</v-tag-option>
          <v-tag-option value="Armin Arlert">{{ $t(`ui.data.name.Armin Arlert`) }}</v-tag-option>
          <v-tag-option
            v-for="(otherName, index) in otherNames"
            :key="`otherName${index}`"
            :value="otherName.value"
          >
            {{ $t(`ui.data.name.${otherName.displayValue}`) }}
          </v-tag-option>
        </v-tag-dropdown>
        <v-tag-dropdown value="push_value_test">
          <v-tag-option title> push value test </v-tag-option>
          <v-tag-option>
            <div @click="$refs.VTagsMultiselect.pushTag({ value: 'TEST', key: 'fuc' })">TEST</div>
          </v-tag-option>
          <v-tag-option>
            <div @click="$refs.VTagsMultiselect.pushTag({ value: 'TEST2' })">TEST2</div>
          </v-tag-option>
        </v-tag-dropdown>
        <v-tag-dropdown value="height" display-all>
          <v-tag-option title>
            <i class="fa fa-user"></i> {{ $t(`ui.general.Height(m)`) }}
          </v-tag-option>
          <v-tag-option>
            <input
              type="number"
              name="height1"
              min="1"
              :max="height2 || 60"
              style="width: 5em"
              :placeholder="`0 ~ ${height2 || 60}`"
              v-model="height1"
              ref="inputHeight1"
              @keydown.enter="inputHeight()"
            />
            ~
            <input
              type="number"
              name="height2"
              :min="Number(height1) + 1 || 0"
              max="60"
              style="width: 5em"
              :placeholder="`${Number(height1) + 1 || 0} ~ 60`"
              v-model="height2"
              ref="inputHeight2"
              @keydown.enter="inputHeight()"
            />
          </v-tag-option>
        </v-tag-dropdown>
        <v-tag-dropdown value="remark" display-all>
          <v-tag-option title>
            <i class="fa fa-sticky-note"></i> {{ $t(`ui.general.Remark`) }}
          </v-tag-option>
          <v-tag-option value="yes">
            <i class="fa fa-check"></i>
          </v-tag-option>
          <v-tag-option value="no">
            <i class="fa fa-close"></i>
          </v-tag-option>
        </v-tag-dropdown>
      </v-tags-multiselect>

      <div class="demo-control">
        <span
          class="show-code-btn pointer"
          :class="{ active: show_code }"
          @click="show_code = !show_code"
        >
          &lt; / &gt;
          <!-- < / > -->
        </span>
      </div>
    </div>

    <!-- <GeneralDemo
      ref="generalDemo"
      :app="{
        placeholder: 'Click me !',
      }"
    ></GeneralDemo> -->

    <Transition name="slide">
      <ShowHtmlCode v-show="show_code" class="prettyprint lang-html customize"></ShowHtmlCode>
    </Transition>

    <div id="datas">
      <DataTable :datas="tableDatas"></DataTable>
    </div>
  </div>
</template>

<script>
import Attributes from './attributes/main.vue'
import Events from './events/main.vue'
import Slots from './slots/main.vue'
import SlotsAttributesDropdown from './slots-attributes/dropdown.vue'
import SlotsAttributesOption from './slots-attributes/option.vue'
import Exposes from './exposes/main.vue'
import ShowHtmlCode from './show-html-code.vue'

import DataTable from './data-table.vue'

import { DATAS } from './datas.js'

import {
  GET_ATTRIBUTES_DETAIL,
  GET_SLOTS_DETAIL,
  GET_EVENTS_DETAIL,
  GET_EXPOSES_DETAIL
} from '@models/attributes/detail.js'

import ReloadByI18n from '../tools/mixins/reload-by-i18n.js'

export default {
  name: 'play-helps',
  mixins: [ReloadByI18n],
  inject: ['framework'],
  components: {
    Attributes,
    Events,
    Slots,
    DataTable,
    SlotsAttributesDropdown,
    SlotsAttributesOption,
    Exposes,
    ShowHtmlCode
  },
  provide() {
    return {
      getDemo: () => this,
      getOperateMode: () => this.operateMode,
      displays: this.displays,

      attributes: this.attributes,
      slots: this.slots,
      events: this.events,
      exposes: this.exposes
    }
  },
  data() {
    return {
      attributes: GET_ATTRIBUTES_DETAIL(),
      slots: GET_SLOTS_DETAIL(),
      events: GET_EVENTS_DETAIL(),
      exposes: GET_EXPOSES_DETAIL(),
      operateMode: 'simple', // simple, detail
      show_code: false,
      originTableDatas: DATAS,

      displays: {
        attributes: true,
        slots: false,
        events: false,
        exposes: false,
        slotDropdown: false,
        slotOption: false
      },

      isFetchDatas: false,
      result: {},
      height1: undefined,
      height2: undefined,
      // select name fetch logic
      otherNames: [],
      isFetchProcessing: false
    }
  },
  watch: {
    events: {
      handler(value) {
        let { selectingTag } = value
        if (selectingTag.value.key == 'name') {
          this.fetchNames()
        } else {
          this.otherNames = []
          this.isFetchDatas = false
        }
      },
      deep: true
    }
  },
  computed: {
    tableDatas() {
      try {
        if (Object.keys(this.result).length == 0) throw 'no result'
        let result = []
        this.originTableDatas.forEach((originData) => {
          if (this.comparator(originData) == true) {
            result.push(originData)
          }
        })
        return result || []
      } catch (error) {
        return this.originTableDatas
      }
    }
  },
  mounted() {},
  methods: {
    fetchNames() {
      if (this.attributes.dropdownLoading.value == true) return
      this.attributes.dropdownLoading.value = true

      let length = this.originTableDatas.length
      this.originTableDatas.forEach((data, index) => {
        if (3 >= index) return
        setTimeout(
          () => {
            this.otherNames.push({
              displayValue: data.name,
              value: data.name
            })
          },
          300 * (index - 2)
        )
      })

      this.isFetchDatas = true
      setTimeout(
        () => {
          this.attributes.dropdownLoading.value = false
        },
        300 * (length - 3)
      )
    },
    inputHeight() {
      let { height1, height2 } = this
      if (height1 == height2 || (height2 != undefined && height1 == undefined)) {
        this.$refs.inputHeight1.focus()
        return
      }
      if (height1 != undefined && height2 == undefined) {
        this.$refs.inputHeight2.focus()
        return
      }
      if (Number(height1) != 0 && Number(height2) != 0) {
        this.pushHeightValue()
      }
      return
    },
    pushHeightValue() {
      this.$refs.VTagsMultiselect.pushTag({
        key: 'height',
        value: `${this.height1} ~ ${this.height2}`
      })
      this.$refs.inputHeight1.blur()
      this.$refs.inputHeight2.blur()
    },
    comparator(data = {}) {
      // data = { country: "Māre", height: 15, ... }
      // result = { "country": [ "Māre" ] }
      try {
        let booleans = [] // length == Object.keys(data).length
        Object.keys(data).forEach((keyName) => {
          let value = data[keyName] // Māre, 15
          if (keyName == 'remark') {
            value = value == '' ? 'no' : 'yes'
          }
          let result = false
          let resultValues = this.result[keyName] // ["Māre", "Eldia"] or ["0~60"] or ["yes"]
          if (resultValues == undefined) {
            booleans.push(true)
          } else {
            if (keyName == 'height') {
              let heightAttay = resultValues[0]
                .replace(/\s/g, '')
                .split('~')
                .sort((a, b) => {
                  return a - b
                })
              if (value >= heightAttay[0] && heightAttay[1] >= value) {
                result = true
              }
            } else {
              result = resultValues.includes(value)
            }
            booleans.push(result)
          }
        })
        return booleans.filter(Boolean).length == booleans.length ? true : false
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

<style scoped lang="scss">
.operate-mode {
  position: absolute;
  right: -6px;
  top: -12px;

  &.simple {
    right: 6px;
  }

  button {
    margin: 0 6px;
  }
}

.demo-component {
  margin-top: 2em;

  .tag .tag-title small {
    display: none;
  }
}
</style>
