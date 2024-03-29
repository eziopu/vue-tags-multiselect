<template>
  <div id="loading" class="demo">
    <h3>Loading</h3>
    <div class="depiction">
      {{ $t("attributes.description.slots.loading") }}
    </div>

    <hr />
    <div class="attributes flex-between">
      <div class="attribute flex-between text">
        <span> loading: </span>
        <div class="ui input relative">
          <input
            type="text"
            class="form-control"
            v-model="loadingContent"
          />
          <div class="demo__fake-placeholder" v-if="loadingContent == ''">
            <div class="demo__loading">
              <span>default: </span>
              <i class="demo__loading--icon"></i>
            </div>
          </div>
        </div>
      </div>
      <LabelAndControls label="loading" v-model="loading" />
    </div>

    <div class="code-block flex-between">
      <ShowHtmlCode
        class="a-line-code tag prettyprint lang-html customize"
        :app="{
          loading: loading,
        }"
        :slots="{
          loading: loadingContent || '...',
        }"
        :dropdown="{
          name: {isDisplayForDemo: false},
          remark: {isDisplayForDemo: false}
        }"
      />

      <GeneralDemo
        class="demo-app"
        :autoFocus="true"
        :displayRefreshBtn="true"
        :displayShowCodeBtn="false"
        :app="{
          loading: loading == 'true' ? true : false,
        }"
        :slots="{
          loading: loadingContent,
        }"
        :dropdown="{
          name: {isDisplayForDemo: false}
        }"
      />
    </div>
  </div>
</template>

<script>
import ShowHtmlCode from "../tools/show-html-code/main.vue"

export default {
  name: "loading-slot",
  components: {
    ShowHtmlCode,
  },
  data() {
    return {
      loading: "true",
      loadingContent: "",
    };
  },
};
</script>

<style scoped lang="scss">
@import "./assets/stylesheets.scss";
.attributes.flex-between {
  width: 50%;
  @media all and (max-width: 992px) {
    width: 100%;
  }
}

@media all and (max-width: 500px) {
  .attributes {
    flex-direction: column;
  }
  .attribute:last-child {
    margin-top: .6rem;
  }
}

</style>
