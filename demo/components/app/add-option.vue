<template>
  <div id="add-option" class="demo">
    <ToolTitle>Add option</ToolTitle>

    <div class="depiction">
      <span v-html="$t('ui.page.description.addOption')"></span>

      <div class="sub-depiction">
        <p v-html="$t('ui.page.description.addOptionSub.1')"></p>
        <p v-html="$t('ui.page.description.addOptionSub.2')"></p>
        <p v-html="$t('ui.page.description.addOptionSub.3')"></p>
        <br />
        <p>
          <a href="#dropdown-slots">
            {{
              $t("ui.page.sentence.Go_to_detail_option_attributes_description")
            }}
          </a>
        </p>
      </div>
    </div>

    <GeneralDemo
      ref="generalDemo"
      :displayOutput="true"
      :app="{
        placeholder: 'Click me !',
      }"
    ></GeneralDemo>
  </div>
</template>

<script>
import GeneralDemo from "../tools/general-demo.vue";

export default {
  name: "app-add-option",
  components: {
    GeneralDemo,
  },
};
</script>
