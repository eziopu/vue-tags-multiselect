<script>
export default {
  name: "methods-pushTag__demo1",
};
</script>

<script setup>
import { ref, reactive, nextTick, onUnmounted } from "vue";
import { PARAMETERS, get_attributes } from "../models.js";

const demoStatus = ref([]);

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
      elGeneralDemo.value.$.refs.VTagsMultiselect.pushTag(attributes);
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

const i18n = "attributes.description.methods.pushTag.demo1";
</script>

<template>
  <div id="methods-pushTag__pushTag-demo1" class="demo" :class="demoStatus">
    <h4 class="ui title method-pushTag__parameter--title">
      Demo : {{ $t(`${i18n}.title`) }}
    </h4>

    <div class="depiction">
      <span v-html="$t(`${i18n}.description`)"></span>
      <input type="number" :min="0" style="width: 3rem" v-model="delay">

      <span v-html="$t(`${i18n}.description-1`)"></span>
      <p v-html="$t(`${i18n}.sub-description`)"></p>
      
      <div class="sub-depiction">
        <span v-html="$t(`${i18n}.first`)"></span>

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
          class="pushTag-demo1__attributes--submit small ui button btn btn-secondary btn-sm" 
          @click="pushTag()"
          :class="{process: isProcess}"
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
        :dropdown="{
          name: {isDisplayForDemo: false},
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
    margin-top: -.6rem;
  }
  @media (max-width: 768px) {
    bottom: 0;
    margin-bottom: -2rem;
  }
}

</style>