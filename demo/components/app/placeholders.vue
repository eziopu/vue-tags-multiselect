<script>
export default {
  name: 'app-placeholders'
}
</script>

<script setup>
import { ref } from 'vue'
import { ATTRIBUTES, ATTRIBUTE_ACCEPTED_VALUES } from '@models/attributes/default.js'
const defaults = ATTRIBUTES.placeholders

const i18nAppPath = 'attributes.app'
const attributes = ref({
  loading: false,
  create: false,
  conjunction: 'AND',
  placeholder: '',
  placeholders: {
    initial: '',
    loading: '',
    selectDown: '',
    finish: '',
    tagValueRepeat: ''
  }
})
</script>

<template>
  <div id="placeholders" class="demo">
    <ToolTitle>Placeholders</ToolTitle>

    <div class="depiction">
      <p>
        {{ $t(`${i18nAppPath}.placeholder`) }}
      </p>

      <ul>
        <li v-for="item in ['placeholder', 'placeholders', 'remark']" :key="item">
          <p>
            <span v-if="item != 'remark'">{{ item }}:</span>
            {{ $t(`${i18nAppPath}.placeholder__details.${item}`) }}
          </p>
        </li>
      </ul>
    </div>

    <div class="flex-between to5-5">
      <div class="placeholder attributes">
        <LabelAndControls
          class="flex-between to4-6"
          model="input"
          label="placeholder"
          v-model="attributes.placeholder"
        />
        <div class="attribute">placeholders: {</div>
        <div class="placeholders__attribute">
          <LabelAndControls
            class="flex-between to4-6"
            model="input"
            label="initial"
            v-model="attributes.placeholders.initial"
          />
          <LabelAndControls
            class="flex-between to4-6"
            model="input"
            label="loading"
            v-model="attributes.placeholders.loading"
            :disabled="attributes.loading == false"
            :placeholder="defaults.loading"
          />
          <LabelAndControls
            class="flex-between to4-6"
            model="input"
            label="selectDown"
            v-model="attributes.placeholders.selectDown"
            :disabled="attributes.create == false"
            :placeholder="defaults.selectDown"
          />
          <LabelAndControls
            class="flex-between to4-6"
            model="input"
            label="finish"
            v-model="attributes.placeholders.finish"
            :disabled="attributes.create == true"
            :placeholder="defaults.finish"
          />
          <LabelAndControls
            class="flex-between to4-6"
            model="input"
            label="tagValueRepeat"
            v-model="attributes.placeholders.tagValueRepeat"
            :placeholder="defaults.tagValueRepeat"
          />
        </div>
        <div class="attribute">}</div>
      </div>

      <div class="app attributes">
        <LabelAndControls
          label="conjunction "
          v-model="attributes.conjunction"
          :values="ATTRIBUTE_ACCEPTED_VALUES.conjunction"
          model="radio"
        />
        <LabelAndControls label="loading" v-model="attributes.loading" />
        <LabelAndControls label="create" v-model="attributes.create" />

        <div class="depiction">
          <ul style="margin-left: -12px; margin-top: 20px">
            <li v-for="attribute in ['loading', 'selectDown', 'finish']" :key="attribute">
              <p>
                {{ attribute }}:
                <span v-html="$t(`${i18nAppPath}.placeholders.${attribute}__notice`)"></span>
              </p>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <GeneralDemo :app="attributes"></GeneralDemo>
  </div>
</template>

<style scoped lang="scss">
.placeholders__attribute {
  padding-left: 1rem;
}
</style>
