<template>
  <div id="basic" class="demo">
    <h4>Basic</h4>
    <div class="depiction">
      {{ $t("ui.page.description.basic") }}
    </div>

    <div class="demo-component relative">
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
  props: {
    theme: {
      type: String,
      default: () => {
        return "default";
      },
    },
  },
  data() {
    return {
      conjunctions: ["OR", "AND"],
      conjunction: "",
      merge: "true",
      show_code: false,
      result: [],
      filters: [
        {
          name: "Country",
          key: "country",
          values: ["Eldia", "Māre"],
        },
        {
          name: "Remark",
          key: "remark",
          values: ["yes", "no"],
        },
        {
          name: "Height(cm)",
          key: "height",
          symbols: [">", "<"],
          values: ["15000", "10000"],
        },
      ],
    };
  },
};
</script>

<style scoped lang="scss">
.attributes {
  padding-right: 80px;
}
.attribute {
  margin-bottom: 6px;
}
@media all and (max-width: 992px) {
  .attributes {
    flex-wrap: wrap;
  }
  .attribute {
    &:nth-child(1) {
      width: 50%;
    }
    &:nth-child(2) {
      width: 50%;
    }
    &:nth-child(3) {
      width: 100%;
    }
  }
}
@media all and (max-width: 470px) {
  .attribute {
    &:nth-child(1) {
      width: 100%;
    }
    &:nth-child(2) {
      width: 100%;
    }
  }
}
</style>
