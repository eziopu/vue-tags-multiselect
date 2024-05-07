<script>
export default {
  name: 'app-events'
}
</script>

<script setup>
import DemoTemplate from './demo-template.vue'
import ShowCode from './show-codes/main.vue'
import { GET_PACKAGE_EVENTS_DETAIL } from './../models.js'
import { ref, onMounted } from "vue";

const results = {
  focusCount: ref(0),
  blurCount: ref(0),
  clearCount: ref(0),
  statusArray: ref([]),
  inputValue: ref(''),
  visibleChange: ref(false),
  removeTag: ref({}),
  selectingTag: ref({}),
}

const demoStatus = ref([]);
const generalDemo = ref(null);

onMounted(() => {
  generalDemo.value.showCode = true;
});
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
      </DemoTemplate>
    </div>
    <div class="general-demo-result" :class="demoStatus">
      <GeneralDemo
        ref="generalDemo"
        v-model="demoStatus"
        :displayOutput="true"
        @focus="() => (results.focusCount.value++)"
        @blur="() => (results.blurCount.value++)"
        @clear="() => (results.clearCount.value++)"
        @status="(array) => (results.statusArray.value = array)"
        @input-value="(string) => (results.inputValue.value = string)"
        @visible-change="(boolean) => (results.visibleChange.value = boolean)"
        @remove-tag="(tag) => (results.removeTag.value = tag)"
        @selecting-tag="(tag) => (results.selectingTag.value = tag)"
      >
        <template #show-code>
          <ShowCode />
        </template>
      </GeneralDemo>
      <div class="demo-results">
        <div class="result" v-for="(result, key) in results" :key="key">
          {{ key }} : <pre>{{ result }}</pre>
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
  }
}
</style>
