<script>
export default {
  name: 'app-add-option'
}
</script>

<template>
  <div id="add-option" class="demo">
    <ToolTitle>Add option</ToolTitle>

    <div class="depiction">
      <p v-html="$t(`ui.page.addOption`)"></p>

      <ul>
        <li v-for="index in [1, 2, 3]" :key="index">
          <p v-html="$t(`ui.page.addOption__details.${index}`)"></p>
        </li>
      </ul>
    </div>

    <GeneralDemo
      ref="generalDemo"
      :displayOutput="true"
      :app="{
        placeholder: 'Click me !'
      }"
    ></GeneralDemo>
  </div>
</template>
