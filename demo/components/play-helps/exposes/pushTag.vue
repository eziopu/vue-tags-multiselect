<template>
  <div class="detail attributes container">
    <div class="method__pushTag">
      <div class="method__pushTag--main">
        <div class="row titles">
          <div><h4>Function name</h4></div>
          <div>
            <h4>{{ $t("ui.general.Description") }}</h4>
          </div>
          <div>
            <h4>{{ $t("ui.general.ParameterType") }}</h4>
          </div>
        </div>
        <div class="row">
          <div><div>pushTag</div></div>
          <div>
            <span class="i-block d-md-none"
              >{{ $t("ui.general.Description") }}:
            </span>
            <span>
              {{ $t("attributes.exposes.pushTag.1") }},
              <br class="d-none d-sm-block" />
              {{ $t("attributes.exposes.pushTag.2") }}
            </span>
          </div>
          <div>
            <span class="i-block d-md-none">{{ $t("ui.general.Type") }}: </span>
            <span>tag object*{{ $t("ui.general.required") }}</span>
          </div>
          <div>
            {{ $t("ui.general.example") }}
            :
            <code>pushTag({value: Eldia})</code>
            or
            <code
              >pushTag({key: country, value: Eldia, titleElm:
              &lt;p&gt;Country&lt;/p&gt;, custom: true})</code
            >
          </div>
        </div>
      </div>
      <h4 class="ui title" :class="{ ui: app.framework == 'semantic-ui' }">
        Parameter: object
      </h4>
      <div class="method__pushTag_parameter--main">
        <div class="row titles">
          <div>
            <h5>{{ $t("ui.general.Attribute") }}</h5>
          </div>
          <div>
            <h5>{{ $t("ui.general.Description") }}</h5>
          </div>
          <div>
            <h5>{{ $t("ui.general.Type") }}</h5>
          </div>
          <div>
            <h5>{{ $t("ui.general.Default") }}</h5>
          </div>
          <div>
            <h5>{{ $t("ui.general.Required") }}</h5>
          </div>
        </div>
        <div
          class="row"
          v-for="(value, key) in parameters"
          :key="`parameters_${key}`"
        >
          <div>{{ key }}</div>
          <div>
            <span class="i-block d-md-none"
              >{{ $t("ui.general.Description") }}:
            </span>
            <span>{{
              $t(`attributes.exposes.pushTag.parameter.${key}`)
            }}</span>
          </div>

          <div>
            <span class="i-block d-md-none">
              {{ $t("ui.general.Type") }}:
            </span>
            {{ value.type }}
          </div>
          <div>
            <span class="i-block d-md-none">
              {{ $t("ui.general.Default") }}:
            </span>
            {{ value.default }}
          </div>
          <div v-if="value.required == 'no'">
            <div class="d-none d-md-block">no</div>
          </div>
          <div v-else>
            <span class="i-block d-md-none">
              {{ $t("ui.general.Required") }}:
            </span>
            {{ value.required }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import InjectApp from "../mixins/inject-app.js";
import { defineComponent } from "vue";
export default defineComponent({
  name: "app-exposes-pushTag",
  mixins: [InjectApp],
  data() {
    return {
      parameters: {
        key: { type: "string", default: "null", required: "no" },
        value: { type: "string", default: "null", required: "*yes" },
        valueElm: { type: "string", default: "null", required: "no" },
        titleElm: { type: "string", default: "null", required: "no" },
        classList: { type: "array", default: "[]", required: "no" },
        custom: { type: "boolean", default: "false", required: "no" },
        displayValue: { type: "boolean", default: "false", required: "no" },
      },
    };
  },
});
</script>

<style scoped lang="scss">
.method__pushTag_parameter--main {
  padding-left: 12px;
}

@media all and (min-width: 576px) {
  .method__pushTag--main .row {
    & > div:nth-child(1) {
      width: 20%;
      order: 1;
    }
    & > div:nth-child(2) {
      width: 60%;
      order: 2;
    }
    & > div:nth-child(3) {
      width: 20%;
      order: 3;
    }
    & > div:nth-child(4) {
      width: 100%;
      order: 34;
    }
  }

  .method__pushTag_parameter--main .row {
    & > div:nth-child(1) {
      width: 15+2%;
      order: 1;
    }
    & > div:nth-child(2) {
      width: 45%;
      order: 2;
    }
    & > div:nth-child(3) {
      width: 12%;
      order: 3;
    }
    & > div:nth-child(4) {
      width: 14%;
      order: 4;
    }
    & > div:nth-child(5) {
      width: 12%;
      order: 5;
    }
  }
}
</style>
