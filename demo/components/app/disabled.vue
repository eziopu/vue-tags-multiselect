<template>
  <div id="disabled" class="demo">
    <h4>Disabled</h4>
    <div class="depiction">
      {{ $t("attributes.description.app.disabled") }}
    </div>

    <hr />
    <div class="attributes flex-between">
      <LabelAndSelect label="disabled" v-model="disabled" />
    </div>

    <GeneralDemo
      :app="{
        disabled: disabled == 'true' ? true : false,
      }"
    ></GeneralDemo>
  </div>
</template>

<script>
import GeneralDemo from "../tools/general-demo.vue";
import LabelAndSelect from "../tools/label-and-select.vue";

export default {
  name: "app-disabled",
  components: {
    LabelAndSelect,
    GeneralDemo,
  },
  data() {
    return {
      disabled: "true",
    };
  },
};
</script>

<style scoped lang="scss">
.attributes {
  padding-right: 80px;
}
.attribute {
  margin-bottom: 6px;
}
@media all and (max-width: 768px) {
  .flex-between.text {
    display: block !important;
  }
}
@media all and (max-width: 992px) {
  .attributes {
    flex-wrap: wrap;
  }
  .attribute {
    &:nth-child(1) {
      width: 50%;
    }
    &:nth-child(2) {
      width: 50%;
    }
  }
}
@media all and (max-width: 470px) {
  .attribute {
    &:nth-child(1) {
      width: 100%;
    }
    &:nth-child(2) {
      width: 100%;
    }
  }
}
</style>
