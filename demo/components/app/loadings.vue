<template>
  <div id="loadings" class="demo flex-between">
    <div class="demo-components">
      <Loading></Loading>
      <DropdownsLoading></DropdownsLoading>
    </div>

    <div class="demo-app" :class="appStatus">
      <GeneralDemo
        v-model="appStatus"
        :displayRefreshBtn="true"
        :autoFocus="true"
        :app="{
          loading: attributes.loading == 'true' ? true : false,
          dropdownLoading: attributes.dropdownLoading == 'true' ? true : false,
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

<script>
import Loading from "./loading.vue";
import DropdownsLoading from "./dropdowns-loading.vue";

export default {
  name: "app-loadings",
  components: {
    Loading,
    DropdownsLoading,
  },
  data() {
    return {
      attributes: {
        loading: "true",
        loadingContent: "",
        loadingPlaceholder: "",
        dropdownLoading: "false",
        dropdownLoadingContent: "",
      },
      appStatus: [],
    };
  },
  provide() {
    return {
      getLoadingAttributes: () => this.attributes,
    };
  },
};
</script>

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
