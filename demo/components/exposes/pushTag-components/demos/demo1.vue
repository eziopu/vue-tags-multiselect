<script>
export default {
  name: "exposes-pushTag__demo1",
};
</script>

<script setup>
import { ref, reactive, inject, nextTick, onUnmounted } from "vue";
import { PARAMETERS, get_attributes } from "../models.js";

const demoStatus = ref([]);
const framework = inject("framework");

/* demo use*/
const elGeneralDemo = ref(null);
const delay = ref(3);
const attributes = reactive(get_attributes())

const pushTag = async () => {
  await nextTick();
  timer.value = delay.value;
  if (isProcess.value == true) {
    return;
  }

  isProcess.value = true;
  startTimer();
  setTimeout(() => {
    if (elGeneralDemo.value) {
      elGeneralDemo.value.$.refs.VTagsMultiselect.pushTag({
        ...attributes,
        ...{classList: [attributes.classList]}
      });
    }
    isProcess.value = false;
  }, delay.value*1000);
}

// 計時
const isProcess = ref(false);
const timer = ref(delay.value);
let intervalId = null;

const startTimer = () => {
  intervalId = setInterval(() => {
    if (timer.value > 0) {
      timer.value -= 0.1;
    } else {
      clearInterval(intervalId);
    }
  }, 100);
};

onUnmounted(() => {
  clearInterval(intervalId);
});

const demoDropdownSelected = ref(false);
const firstDemo = (input = {}) => {
  attributes.key = input.key;
  attributes.value = input.value;
  demoDropdownSelected.value = input.seleting == true ? true : false 

  elGeneralDemo.value.reload();
  pushTag();
}

const i18nMain = "attributes.exposes.pushTag__detail";
const i18n = `${i18nMain}.demo1`;
const i18nNoKey = `${i18nMain}.no-key`;
const i18nHasKey = `${i18nMain}.has-key`;
</script>

<template>
  <div id="exposes-pushTag__pushTag-demo1" class="demo" :class="demoStatus">
    <h4 class="ui title method-pushTag__parameter--title">
      Demo 2 : {{ $t(`${i18n}.title`) }}
    </h4>

    <div class="depiction">
      <span v-html="$t(`${i18n}.description`)"></span>
      <input type="number" :min="0" class="depiction__delay-input" v-model="delay">

      <span v-html="$t(`${i18n}.description-1`)"></span>
      <p v-html="$t(`${i18n}.sub-description`)"></p>
      
      <span v-html="$t(`${i18n}.first`)"></span>
      <div class="sub-depiction">
        <div class="depiction__first-demo">
          <p v-html="$t(`${i18nNoKey}.description`, 0)"></p>
          <div class="depiction__first-demo--colon"> : </div>
          <button type="button" 
            class="small ui button btn btn-secondary btn-sm" 
            @click="firstDemo({key: '', value: 'test', seleting: true})"
          >
            <span v-html="$t(`${i18nNoKey}.1`, 0)"></span>
          </button>
          <button type="button" 
            class="small ui button btn btn-secondary btn-sm" 
            @click="firstDemo({key: '', value: 'test'})"
          >
            <span v-html="$t(`${i18nNoKey}.2`, 0)"></span>
          </button>
        </div>

        <div class="depiction__first-demo">
          <p v-html="$t(`${i18nHasKey}.description`, 0)"></p>
          <div class="depiction__first-demo--colon"> : </div>
          <button type="button" 
            class="small ui button btn btn-secondary btn-sm" 
            @click="firstDemo({key: 'country', value: 'test'})"
          >
            <span v-html="$t(`${i18nHasKey}.1`, 0)"></span>
          </button>
          <button type="button" 
            class="small ui button btn btn-secondary btn-sm" 
            @click="firstDemo({key: 'noSameKey', value: 'test'})"
          >
            <span v-html="$t(`${i18nHasKey}.2`, 0)"></span>
          </button>
        </div>
      </div>

    </div>

    <div class="flex-between to6-4">
      <div class="pushTag-demo1__attributes">
        <div class="pushTag-demo1__attributes--title">
          <span>attributes: {</span>
        </div>
        <div class="pushTag-demo1__attributes--controls attributes">
          <LabelAndControls
            v-for="(PARAMETER, key) in PARAMETERS"
            :key="`attribute_${key}`"
            class="flex-between"
            :class="{'to4-6': PARAMETER.type == 'boolean' ? false : true}"
            :label="key"
            :model="PARAMETER.type == 'boolean' ? 'select' : 'input'"
            v-model="attributes[key]"
          />
        </div>
        <div class="attribute">}</div>
        <button type="button" 
          class="pushTag-demo1__attributes--submit small ui primary button btn btn-primary btn-sm"
          @click="pushTag()"
          :class="[framework, {process: isProcess}]"
        >
          <template v-if="isProcess">
            {{ timer.toFixed(1) }} s
          </template>
          <template v-else>
            submit
          </template>
        </button>
      </div>

      <GeneralDemo
        ref="elGeneralDemo"
        v-model="demoStatus"
        :autoFocus="true"
        :displayOutput="true"
        :displayRefreshBtn="true"
        :displayShowCodeBtn="false"
        :app="{
          debugLog: true
        }"
        :dropdown="{
          name: {isDisplayForDemo: false},
        }"
        :option="{
          country: [{selected: demoDropdownSelected}],
        }"
      >
      </GeneralDemo>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "../../assets/stylesheets.scss";

@media (max-width: 576px) {
  .v-tags-multiselect {
    margin-top: 1rem;
  }
}

.attributes {
  padding-left: 1.2rem;
}
.ui.button {
  margin-left: .6rem;
  &.process {
    cursor: wait;
  }
}

.depiction__delay-input {
  width: 3rem;
  margin: 0 .3rem;
}

.depiction__first-demo {
  display: flex;
  margin-bottom: .3rem;
  align-items: center;

  .depiction__first-demo--colon {
    margin: 0 0.3rem;
  }

  &:last-child {
    margin-bottom: 2rem;
  }
}

.pushTag-demo1__attributes {
  position: relative;
  @media (max-width: 768px) {
    margin-bottom: 3rem;
  }
}
.pushTag-demo1__attributes--submit {
  position: absolute;
  right: 0;
  @media (min-width: 768px) {
    top: 0;
    margin-top: -.6rem !important;

    &.semantic-ui {
      margin-top: -1rem !important;
      margin-right: 0;
    }
  }
  @media (max-width: 768px) {
    bottom: 0;
    margin-bottom: -2rem !important;
    &.semantic-ui {
      margin-bottom: -1.2rem !important;
      margin-right: 0;
    }
  }
}

</style>