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

    <div class="flex-between to5-5">
      <div class="placeholder attributes">
        <LabelAndControls
          class="flex-between to4-6"
          model="input"
          label="placeholder"
          v-model="attributes.placeholder"
        />

        <div class="attribute">placeholders: {</div>
          <div class="placeholders__attribute">
            <LabelAndControls
              class="flex-between to4-6"
              model="input"
              label="initial"
              v-model="attributes.placeholders.initial"
            />
            <LabelAndControls
              class="flex-between to4-6"
              model="input"
              label="loading"
              v-model="attributes.placeholders.loading"
              :disabled="attributes.loading == false"
              :placeholder="`Wait a moment, please.`"
            />
            <LabelAndControls
              class="flex-between to4-6"
              model="input"
              label="selectDown"
              v-model="attributes.placeholders.selectDown"
              :disabled="attributes.create == false"
              :placeholder="`Selected End.`"
            />
            <LabelAndControls
              class="flex-between to4-6"
              model="input"
              label="finish"
              v-model="attributes.placeholders.finish"
              :disabled="attributes.create == true"
              :placeholder="`Finish.`"
            />
            <LabelAndControls
              class="flex-between to4-6"
              model="input"
              label="tagValueRepeat"
              v-model="attributes.placeholders.tagValueRepeat"
              :placeholder="`repeat !`"
            />
          </div>
        <div class="attribute">}</div>
      </div>

      <div class="app attributes">
        <LabelAndControls
          label="conjunction"
          v-model="attributes.conjunction"
          :values="['AND', 'OR', 'null']"
        />
        <LabelAndControls label="loading" v-model="attributes.loading" />
        <LabelAndControls label="create" v-model="attributes.create" />

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
.placeholders__attribute {
  padding-left: 1rem;
}
</style>