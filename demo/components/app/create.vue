<template>
  <div id="create" class="demo">
    <h3>Create</h3>
    <div class="depiction">
      {{ $t("attributes.description.app.create") }} <br />
      {{ $t("attributes.description.app.create__notice") }}
    </div>

    <hr />
    <div class="attributes flex-between">
      <LabelAndSelect label="create" v-model="create" />
      <LabelAndSelect label="search" v-model="search" />
    </div>

    <GeneralDemo
      :app="{
        create: create == 'true' ? true : false,
        search: search == 'true' ? true : false,
      }"
    ></GeneralDemo>
  </div>
</template>

<script>
import GeneralDemo from "../tools/general-demo.vue";
import LabelAndSelect from "../tools/label-and-select.vue";

export default {
  name: "app-create",
  components: {
    LabelAndSelect,
    GeneralDemo,
  },
  data() {
    return {
      create: "true",
      search: "false",
    };
  },
};
</script>

<style scoped lang="scss">
.attributes {
  padding-right: 80px;
}
.attribute {
  margin-right: 12px;
  margin-bottom: 6px;
}
.attributes.flex-between {
  align-items: flex-start;
  justify-content: flex-start;
}
@media all and (max-width: 376px) {
  .attributes.flex-between {
    display: block;
  }
}
</style>
