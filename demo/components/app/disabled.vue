<template>
  <div id="disabled" class="demo">
    <h3>Disabled</h3>
    <div class="depiction">
      {{ $t("attributes.description.app.disabled") }}
    </div>

    <hr />
    <div class="attributes flex-between">
      <LabelAndSelect label="disabled" v-model="attributes.disabled" />
    </div>

    <GeneralDemo
      :app="attributes"
    ></GeneralDemo>
  </div>
</template>

<script>
export default {
  name: "app-disabled",
  data() {
    return {
      attributes: {
        disabled: true,
      }
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
