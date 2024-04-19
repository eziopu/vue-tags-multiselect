
<script>
export default {
  name: "exposes-other",
};
</script>

<script setup>
import { ref, computed } from "vue";

const demoStatus = ref([]);
const elGeneralDemo = ref(null);

const ATTRIBUTES = {
  focus: false,
  blur: true,
  clear: false,
  clearTags: false,
  initialize: false,
};
const keys = Object.keys(ATTRIBUTES);

const attributes = computed(() => {
  const result = ATTRIBUTES;

  const isSelecting = demoStatus.value.includes('selecting')
  result.focus = isSelecting;
  result.blur = !isSelecting;

  return result;
});

const isOptionSelected = ref(false);

const toggleOptionSelected = () => {
  isOptionSelected.value = !isOptionSelected.value;
  elGeneralDemo.value.$.refs.VTagsMultiselect.initialize();
}

const submit = (input = "") => {
  const app = elGeneralDemo.value.$.refs.VTagsMultiselect;
  app[input]();
}

const i18n = "attributes.exposes";
</script>

<template>
  <div id="exposes-other" class="demo" :class="demoStatus">
    <div class="flex-between to5-5">
      <div class="attributes">
        <div
          class="attribute"
          v-for="keyName in keys"
          :key="keyName"
        >
          <h3>{{ keyName }}()</h3>
          <div class="flex-between">
            <div class="depiction">
              {{ $t(`${i18n}.${keyName}`) }}
            </div>

            <button type="button" 
              class="small ui primary button btn  btn-sm"
              :class="{
                'basic btn-outline-primary': attributes[keyName],
                'btn-primary': !attributes[keyName],
              }"
              @click="submit(keyName)"
            >
              submit
            </button>
          </div>
        </div>
        <div class="attribute flex-between" style="margin-top: 2rem;">
          <p>add option selected</p>
          <button type="button" 
            class="small ui button btn btn-sm"
            :class="{
              'basic btn-outline-dark': isOptionSelected,
              'btn-secondary': !isOptionSelected,
            }"
            @click="toggleOptionSelected()"
          >
            <span v-if="!isOptionSelected">add</span>
            <span v-else>clear</span>
          </button>
        </div>
      </div>

      <div class="demo-app">
        <GeneralDemo
          ref="elGeneralDemo"
          v-model="demoStatus"
          :displayOutput="true"
          :displayRefreshBtn="true"
          :displayShowCodeBtn="false"
          :dropdown="{
            country: {displayAll: true},
            name: {isDisplayForDemo: false},
          }"
          :option="{
            country: [
              {}, {
                selected: isOptionSelected,
              }
            ]
          }"
        />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@media (max-width: 768px) {
  .demo {
    transition: all 0.2s ease-out;

    &.selecting {
      margin-bottom: 18rem;
    }
  }
}
</style>