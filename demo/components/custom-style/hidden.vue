<script>
export default {
  name: 'custom-style--hidden'
}
</script>
<script setup>
import { computed, onMounted, ref } from 'vue'
import ALineCode from './tools/a-line-code.vue'

// const i18n = 'attributes.option'
const demoStatus = ref([])
const elGeneralDemo = ref(null)
const elGeneralDemo_v_model = computed(() => {
  return elGeneralDemo.value ? elGeneralDemo.value.v_model : {}
})

onMounted(() => {
  console.log(elGeneralDemo.value.v_model);
})

</script>

<template>
  <div id="custom-style--hidden" class="demo" :class="demoStatus">
    <ToolTitle>Hidden</ToolTitle>

    <div class="flex-between to5-5">
      <div class="depiction">
        <p>提供在 <code class="tag">&lt;v-tag-option&gt;</code> 內隱藏的class name</p>

        <ul>
          <li>
            <p>v-hidden-in-dropdown : 僅在dropdown內隱藏</p>
          </li>
          <li>
            <p>v-hidden-in-tag : 僅在成為tag後隱藏</p>
          </li>
        </ul>

        <ALineCode />
      </div>

      {{ elGeneralDemo_v_model }}

      <GeneralDemo
        ref="elGeneralDemo"
        v-model="demoStatus"
        :autoFocus="true"
        :displayOutput="true"
        :displayShowCodeBtn="false"
        :app="{
          placeholder: 'click country option!'
        }"
        :dropdown="{
          name: { isDisplayForDemo: false }
        }"
      >
        <template #country>
          <v-tag-dropdown value="country" display-all>
            <v-tag-option title>
              <span class="v-hidden-in-dropdown">
                <i class="fa fa-flag-o"></i>
              </span>
              <span class="v-hidden-in-tag">
                <i class="fa fa-flag"></i>
                {{ $t(`ui.general.Country`) }}
              </span>
            </v-tag-option>
            <v-tag-option value="Māre">
              {{ $t(`ui.data.country.Māre`) }}
            </v-tag-option>
            <v-tag-option value="Eldia">
              {{ $t(`ui.data.country.Eldia`) }}
            </v-tag-option>
          </v-tag-dropdown>
        </template>
      </GeneralDemo>
    </div>
  </div>
</template>
