<script>
export default {
  name: 'custom-style__v-tag-dropdown--class'
}
</script>
<script setup>
import { ref } from 'vue'
import ShowCode from './show-html-code/v-tag-dropdown__class.vue'
import ShowCodeStyle from './show-html-code/v-tag-dropdown__class-style.vue'

// const i18n = 'attributes.option'
const demoStatus = ref([])
</script>

<template>
  <div id="custom-style__v-tag-dropdown--class" class="demo" :class="demoStatus">
    <ToolTitle>&lt;v-tag-dropdown&gt; class</ToolTitle>

    <div class="flex-between to5-5">
      <div class="depiction">
        <p>在 <code class="tag">&lt;v-tag-dropdown&gt;</code> 定義的class name 會套用在 v-tag 上</p>

        <ShowCodeStyle />
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
          <v-tag-dropdown value="country" display-all class="v-red">
            <v-tag-option title>
              <i class="fa fa-flag"></i>
              {{ $t(`ui.general.Country`) }}
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

<style lang="scss">
#custom-style__v-tag-dropdown--class {
  .v-dropdown.v-red {
    color: red;
  }
  .v-dropdown.v-red .v-option.title {
    font-weight: bold;
  }
  .v-tag.v-red {
    color: white;
    background: red;
  }
  .v-tag.v-red .v-tag__title {
    font-weight: bold;
    background: #ff6666;
  }
}
</style>
