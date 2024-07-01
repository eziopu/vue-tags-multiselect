<template>
  <div id="dropdown-loading" class="demo">
    <ToolTitle>Dropdown loading</ToolTitle>

    <div class="depiction">
      {{ $t(`attributes.app.dropdownLoading`) }}
      <div class="sub-depiction">
        <p
          v-html="$t(`attributes.slots.dropdown-loading__notice`)"
        ></p>
      </div>
    </div>

    <div class="attributes">
      <LabelAndControls
        label="dropdownLoading"
        v-model="attributes.dropdownLoading"
        :disabled="attributes.loading == 'true'"
      />

      <LabelAndControls
        model="input"
        class="flex-column"
        label="dropdown loading icon slot"
        v-model="attributes.dropdownLoadingContent"
      />

    </div>
  </div>
</template>

<script>

export default {
  name: "app-dropdown-loading",
  inject: ["getLoadingAttributes"],
  computed: {
    attributes() {
      return this.getLoadingAttributes();
    },
  },
};
</script>