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
        @status="(e) => (tool.status = e)"
        @selectingTag="(e) => (tool.selectingTag = e)"
        @inputValue="(e) => (tool.inputValue = e)"
        @editing="(e) => (tool.editing = e)"
        :disabled="disabled == 'true' ? true : false"
        :loading="loading == 'true' ? true : false"
        :dropdownLoading="dropdownLoading == 'true' ? true : false"
        :search="search == 'true' ? true : false"
        :transition="transition == 'true' ? true : false"
        :keyboard="keyboard == 'true' ? true : false"
        :debugLog="debugLog == 'true' ? true : false"
        :create="create == 'true' ? true : false"
        :merge="merge == 'true' ? true : false"
        :deleteIcon="deleteIcon"
        :conjunction="conjunction"
        :tagPosition="tagPosition"
        :placeholder="placeholderText(placeholder)"
        :placeholders="placeholders"
      >
        <template v-slot:tag-conjunction v-if="tagConjunctionContent != ''">
          <span v-html="tagConjunctionContent"></span>
        </template>
        <template v-slot:loading v-if="loadingContent != ''">
          <span v-html="loadingContent"></span>
        </template>
        <template v-slot:option-undo v-if="optionUndoContent != ''">
          <span v-html="optionUndoContent"></span>
        </template>
        <template v-slot:option-OR-conjunction v-if="optionORConjunctionContent != ''">
          <span v-html="optionORConjunctionContent"></span>
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

    <Transition name="slide">
      <ShowHtmlCode v-show="show_code" class="prettyprint lang-html customize"></ShowHtmlCode>
    </Transition>

    <div id="datas">
      <DataTable :framework="framework" :datas="tableDatas"></DataTable>
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

import {
  DATAS,
  GET_PACKAGE_ATTRIBUTES_DETAIL,
  GET_PACKAGE_SLOTS_DETAIL,
  GET_PACKAGE_EVENTS_DETAIL,
  GET_PACKAGE_EXPOSES_DETAIL,
} from './../models.js'

import ReloadByI18n from '../tools/mixins/reload-by-i18n.js'

export default {
  name: 'play-helps',
  mixins: [ReloadByI18n],
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
  props: {
    framework: {
      type: String,
      default: () => {
        return 'default'
      }
    }
  },
  provide() {
    return {
      getDemo: () => this,
      displays: this.displays,
      attributes: this.attributes,
      slots: this.slots,
      events: this.events,
      exposes: this.exposes,
    }
  },
  data() {
    return {
      attributes: GET_PACKAGE_ATTRIBUTES_DETAIL(),
      slots: GET_PACKAGE_SLOTS_DETAIL(),
      events: GET_PACKAGE_EVENTS_DETAIL(),
      exposes: GET_PACKAGE_EXPOSES_DETAIL(),
      operateMode: 'detail', // simple, detail
      show_code: false,
      originTableDatas: DATAS,

      // app
      disabled: 'false',
      loading: 'false',
      dropdownLoading: 'false',
      search: 'true',
      keyboard: 'true',
      debugLog: 'true',
      transition: 'true',
      create: 'true',
      merge: 'true',
      tagPosition: 'null',
      conjunction: 'null',
      deleteIcon: 'always',
      loadingContent: '',
      loadingPlaceholder: '',
      selectDownPlaceholder: '',
      finishPlaceholder: '',
      placeholder: '',
      placeholders: {
        initial: '',
        loading: '',
        selectDown: '',
        finish: '',
        tagValueRepeat: ''
      },
      tagConjunctionContent: '',
      optionUndoContent: '',
      optionORConjunctionContent: '',
      tool: {
        status: [],
        selectingTag: {},
        inputValue: '',
        editing: {}
      },
      isFetchDatas: false,
      result: {},
      height1: undefined,
      height2: undefined,
      // select name fetch logic
      otherNames: [],
      isFetchProcessing: false,
      displays: {
        attributes: false,
        slots: true,
        events: false,
        exposes: false,
        slotDropdown: false,
        slotOption: false,
        details: {
          conjunction: false,
          deleteIcon: false
        }
      }
    }
  },
  watch: {
    tool: {
      handler(value) {
        let { status, selectingTag, editing } = value
        if (
          this.loading == 'false' &&
          this.isFetchDatas == false &&
          status.includes('loading') == false &&
          (status.includes('editing') || status.includes('selecting')) &&
          (selectingTag.key == 'name' || editing.key == 'name')
        ) {
          this.fetchNames()
        }
        if (selectingTag.key != 'name' && editing.key != 'name') {
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
    placeholderText(value) {
      if (value == '' || value == undefined) return undefined
      return value
    },
    fetchNames() {
      if (this.loading == 'true') return
      this.loading = 'true'

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
          this.loading = 'false'
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
