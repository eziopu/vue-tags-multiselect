<script>
export default {
  name: "option-no-title",
};
</script>

<script setup>
import { ref, watch, nextTick } from "vue";
import ALineCode from "./tools/a-line-code.vue";

const i18n = "attributes.option";

const elGeneralDemo = ref(null);
const demoStatus = ref([]);
const dropdownDisplayAll = ref(false);
const isTitle = ref(false);

watch(dropdownDisplayAll, async () => {
  await nextTick();
  elGeneralDemo.value.reload();
});

watch(isTitle, async () => {
  await nextTick();
  elGeneralDemo.value.reload();
});
</script>

<template>
  <div id="option-no-title" class="demo">
    <ToolTitle>No title</ToolTitle>

    <div class="flex-between to5-5">
      <div class="depiction">
        <span v-html="$t(`${i18n}.no_title`)"></span>
        <br />

        <div class="attributes">
          <LabelAndControls label="option title" v-model="isTitle" />
          <LabelAndControls label="dropdown display-all" v-model="dropdownDisplayAll" />
        </div>

        <ALineCode
          :isNotTitle="!isTitle"
          :bolders="dropdownDisplayAll == true ? ['displayAll'] : []"
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
                displayAll: dropdownDisplayAll, 
              },
              name: {isDisplayForDemo: false},
            }"
            :option="{
              country: [{title: isTitle}],
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

