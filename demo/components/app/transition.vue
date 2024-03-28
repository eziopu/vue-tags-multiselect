<template>
  <div id="Transition" class="demo">
    <h3>Transition</h3>
    <div class="depiction">
      {{ $t("attributes.description.app.transition") }}
    </div>

    <hr />
    <div class="attributes flex-between">
      <LabelAndSelect label="transition" v-model="transition" />
    </div>

    <GeneralDemo
      :app="{
        transition: transition,
      }"
    ></GeneralDemo>
  </div>
</template>

<script>
export default {
  name: "app-transition",
  data() {
    return {
      transition: true,
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
