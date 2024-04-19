<template>
  <div id="delete-icon" class="demo">
    <ToolTitle>Delete icon</ToolTitle>

    <div class="depiction">
      <p>
        {{ $t(`attributes.app.deleteIcon`) }}
      </p>
      <p>
        *{{ $t(`attributes.app.deleteIcon__notice`) }}
      </p>

      <ul>
        <li v-for="index in ['always', 'edit', 'none']" :key="index">
          <p v-html="$t(`attributes.app.deleteIcon__parameters.${index}`)"></p>
        </li>
      </ul>
    </div>

    <div class="attributes flex-between to4-6 with-demo-control">
      <LabelAndControls label="merge" v-model="attributes.merge" />
      <LabelAndControls
        label="deleteIcon"
        v-model="attributes.deleteIcon"
        :values="['always', 'edit', 'none']"
      />
    </div>

    <GeneralDemo
      :displayRefreshBtn="true"
      :option="{
        country: [{}, {selected: true}, {selected: true}],
      }"
      :app="attributes"
    >
    </GeneralDemo>
  </div>
</template>

<script>

export default {
  name: "app-delete-icon",
  data() {
    return {
      attributes: {
        merge: true,
        deleteIcon: "always",
      }
    };
  },
};
</script>
