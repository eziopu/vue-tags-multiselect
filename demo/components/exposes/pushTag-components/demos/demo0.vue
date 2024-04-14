<script>
export default {
  name: "exposes-pushTag__demo0",
};
</script>

<script setup>
import { ref, nextTick } from "vue";
import ShowCode from "./show-codes/demo0.vue";

const demoStatus = ref([]);

/* demo use*/
const elGeneralDemo = ref(null);
const height1 = ref(null);
const height2 = ref(null);
const elInputHeight1 = ref(null);
const elInputHeight2 = ref(null);

const inputHeight = async () => {
  await nextTick();
  if (
    height1.value == height2.value ||
    (height2.value != undefined && height1.value == undefined)
  ) {
    elInputHeight1.value.focus();
    return;
  }
  if (height1.value != undefined && height2.value == undefined) {
    elInputHeight2.value.focus();
    return;
  }
  if (Number(height1.value) != 0 && Number(height2.value) != 0) {
    pushHeightValue();
  }
  return;
}
const pushHeightValue = async () => {
  await nextTick();
  if (elGeneralDemo.value) {
    elGeneralDemo.value.$.refs.VTagsMultiselect.pushTag({
      key: "height",
      value: `${height1.value} ~ ${height2.value}`,
    });

    elInputHeight1.value.blur();
    elInputHeight2.value.blur();
  }
}

const i18n = "attributes.description.exposes.pushTag.demo0";
const dropdownDisplayAll = ref(true);
</script>

<template>
  <div id="exposes-pushTag__pushTag-demo0" class="demo" :class="demoStatus">
    <h4 class="ui title method-pushTag__parameter--title">
      Demo : In option
    </h4>

    <div class="depiction">
      <p v-html="$t(`${i18n}.description`)"></p>
      
      <div class="sub-depiction">
        *<span v-html="$t(`${i18n}.notice`)"></span>
        <p v-html="$t(`${i18n}.comment`)"></p>
      </div>

    </div>

    <div class="flex-between to6-4">
      <div>
        <LabelAndControls
          label="v-tag-dropdown display-all"
          v-model="dropdownDisplayAll"
        />
        <ShowCode :dropdownDisplayAll="dropdownDisplayAll" />
      </div>

      <GeneralDemo
        ref="elGeneralDemo"
        v-model="demoStatus"
        :autoFocus="true"
        :displayOutput="true"
        :displayRefreshBtn="true"
        :displayShowCodeBtn="false"
        :dropdown="{
          name: {isDisplayForDemo: false},
        }"
      >
        <template #remark>
          <v-tag-dropdown value="height" :displayAll="dropdownDisplayAll">
            <v-tag-option title>
              <i class="fa fa-user"></i> {{ $t("ui.general.Height(m)") }}
            </v-tag-option>
            <v-tag-option>
              <input
                type="number"
                name="height1"
                min="1"
                :max="height2 || 60"
                style="width: 5em"
                :placeholder="`0 ~ ${height2 || 60}`"
                v-model="height1"
                ref="elInputHeight1"
                @keydown.enter="inputHeight()"
              />
              ~
              <input
                type="number"
                name="height2"
                :min="Number(height1) + 1 || 0"
                max="60"
                style="width: 5em"
                :placeholder="`${Number(height1) + 1 || 0} ~ 60`"
                v-model="height2"
                ref="elInputHeight2"
                @keydown.enter="inputHeight()"
              />
            </v-tag-option>
          </v-tag-dropdown>
        </template>
      </GeneralDemo>

    </div>
  </div>
</template>

<style scoped lang="scss">
@import "../../assets/stylesheets.scss";

@media (max-width: 576px) {
  .v-tags-multiselect {
    margin-top: 1rem;
  }
}
</style>