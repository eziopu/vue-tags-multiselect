<script>
export default {
  name: "methods-pushTag__demo0",
  data() {
    return {
      demoStatus: [],
      // I don't know use ref([]) template don't work
      // The situation remains the same with use "getCurrentInstance().ctx.$forceUpdate" 
    };
  },
};
</script>

<script setup>
import { ref, nextTick } from "vue";
import ShowCode from "./show-codes/demo0.vue";

const elVTagsMultiselect = ref(null);
// const demoStatus = ref([]);
const demoResult = ref({});

/* auto focus app*/
const autoFocusocusinApp = async () => {
  await nextTick();
  if (elVTagsMultiselect.value) {
    elVTagsMultiselect.value.isActive = true;
  }
}
autoFocusocusinApp();

/* demo use*/
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
  elVTagsMultiselect.value.pushTag({
    key: "height",
    value: `${height1.value} ~ ${height2.value}`,
  });

  if (elInputHeight1.value) {
    elInputHeight1.value.blur();
    elInputHeight2.value.blur();
  }
}
</script>

<template>
  <div id="methods-pushTag__pushTag-demo0" class="demo" :class="demoStatus">
    <h4 class="ui title method-pushTag__parameter--title">
      Demo : In option
    </h4>

    <div class="depiction">
      <p>
        {{ $t("attributes.description.methods.pushTag.1") }}
      </p>
      
      <div class="sub-depiction">
      </div>
    </div>

    <div class="flex-between to6-4">
      <div>
        <ShowCode />
      </div>

      <v-tags-multiselect
        v-model="demoResult"
        ref="elVTagsMultiselect"
        @status="(e) => (demoStatus = e)"
      >
        <v-tag-dropdown value="country">
          <v-tag-option title>
            <i class="fa fa-flag"></i> {{ $t("ui.general.Country") }}
          </v-tag-option>
          <v-tag-option value="Māre">{{
            $t("ui.data.country.Māre")
          }}</v-tag-option>
          <v-tag-option value="Eldia">{{
            $t("ui.data.country.Eldia")
          }}</v-tag-option>
        </v-tag-dropdown>

        <v-tag-dropdown value="height" display-all>
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
      </v-tags-multiselect>
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