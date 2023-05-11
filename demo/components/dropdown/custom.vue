<template>
  <div id="dropdown-custom" class="demo">
    <h4>Custom</h4>
    <div class="depiction">
      {{ $t("attributes.description.dropdown.custom") }} <br />
      *{{ $t("ui.page.sentence.click_the_tag_to_edit_mode") }}
    </div>

    <div class="flex-between">
      <CustomDiffDemo :appCustomer="true" />
      <CustomDiffDemo :appCustomer="false" />
    </div>
  </div>
</template>

<script>
import CustomDiffDemo from "./tools/custom-diff-demo.vue";

export default {
  name: "dropdown-custom",
  components: {
    CustomDiffDemo,
  },
};
</script>
<style scoped lang="scss">
.flex-between {
  div:last-child {
    width: 40%;
  }
  @media all and (max-width: 1200px) {
    div:last-child {
      width: 30%;
    }
  }
  @media all and (max-width: 992px) {
    & {
      flex-direction: column;
    }
    div:first-child,
    div:last-child {
      width: 100%;
    }
    div:last-child {
      margin-top: 24px;
    }
  }
}
</style>
