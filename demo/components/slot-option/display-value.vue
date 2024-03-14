<template>
  <div id="option-display-value" class="demo">
    <h4>Display value</h4>
    <div class="depiction">
      {{ $t("attributes.description.option.display-value") }}
    </div>

    <div class="flex-between">
      <DisplayValue :appDisplayValue="true" />
      <DisplayValue :appDisplayValue="false" />
    </div>
  </div>
</template>

<script>
import DisplayValue from "./tools/display-value-diff-demo.vue";

export default {
  name: "option-display-value",
  components: {
    DisplayValue,
  },
};
</script>
<style scoped lang="scss">
.flex-between {
  div:first-child {
    width: 50%;
  }
  div:last-child {
    width: 40%;
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
