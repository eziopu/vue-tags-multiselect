<script>
export default {
  name: "option-no-title",
};
</script>

<script setup>
import { ref, watch, nextTick } from "vue";
import ALineCode from "./tools/a-line-code.vue";
import GeneralDemo from "../tools/general-demo.vue";
import LabelAndSelect from "../tools/label-and-select.vue";

const i18n = "attributes.description.option";

const elGeneralDemo = ref(null);
const demoStatus = ref([]);
const dropdownDisplayAll = ref('false');
const isTitle = ref('false');

const toBoolean = (input) => {
  return input == "false" ? false : true;
}

watch(dropdownDisplayAll, async () => {
  await nextTick();
  elGeneralDemo.value.reloadByBtnFun();
});

watch(isTitle, async () => {
  await nextTick();
  elGeneralDemo.value.reloadByBtnFun();
});
</script>

<template>
  <div id="option-no-title" class="demo">
    <h3>No title</h3>
    <div class="flex-between to5-5">
      <div class="depiction">
        <span v-html="$t(`${i18n}.no_title`)"></span>
        <br />

        <div class="attributes">
          <LabelAndSelect label="option title" v-model="isTitle" />
          <LabelAndSelect label="dropdown display-all" v-model="dropdownDisplayAll" />
        </div>
        
        <ALineCode
          :isNotTitle="!toBoolean(isTitle)"
          :bolders="dropdownDisplayAll == 'true' ? ['displayAll'] : []"
        />
      </div>

      <div>
        <div class="general-demo" :class="demoStatus">
          <GeneralDemo
            v-model="demoStatus"
            ref="elGeneralDemo"
            :autoFocus="true"
            :displayOutput="true"
            :displayRefreshBtn="true"
            :displayShowCodeBtn="false"
            :dropdown="{
              country: {
                displayAll: toBoolean(dropdownDisplayAll), 
              },
              name: {isDisplayForDemo: false},
            }"
            :option="{
              country: [{title: toBoolean(isTitle)}],
            }"
          >
          </GeneralDemo>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.general-demo.selecting {
  margin-bottom: 14rem;
}
.attributes {
  display: grid;
  grid-gap: .6rem;
  margin-top: .6rem;
}
</style>

