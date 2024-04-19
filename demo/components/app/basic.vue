<template>
  <div id="basic" class="demo">
    <ToolTitle>Basic</ToolTitle>
    <div class="depiction">
      {{ $t(`ui.page.basic`) }}
    </div>

    <div class="demo-component relative">
      <div class="output">
        v-model output value: {{ result }}
      </div>
      <v-tags-multiselect
        v-model="result"
        placeholder="Click and input enter me !"
      >
      </v-tags-multiselect>
      <div class="demo-control">
        <span
          class="show-code-btn pointer"
          :class="{ active: show_code }"
          @click="show_code = !show_code"
        >
          &lt; / &gt;
          <!-- < / > -->
        </span>
      </div>
    </div>

    <transition name="slide">
      <pre v-show="show_code" class="prettyprint lang-html customize"><code><!--
        -->&lt;vue-tags-multiselect <br><!--
        -->  v-model="result"<br><!--
        -->  placeholder="Click and input enter me !"<br><!--
        -->&gt;<br><!--
        -->&lt;/vue-tags-multiselect&gt;<!--
      --></code></pre>
    </transition>
  </div>
</template>

<script>
export default {
  name: "app-basic",
  data() {
    return {
      result: {},
      show_code: false,
    }
  }
};
</script>