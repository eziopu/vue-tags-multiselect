<template>
  <div id="conjunction" class="demo">
    <h4>Conjunction</h4>
    <div class="depiction">
      {{ $t("attributes.description.app.conjunction") }},
      {{ $t("ui.general.defaultIs__key", { key: "null" }) }}
      <div class="sub-depiction">
        <p>
          {{ $t("attributes.description.app.conjunction__detail.1") }}
        </p>
        <p>
          {{ $t("attributes.description.app.conjunction__detail.2") }}
        </p>
        <p>
          {{ $t("attributes.description.app.conjunction__detail.3") }}
        </p>
      </div>
    </div>

    <hr />
    <div class="attributes flex-between">
      <LabelAndSelect
        label="conjunction"
        :values="['AND', 'OR', 'null']"
        v-model="conjunction"
      />
      <LabelAndSelect
        label="merge"
        :disabled="conjunction == 'AND'"
        v-model="merge"
        :class="{ disable: conjunction == 'AND' }"
      />
    </div>

    <GeneralDemo
      :app="{
        merge: merge == 'true' ? true : false,
        conjunction: conjunction,
      }"
    ></GeneralDemo>
  </div>
</template>

<script>
import GeneralDemo from "../tools/general-demo.vue";
import LabelAndSelect from "../tools/label-and-select.vue";

export default {
  name: "app-conjunction",
  components: {
    LabelAndSelect,
    GeneralDemo,
  },
  props: {
    theme: {
      type: String,
      default: () => {
        return "default";
      },
    },
  },
  data() {
    return {
      conjunction: "null",
      merge: "true",
      show_code: false,
      result: [],
    };
  },
};
</script>

<style scoped lang="scss">
.attributes {
  padding-right: 80px;
}
.attribute {
  margin-right: 12px;
  margin-bottom: 6px;
}
.attributes.flex-between {
  align-items: flex-start;
  justify-content: flex-start;
}
@media all and (max-width: 376px) {
  .attributes.flex-between {
    display: block;
  }
}
</style>
