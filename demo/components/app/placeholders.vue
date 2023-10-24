<template>
  <div id="placeholders" class="demo">
    <h4>Placeholders</h4>
    <div class="depiction">
      {{ $t("attributes.description.app.placeholder") }}

      <div class="sub-depiction">
        <p v-html="$t('attributes.description.app.placeholder__detail.1')"></p>
        <p v-html="$t('attributes.description.app.placeholder__detail.2')"></p>
      </div>
    </div>

    <hr />
    <div class="flex-between">
      <div class="placeholder attributes">
        <div class="attribute flex-between text">
          <div class="lebel">placeholder :</div>
          <div class="ui input">
            <input type="text" class="form-control" v-model="placeholder" />
          </div>
        </div>

        <div class="attribute">placeholders: {</div>
        <div class="placeholders attribute flex-between text">
          <div class="lebel">initial :</div>
          <div class="ui input">
            <input
              type="text"
              class="form-control"
              v-model="placeholders.initial"
            />
          </div>
        </div>

        <div class="placeholders attribute flex-between text">
          <div class="lebel">loading :</div>
          <div class="ui input">
            <input
              type="text"
              class="form-control"
              v-model="placeholders.loading"
              :disabled="loading == 'false'"
              :placeholder="`Wait a moment, please.`"
            />
          </div>
        </div>

        <div class="placeholders attribute flex-between text">
          <div class="lebel">selectDown :</div>
          <div class="ui input">
            <input
              type="text"
              class="form-control"
              v-model="placeholders.selectDown"
              :placeholder="`Selected End.`"
            />
          </div>
        </div>

        <div class="placeholders attribute flex-between text">
          <div class="lebel">finish :</div>
          <div class="ui input">
            <input
              type="text"
              class="form-control"
              v-model="placeholders.finish"
              :disabled="create == 'true'"
              :placeholder="`Finish.`"
            />
          </div>
        </div>

        <div class="placeholders attribute flex-between text">
          <div class="lebel">tagValueRepeat :</div>
          <div class="ui input">
            <input
              type="text"
              class="form-control"
              v-model="placeholders.tagValueRepeat"
              :placeholder="`repeat !`"
            />
          </div>
        </div>

        <div class="attribute">}</div>
      </div>
      <div class="app attributes">
        <LabelAndSelect
          label="conjunction"
          v-model="conjunction"
          :values="['AND', 'OR', 'null']"
        />
        <LabelAndSelect label="loading" v-model="loading" />
        <LabelAndSelect label="create" v-model="create" />
      </div>
    </div>

    <GeneralDemo
      :displayRefreshBtn="true"
      :app="{
        create: create == 'true' ? true : false,
        loading: loading == 'true' ? true : false,
        conjunction: conjunction,
        placeholder: placeholder,
        placeholders: placeholders,
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
      loading: "false",
      create: "false",
      conjunction: "AND",

      placeholder: "",
      placeholders: {
        initial: "",
        loading: "",
        selectDown: "",
        finish: "",
        tagValueRepeat: "",
      },
    };
  },
};
</script>

<style scoped lang="scss">
.attributes {
  width: 50%;
  padding: 0 12px;
}
.attribute {
  margin-bottom: 6px;
  .lebel {
    width: 180px;
  }
}
.placeholders.attribute {
  margin-left: 12px;
}
.selectDownPlaceholder__detail {
  padding-left: 12px;
}
@media all and (max-width: 768px) {
  .attributes {
    &:first-child {
      width: 60%;
    }
    &:last-child {
      width: 40%;
    }
  }
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
}
@media all and (max-width: 490px) {
  .app.attributes .attribute {
    flex-direction: column;
    align-items: flex-end;
  }
}
</style>
