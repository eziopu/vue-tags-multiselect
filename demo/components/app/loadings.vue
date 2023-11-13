<template>
  <div id="loadings" class="demo flex-between">
    <div class="demo-components">
      <Loading :app="app"></Loading>
      <DropdownsLoading :app="app"></DropdownsLoading>
    </div>

    <div class="demo-app" :class="appStatus">
      <GeneralDemo
        v-model="appStatus"
        :displayRefreshBtn="true"
        :autoFocus="true"
        :app="{
          loading: app.loading == 'true' ? true : false,
          loadingContent: app.loadingContent,
          loadingPlaceholder: app.loadingPlaceholder || undefined,
          dropdownLoading: app.dropdownLoading == 'true' ? true : false,
          dropdownLoadingContent: app.dropdownLoadingContent,
        }"
      ></GeneralDemo>
    </div>
  </div>
</template>

<script>
import Loading from "./loading.vue";
import DropdownsLoading from "./dropdowns-loading.vue";
import GeneralDemo from "../tools/general-demo.vue";

export default {
  name: "app-loadings",
  components: {
    Loading,
    DropdownsLoading,
    GeneralDemo,
  },
  data() {
    return {
      app: {
        loading: "true",
        loadingContent: "",
        loadingPlaceholder: "",
        dropdownLoading: "false",
        dropdownLoadingContent: "",
      },
      appStatus: [],
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

    .demo-app.selecting {
      margin-bottom: 230px;
    }
  }
}
</style>
