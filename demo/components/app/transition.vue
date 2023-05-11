<template>
  <div id="Transition" class="demo">
    <h4>Transition</h4>
    <div class="depiction">
      {{ $t("attributes.description.app.transition") }}
    </div>

    <hr />
    <div class="attributes flex-between">
      <LabelAndSelect label="transition" v-model="transition" />
    </div>

    <GeneralDemo
      :app="{
        transition: transition == 'true' ? true : false,
      }"
    ></GeneralDemo>
  </div>
</template>

<script>
import GeneralDemo from "../tools/general-demo.vue";
import LabelAndSelect from "../tools/label-and-select.vue";

export default {
  name: "app-transition",
  components: {
    LabelAndSelect,
    GeneralDemo,
  },
  data() {
    return {
      transition: "true",
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
</style>
