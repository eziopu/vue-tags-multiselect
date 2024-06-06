<template>
  <div class="v-partial__close-icon" :class="{ disabled: disabled }">
    <div class="v-partial__close-icon--left"></div>
    <div class="v-partial__close-icon--right"></div>
  </div>
</template>

<script>
export default {
  name: 'partial-close',
  props: {
    disabled: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped lang="scss">
.v-partial__close-icon {
  position: relative;
  width: 26px;
  display: inline-flex;
  align-items: center;
  align-content: center;
  justify-content: center;
  transition: background-color 0.5s ease;

  border-top-right-radius: inherit;
  border-bottom-right-radius: inherit;

  &:not(.disabled) {
    cursor: pointer;
  }

  .v-partial__close-icon--left,
  .v-partial__close-icon--right {
    position: relative;
    width: 2px;
    height: 18px;
    background-color: #a2a2a2;
    transition: background-color 0.5s ease;
  }

  .v-partial__close-icon--left {
    transform: rotate(-45deg);
  }

  .v-partial__close-icon--right {
    margin-left: -2px;
    transform: rotate(45deg);
  }
}
</style>
