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
console.log(attributes);
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
      <div>
        <div class="pushTag-demo1__attributes-title flex-between to5-5">
          <span>attributes: {</span>
          <button type="button" 
            class="small ui button btn btn-secondary btn-sm" 
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
        <div class="pushTag-demo1__attributes attributes">
          <LabelAndControls
            v-for="(PARAMETER, key) in PARAMETERS"
            class="flex-between to4-6"
            :key="`attribute_${key}`"
            :label="key"
            :model="PARAMETER.type == 'boolean' ? 'select' : 'input'"
            v-model="attributes[key]"
          />
        </div>
        <div class="attribute">}</div>
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
.pushTag-demo1__attributes-title {
  align-items: flex-end;
  @media (max-width: 768px) {
    flex-direction: row !important;
  }
}

</style>