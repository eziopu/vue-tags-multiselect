<template>
  <div class="v-partial-loading">
    <i class="v-partial-loading__icon"></i>
  </div>
</template>

<script>
export default {
  name: "partial-loading",
};
</script>

<style scoped lang="scss">
.v-partial-loading {
  & {
    display: flex;
    align-items: center;
  }
  i.v-partial-loading__icon {
    border: 4px solid #ebebeb;
    border-top: 4px solid #c8c8c8;
    border-radius: 80%;
    width: 16px;
    height: 16px;
    animation: spin 1s linear infinite;
  }
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
}
</style>
