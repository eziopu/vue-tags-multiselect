<script>
export default {
  name: 'play-slots-simple'
}
</script>
<script setup>
import { inject } from 'vue'

const framework = inject('framework')
const appSlots = inject('slots')
</script>

<template>
  <div
    id="play-slots-simple"
    class="simple attributes"
    :class="{
      ui: framework == 'semantic-ui',
      default: framework == 'default'
    }"
  >
    <template v-for="(appSlot, key) in appSlots" :key="key">
        <LabelAndControls
          :label="key != 'optionORConjunction' ? $toKebabCase(key) : 'option-OR-conjunction'"
          model="input"
          v-model="appSlot.value"
        />
      </template>
      
    <!-- 
    <div class="flex-between text">
      <div>loading</div>
      <div class="ui input">
        <input type="text" class="form-control" v-model="app.loadingContent" />
      </div>
    </div>
    <div class="flex-between text">
      <div>tag-conjunction</div>
      <div class="ui input">
        <input
          type="text"
          class="form-control"
          v-model="app.tagConjunctionContent"
          :disabled="app.merge == 'false'"
          :placeholder="`&`"
        />
      </div>
    </div>
    <div class="flex-between text">
      <div>option-undo</div>
      <div class="ui input relative">
        <input type="text" class="form-control" v-model="app.optionUndoContent" />
        <div class="demo__fake-placeholder" v-if="app.optionUndoContent == ''">
          <i class="demo__arrow-left"></i>Undo
        </div>
      </div>
    </div>
    <div class="flex-between text">
      <div>option-OR-conjunction</div>
      <div class="ui input">
        <input
          type="text"
          class="form-control"
          v-model="app.optionORConjunctionContent"
          :placeholder="`OR`"
        />
      </div>
    </div>
    -->
    <div class="clear"></div>
  </div>
</template>
