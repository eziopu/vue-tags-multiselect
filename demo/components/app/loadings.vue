<script>
export default {
  name: 'app-loadings'
}
</script>

<script setup>
import { reactive, provide } from 'vue'
import Loading from "./loading.vue";
import DropdownLoading from "./dropdown-loading.vue";

const attributes = reactive({
  loading: true,
  loadingContent: "",
  loadingPlaceholder: "",
  dropdownLoading: false,
  dropdownLoadingContent: "",
});

const appStatus = reactive([]);

provide('getLoadingAttributes', () => attributes);

</script>

<template>
  <div id="loadings" class="demo flex-between">
    <div class="demo-components">
      <Loading></Loading>
      <DropdownLoading></DropdownLoading>
    </div>

    <div class="demo-app" :class="appStatus">
      <GeneralDemo
        v-model="appStatus"
        :autoFocus="true"
        :app="{
          loading: attributes.loading,
          dropdownLoading: attributes.dropdownLoading,
          placeholders: {
            loading: attributes.loadingPlaceholder || undefined,
          },
        }"
        :slots="{
          loading: attributes.loadingContent,
          dropdownLoading: attributes.dropdownLoadingContent,
        }"
      ></GeneralDemo>
    </div>
  </div>
</template>

<style scoped lang="scss">
#loadings.flex-between {
  display: flex;
  justify-content: space-between;

  .demo-components,
  .demo-app {
    width: 48%;
  }

  .demo-app {
    margin-top: 60px;
  }
}

@media all and (max-width: 992px) {
  #loadings.flex-between {
    display: block;

    .demo-components,
    .demo-app {
      width: 100%;
    }
  }
}
</style>
