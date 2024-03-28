<template>
  <div id="placeholders" class="demo">
    <ToolTitle>Placeholders</ToolTitle>

    <div class="depiction">
      {{ $t(`${i18nAppPath}.placeholder`) }}

      <div class="sub-depiction">
        <p>
          placeholder:
          {{ $t(`${i18nAppPath}.placeholder__detail.placeholder`) }}
        </p>
        <p>
          placeholders:
          {{ $t(`${i18nAppPath}.placeholder__detail.placeholders`) }}
        </p>
        <p>
          *
          {{ $t(`${i18nAppPath}.placeholder__detail.remark`) }}
        </p>
      </div>
    </div>

    <div class="flex-between">
      <div class="placeholder attributes">
        <div class="attribute flex-between text">
          <div class="lebel">placeholder :</div>
          <div class="ui input">
            <input type="text" class="form-control" v-model="attributes.placeholder" />
          </div>
        </div>

        <div class="attribute">placeholders: {</div>
        <div class="placeholders attribute flex-between text">
          <div class="lebel">initial :</div>
          <div class="ui input">
            <input
              type="text"
              class="form-control"
              v-model="attributes.placeholders.initial"
            />
          </div>
        </div>

        <div class="placeholders attribute flex-between text">
          <div class="lebel">loading :</div>
          <div class="ui input">
            <input
              type="text"
              class="form-control"
              v-model="attributes.placeholders.loading"
              :disabled="attributes.loading == false"
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
              v-model="attributes.placeholders.selectDown"
              :disabled="attributes.create == false"
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
              v-model="attributes.placeholders.finish"
              :disabled="attributes.create == true"
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
              v-model="attributes.placeholders.tagValueRepeat"
              :placeholder="`repeat !`"
            />
          </div>
        </div>

        <div class="attribute">}</div>
      </div>
      <div class="app attributes">
        <LabelAndSelect
          label="conjunction"
          v-model="attributes.conjunction"
          :values="['AND', 'OR', 'null']"
        />
        <LabelAndSelect label="loading" v-model="attributes.loading" />
        <LabelAndSelect label="create" v-model="attributes.create" />

        <div class="depiction">
          <div class="attribute">
            loading:
            <span
              v-html="$t(`${i18nAppPath}.placeholders.loading__detail.1`)"
            ></span>
          </div>
          <div class="attribute">
            selectDown:
            <span
              v-html="$t(`${i18nAppPath}.placeholders.selectDown__detail.1`)"
            ></span>
          </div>
          <div class="attribute">
            finish:
            <span
              v-html="$t(`${i18nAppPath}.placeholders.finish__detail.1`)"
            ></span>
          </div>
        </div>
      </div>
    </div>

    <GeneralDemo
      :displayRefreshBtn="true"
      :app="attributes"
    >
    </GeneralDemo>
  </div>
</template>

<script>
export default {
  name: "app-placeholders",
  data() {
    return {
      i18nAppPath: "attributes.description.app",
      attributes: {
        loading: false,
        create: false,
        conjunction: "AND",
  
        placeholder: "",
        placeholders: {
          initial: "",
          loading: "",
          selectDown: "",
          finish: "",
          tagValueRepeat: "",
        },
      }
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

.depiction .attribute {
  margin-bottom: 12px;
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
  .demo > .flex-between {
    flex-direction: column;
  }
  .attributes {
    &:first-child {
      width: 100%;
    }
    &:last-child {
      width: 100%;
    }
  }
  .ui.input {
    width: 100%;
  }
  .app.attributes .attribute {
    max-width: 100%;
  }
}
</style>
