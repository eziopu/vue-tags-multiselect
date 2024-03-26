<script>
export default {
  name: "option-value",
};
</script>

<script setup>
import { ref, inject } from "vue";
import ALineCode from "./tools/a-line-code.vue";
import GeneralDemo from "../tools/general-demo.vue";

const i18n = "attributes.description.option";

const firstDemoStatus = ref([]);
const secondDemoStatus = ref([]);

const framework = inject("framework");
</script>

<template>
  <div id="option-value" class="demo">
    <h3>Value</h3>
    <div class="flex-between to5-5">
      <div class="depiction">
      {{ $t(`${i18n}.value`) }}
      *{{ $t(`${i18n}.value__notice`) }}

       <div class="sub-depiction">
        <p
          v-for="index in [0,1,2]"
          :key="index"
          v-html="$t(`${i18n}.value__notices.${index}`)"
        />
      </div>

        <br />
        <ALineCode :bolders="['value']" />
      </div>

      <div>
        <div>
          result is object array 
          <br />
          <pre><code>{ country: ["mare", "eldia"], ...}</code></pre>
        </div>

        <div class="general-demos" :class="framework">
          <div class="general-demo__first" :class="firstDemoStatus">
            <h4>{{ $t(`ui.general.filled`) }}</h4>
            <GeneralDemo
              v-model="firstDemoStatus"
              :key="`filled`"
              :autoFocus="true"
              :displayOutput="true"
              :displayRefreshBtn="true"
              :displayShowCodeBtn="false"
              :dropdown="{
                country: {isDisplayForDemo: true, displayAll: true},
                name: {isDisplayForDemo: false},
                remark: {isDisplayForDemo: false}
              }"
            />
          </div>
          <div class="general-demo__second" :class="secondDemoStatus">
            <h4>{{ $t(`ui.general.not_filled`) }}</h4>
            <GeneralDemo
              v-model="secondDemoStatus"
              :key="`not_filled`"
              :autoFocus="true"
              :displayOutput="true"
              :displayRefreshBtn="true"
              :displayShowCodeBtn="false"
              :dropdown="{
                country: {isDisplayForDemo: true, displayAll: true},
                name: {isDisplayForDemo: false},
                remark: {isDisplayForDemo: false}
              }"
              :option="{
                country: [{}, {value: ''}, {value: ''}],
              }"
            />
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.general-demos {
  margin-top: 1rem;

  .general-demo__first,
  .general-demo__second {
    transition: all 0.2s ease-out;
    margin-bottom: 3rem;
  }
  .general-demo__first.selecting {
    margin-bottom: 10rem;
  }
  
  .general-demo__second.selecting {
    margin-bottom: 8rem;
  }
}

.general-demos.default {
  .general-demo__first.selecting {
    margin-bottom: 8rem;
  }
}
</style>

