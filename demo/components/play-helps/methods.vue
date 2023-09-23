<template>
  <div id="methods">
    <div
      @click="app.displays.methods = !app.displays.methods"
      class="pointer"
      :class="{ active: app.displays.methods }"
    >
      <h5 class="ui title" :class="{ ui: app.theme == 'semantic-ui' }">
        Methods
      </h5>
      <span class="arrow"></span>
    </div>

    <transition name="slide">
      <div class="detail attributes container" v-if="app.displays.methods">
        <div class="method__pushTag">
          <div class="method__pushTag--main">
            <div class="row titles">
              <div><h6>Function name</h6></div>
              <div>
                <h6>{{ $t("ui.general.Description") }}</h6>
              </div>
              <div>
                <h6>{{ $t("ui.general.ParameterType") }}</h6>
              </div>
            </div>
            <div class="row">
              <div><div>pushTag</div></div>
              <div>
                <span class="i-block d-md-none"
                  >{{ $t("ui.general.Description") }}:
                </span>
                <span>
                  {{ $t("attributes.description.methods.pushTag.1") }},
                  <br class="d-none d-sm-block" />
                  {{ $t("attributes.description.methods.pushTag.2") }}
                </span>
              </div>
              <div>
                <span class="i-block d-md-none"
                  >{{ $t("ui.general.Type") }}:
                </span>
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
          <h6 class="ui title" :class="{ ui: app.theme == 'semantic-ui' }">
            Parameter: object
          </h6>
          <div class="method__pushTag_parameter--main">
            <div class="row titles">
              <div>
                <h6>{{ $t("ui.general.Attribute") }}</h6>
              </div>
              <div>
                <h6>{{ $t("ui.general.Description") }}</h6>
              </div>
              <div>
                <h6>{{ $t("ui.general.Type") }}</h6>
              </div>
              <div>
                <h6>{{ $t("ui.general.Default") }}</h6>
              </div>
              <div>
                <h6>{{ $t("ui.general.Required") }}</h6>
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
                  $t(`attributes.description.methods.pushTag.parameter.${key}`)
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
    </transition>
  </div>
</template>

<script>
import InjectApp from "./mixins/inject-app.js";
import { defineComponent } from "vue";
export default defineComponent({
  name: "app-methods",
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

<style lang="scss" scoped>
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
