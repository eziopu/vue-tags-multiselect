<script>
export default {
  name: 'dropdown-other-attributes'
}
</script>

<script setup>
import { reactive } from 'vue'
import ALineCode from './tools/a-line-code.vue'

const attributes = reactive({
  displayAll: false,
  disabled: false,
  divided: false,
  hidden: false
})
</script>

<template>
  <div id="dropdown-other-attributes" class="demo">
    <hr />

    <div class="flex-between to6-4">
      <div class="attributes">
        <div class="attribute">
          <h3>Hidden</h3>
          <div class="flex-between">
            <div class="depiction">
              {{ $t(`attributes.dropdown.hidden`) }}
            </div>
            <LabelAndControls label="" v-model="attributes.hidden" />
          </div>
        </div>
        <div class="attribute">
          <h3>DisplayAll</h3>
          <div class="flex-between">
            <div class="depiction">
              {{ $t(`attributes.dropdown.display-all`) }}
            </div>
            <LabelAndControls
              label=""
              v-model="attributes.displayAll"
              :disabled="attributes.hidden == true"
            />
          </div>
        </div>
        <div class="attribute">
          <h3>Disabled</h3>
          <div class="flex-between">
            <div class="depiction">
              {{ $t(`attributes.dropdown.disabled`) }}
            </div>
            <LabelAndControls
              label=""
              :disabled="attributes.hidden == true"
              v-model="attributes.disabled"
            />
          </div>
        </div>
        <div class="attribute">
          <div style="display: flex; align-items: center">
            <h3>Divided</h3>
            <small style="margin-left: 0.6rem"
              >*{{ $t(`ui.page.sentence.notice.change_the_second`) }}</small
            >
          </div>
          <div class="flex-between">
            <div class="depiction">
              {{ $t(`attributes.dropdown.divided`) }}
            </div>
            <LabelAndControls
              label=""
              v-model="attributes.divided"
              :disabled="attributes.hidden == true"
            />
          </div>
        </div>

        <ALineCode :bolders="$objectKeyToArray(attributes, true)" />
      </div>

      <div class="demo-app">
        <h4>
          <p>
            *
            {{
              $t(
                `ui.page.sentence.The_attributes_changes_in_this_demo_will_only_affect_the_first_dropdown`
              )
            }}
          </p>
          <p>
            {{ $t(`ui.page.sentence.Some_attributes_will_change_the_second_dropdown`) }}
          </p>
        </h4>
        <GeneralDemo
          :autoFocus="true"
          :displayShowCodeBtn="false"
          :dropdown="{
            country: {
              displayAll: attributes.displayAll,
              disabled: attributes.disabled,
              hidden: attributes.hidden
            },
            name: {
              divided: attributes.divided
            }
          }"
        />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.attributes {
  margin-bottom: 1rem;
}
</style>
