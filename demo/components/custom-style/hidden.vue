<script>
export default {
  name: 'custom-style__hidden'
}
</script>
<script setup>
import { ref } from 'vue'
import ShowCode from './show-html-code/hidden.vue'

// const i18n = 'attributes.option'
const demoStatus = ref([])
</script>

<template>
  <div id="custom-style__hidden" class="demo" :class="demoStatus">
    <ToolTitle>Streamline hiding</ToolTitle>

    <div class="flex-between to5-5">
      <div class="depiction">
        <p>提供一個簡易的方式在 <code class="tag">&lt;v-tag-option&gt;</code> 內隱藏的class name</p>
        <p>由於會複製option的html內容，也可以自行加入自定義的樣式</p>

        <ul>
          <li>
            <p>v-hidden-in-dropdown : 僅在dropdown內隱藏</p>
          </li>
          <li>
            <p>v-hidden-in-tag : 僅在成為tag後隱藏</p>
          </li>
        </ul>

        <ShowCode />
      </div>

      <GeneralDemo
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
            <v-tag-option value="Māre" class="v-country-value">
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

<style scoped lang="scss">
@import './assets/stylesheets.scss';
</style>
