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

    <div class="attributes with-demo-control grid">
      <LabelAndControls label="merge" v-model="attributes.merge" />
      <LabelAndControls
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
