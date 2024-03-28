<template>
  <div id="delete-icon" class="demo">
    <ToolTitle>Delete icon</ToolTitle>

    <div class="depiction">
      {{ $t("attributes.description.app.deleteIcon") }}
      *{{ $t("attributes.description.app.deleteIcon__notice") }}
      <div class="sub-depiction">
        <p>
          {{ $t("attributes.description.app.deleteIcon__detail.1") }}
        </p>
        <p>
          {{ $t("attributes.description.app.deleteIcon__detail.2") }}
        </p>
        <p>
          {{ $t("attributes.description.app.deleteIcon__detail.3") }}
        </p>
      </div>
    </div>

    <div class="attributes flex-between">
      <LabelAndSelect label="merge" v-model="attributes.merge" />
      <LabelAndSelect
        label="deleteIcon"
        v-model="attributes.deleteIcon"
        :values="['always', 'edit', 'none']"
      />
    </div>

    <GeneralDemo
      :displayRefreshBtn="true"
      :option="{
        country: [{}, {selected: true}, {selected: true}],
      }"
      :app="attributes"
    >
    </GeneralDemo>
  </div>
</template>

<script>

export default {
  name: "app-delete-icon",
  data() {
    return {
      attributes: {
        merge: true,
        deleteIcon: "always",
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
