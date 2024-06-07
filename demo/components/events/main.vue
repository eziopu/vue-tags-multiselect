<script>
export default {
  name: 'app-events'
}
</script>

<script setup>
import DemoTemplate from './demo-template.vue'
import ShowCode from './show-codes/main.vue'
import { GET_PACKAGE_EVENTS_DETAIL } from './../models.js'
import { ref, onMounted, reactive } from 'vue'

const results = {
  focusCount: ref(0),
  blurCount: ref(0),
  clearCount: ref(0),
  statusArray: ref([]),
  inputValue: ref(''),
  visibleChange: ref(false),
  removeTag: ref({}),
  selectingTag: ref({})
}

const demoStatus = ref([])
const elGeneralDemo = ref(null)

onMounted(() => {
  elGeneralDemo.value.showCode = true
})

const isDemoUseAllDropdown = ref(true)
const settingDemoDropdown = (input) => {
  elGeneralDemo.value.$.refs.VTagsMultiselect.initialize()
  isDemoUseAllDropdown.value = input == 'all'
}

const attributes = reactive({
  create: true,
  clearable: true,
  loading: false,
  conjunction: 'null'
})
</script>

<template>
  <div id="app-events" class="demo">
    <div class="demo-templates">
      <DemoTemplate
        class="demo-template"
        v-for="(EVENT, key) in GET_PACKAGE_EVENTS_DETAIL()"
        :key="key"
        :label="key"
        :contents="EVENT"
      >
        <ul v-if="key == 'status'">
          <li
            v-for="(value, key) in ['selecting', 'finish', 'delect-down']"
            :key="key"
            style="margin-bottom: 6px"
          >
            {{ value }}:
            <span
              v-html="$t(`attributes.events.status__parameter_extended_description.${value}`)"
            ></span>
          </li>
        </ul>
      </DemoTemplate>
    </div>
    <div class="general-demo-result" :class="demoStatus">
      <div class="general-demo__inner general-demo__fast-option">
        <span class="general-demo__label">option : </span>
        <button
          type="button"
          class="small ui button btn btn-sm"
          :class="{
            'basic btn-outline-secondary': !isDemoUseAllDropdown,
            'btn-secondary': isDemoUseAllDropdown
          }"
          :disabled="!isDemoUseAllDropdown"
          @click="settingDemoDropdown('one')"
        >
          <span>Only one</span>
        </button>

        <button
          type="button"
          class="small ui button btn btn-sm"
          :class="{
            'basic btn-outline-secondary': isDemoUseAllDropdown,
            'btn-secondary': !isDemoUseAllDropdown
          }"
          :disabled="isDemoUseAllDropdown"
          @click="settingDemoDropdown('all')"
        >
          <span>Enable all</span>
        </button>
      </div>

      <div class="general-demo__inner general-demo__fast-attributes">
        <span class="general-demo__label">attributes : </span>
        <div class="general-demo__attributes-controls grid">
          <LabelAndControls label="clearable" v-model="attributes.clearable" />
          <LabelAndControls label="create" v-model="attributes.create" />
          <LabelAndControls label="loading" v-model="attributes.loading" />
          <LabelAndControls
            label="conjunction"
            v-model="attributes.conjunction"
            :values="['AND', 'OR', 'null']"
          />
        </div>
      </div>

      <GeneralDemo
        ref="elGeneralDemo"
        v-model="demoStatus"
        :displayOutput="true"
        @focus="() => results.focusCount.value++"
        @blur="() => results.blurCount.value++"
        @clear="() => results.clearCount.value++"
        @status="(array) => (results.statusArray.value = array)"
        @input-value="(string) => (results.inputValue.value = string)"
        @visible-change="(boolean) => (results.visibleChange.value = boolean)"
        @remove-tag="(tag) => (results.removeTag.value = tag)"
        @selecting-tag="(tag) => (results.selectingTag.value = tag)"
        :app="attributes"
        :dropdown="{
          name: { isDisplayForDemo: isDemoUseAllDropdown },
          remark: { isDisplayForDemo: isDemoUseAllDropdown }
        }"
      >
        <template #show-code>
          <ShowCode />
        </template>
      </GeneralDemo>
      <div class="demo-results">
        <div class="result" v-for="(result, key) in results" :key="key">
          {{ key }} :
          <pre>{{ result }}</pre>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
#app-events {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 18px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }

  .demo-template {
    margin-bottom: 24px;
  }

  .demo-results {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    margin-top: 12px;
  }

  .general-demo__inner {
    display: flex;
    align-items: center;
    gap: 18px;
    margin-bottom: 18px;
    @media (max-width: 768px) {
      margin-bottom: 24px;
    }
  }

  .general-demo__fast-attributes {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 6px;

    .general-demo__attributes-controls {
      padding-left: 12px;
    }

    @media (max-width: 1200px) {
      flex-wrap: wrap;

      .general-demo__label {
        flex-basis: 100%;
      }
    }
  }

  button:disabled {
    cursor: no-drop;
  }
}
</style>
