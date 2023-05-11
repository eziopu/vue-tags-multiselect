<template>
  <div id="tag-conjunction" class="demo">
    <h4>Placeholders</h4>
    <div class="depiction">
      {{ $t("attributes.description.app.placeholder") }}

      <div class="sub-depiction">
        <p v-html="$t('attributes.description.app.placeholder__detail.1')"></p>
        <p v-html="$t('attributes.description.app.placeholder__detail.2')"></p>
      </div>
    </div>

    <hr />
    <div class="attributes flex-between">
      <div class="attribute flex-between text">
        <div class="lebel">placeholder:</div>
        <div class="ui input">
          <input type="text" class="form-control" v-model="placeholder" />
        </div>
      </div>
      <LabelAndSelect
        label="conjunction"
        v-model="conjunction"
        :values="['AND', 'OR', 'null']"
        :disabled="true"
      />
    </div>
    <div class="attributes flex-between">
      <div class="attribute flex-between text">
        <div class="lebel">loadingPlaceholder:</div>
        <div class="ui input">
          <input
            type="text"
            class="form-control"
            v-model="loadingPlaceholder"
            :disabled="loading == 'false'"
            :placeholder="`Wait a moment, please.`"
          />
        </div>
      </div>
      <LabelAndSelect label="loading" v-model="loading" />
    </div>

    <div class="attributes flex-between selectDownPlaceholder">
      <div class="attribute flex-between text">
        <div class="lebel">selectDownPlaceholder:</div>
        <div class="ui input">
          <input
            type="text"
            class="form-control"
            v-model="selectDownPlaceholder"
            :placeholder="`Selected End.`"
          />
        </div>
      </div>
    </div>
    <p class="selectDownPlaceholder__detail">
      > {{ $t("attributes.description.app.selectDownPlaceholder__detail.1") }}
    </p>

    <div class="attributes flex-between">
      <div class="attribute flex-between text">
        <div class="lebel">finishPlaceholder:</div>
        <div class="ui input">
          <input
            type="text"
            class="form-control"
            v-model="finishPlaceholder"
            :disabled="create == 'true'"
            :placeholder="`Finish.`"
          />
        </div>
      </div>
      <LabelAndSelect label="create" v-model="create" />
    </div>

    <GeneralDemo
      :displayRefreshBtn="true"
      :app="{
        create: create == 'true' ? true : false,
        loading: loading == 'true' ? true : false,
        conjunction: conjunction,
        placeholder: placeholder,
        loadingPlaceholder: loadingPlaceholder || undefined,
        selectDownPlaceholder: selectDownPlaceholder || undefined,
        finishPlaceholder: finishPlaceholder || undefined,
      }"
    >
    </GeneralDemo>
  </div>
</template>

<script>
import GeneralDemo from "../tools/general-demo.vue";
import LabelAndSelect from "../tools/label-and-select.vue";

export default {
  name: "app-placeholders",
  components: {
    LabelAndSelect,
    GeneralDemo,
  },
  data() {
    return {
      placeholder: "",
      loadingPlaceholder: "",
      selectDownPlaceholder: "",
      finishPlaceholder: "",
      loading: "false",
      create: "false",
      conjunction: "AND",
    };
  },
};
</script>

<style scoped lang="scss">
.attributes {
  padding-right: 80px;
}
.attribute {
  margin-bottom: 6px;
  .lebel {
    width: 180px;
  }
}
.selectDownPlaceholder__detail {
  padding-left: 12px;
}
@media all and (max-width: 768px) {
  .attributes {
    flex-wrap: wrap;
    margin-bottom: 18px;
    .lebel {
      width: 100%;
    }
    .attribute.text {
      flex-wrap: wrap;
    }
    .attribute:nth-child(1) {
      order: 1;
      width: 100%;
    }
    .attribute:nth-child(2) {
      order: 0;
      max-width: 280px;
    }
  }
  .selectDownPlaceholder {
    margin-bottom: 0;
  }
  .selectDownPlaceholder__detail {
    margin-bottom: 18px;
  }
}
</style>
