<template>
  <div id="option-title" class="demo">
    <h3>Title</h3>

    <div class="flex-between to5-5">
      <div class="depiction">
        {{ $t("attributes.description.option.title") }}
        <ALineCode :bolders="['title']" />
      </div>

      <div class="demo-app">
        <GeneralDemo
          :autoFocus="true"
          :displayOutput="true"
          :displayRefreshBtn="true"
          :displayShowCodeBtn="false"
          :app="{
            placeholder: 'click country option!'
          }"
        />
      </div>
    </div>
  </div>
</template>

<script>
import ALineCode from "./tools/a-line-code.vue";
import GeneralDemo from "../tools/general-demo.vue";

export default {
  name: "option-title",
  components: {
    ALineCode,
    GeneralDemo,
  },
};
</script>
