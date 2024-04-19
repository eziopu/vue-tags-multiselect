<template>
  <div id="add-option" class="demo">
    <ToolTitle>Add option</ToolTitle>

    <div class="depiction">
      <p v-html="$t(`ui.page.addOption`)"></p>

      <ul>
        <li v-for="index in [1,2,3]" :key="index">
          <p v-html="$t(`ui.page.addOption__details.${index}`)"></p>
        </li>
      </ul>

      <div class="sub-depiction">
        <br />
        <p>
          <a href="#dropdown-slots">
            {{
              $t(`ui.page.sentence.Go_to_detail_option_attributes_description`)
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
