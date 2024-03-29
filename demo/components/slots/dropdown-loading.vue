<template>
  <div id="dropdown-loading" class="demo">
    <h3>Dropdown loading</h3>
    <div class="depiction">
      {{ $t("attributes.description.slots.dropdowns-loading") }}
      <div class="sub-depiction">
        <p v-html="$t('attributes.description.slots.dropdowns-loading__notice')"></p>
      </div>
    </div>

    <hr />
    <div class="attributes flex-between">
      <div class="attribute flex-between text">
        <span> dropdown-loading: </span>
        <div class="ui input relative">
          <input
            type="text"
            class="form-control"
            v-model="dropdownLoadingContent"
          />
          <div class="demo__fake-placeholder" v-if="dropdownLoadingContent == ''">
            <div class="demo__loading">
              <span>default: </span>
              <i class="demo__loading--icon"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="attributes flex-between">
      <LabelAndControls label="dropdownLoading" v-model="dropdownLoading" />
      <LabelAndControls label="loading" v-model="loading" />
    </div>

    <div class="code-block flex-between">
      <ShowHtmlCode
        class="a-line-code tag prettyprint lang-html customize"
        :app="{
          loading: loading,
          dropdownLoading: dropdownLoading,
        }"
        :slots="{
          dropdownLoading: dropdownLoadingContent || '...'
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
          dropdownLoading: dropdownLoading == 'true' ? true : false,
        }"
        :slots="{
          dropdownLoading: dropdownLoadingContent,
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
  name: "dropdown-loading",
  components: {
    ShowHtmlCode,
  },
  data() {
    return {
      loading: "false",
      dropdownLoading: "true",
      dropdownLoadingContent: "",
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
}

.attributes:not(:first-of-type) .attribute {
  margin-top: .6rem;
}

</style>
