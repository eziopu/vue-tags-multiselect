<template>
  <div class="detail attributes container">
    <div class="row titles">
      <div>
        <h4>{{ $t("ui.general.Name") }}</h4>
      </div>
      <div>
        <h4>{{ $t("ui.general.Output") }}</h4>
      </div>
      <div>
        <h4>{{ $t("ui.general.Description") }}</h4>
      </div>
      <div>
        <h4>{{ $t("ui.general.Type") }}</h4>
      </div>
      <div>
        <h4>{{ $t("ui.general.Parameters") }}</h4>
      </div>
    </div>
    <div class="row">
      <div><div>status</div></div>
      <div>
        <span class="i-block d-md-none">{{ $t("ui.general.Output") }}: </span>
        <span>{{ app.tool.status || "[]" }}</span>
      </div>
      <div>
        <span class="i-block d-md-none"
          >{{ $t("ui.general.Description") }}:
        </span>
        <span>{{ $t("attributes.events.status") }}</span>
      </div>
      <div>
        <span class="i-block d-md-none">{{ $t("ui.general.Type") }}: </span>
        <span>string</span>
      </div>
      <div>
        <span class="i-block d-md-none"
          >{{ $t("ui.general.Parameters") }}:
        </span>
        <span
          >disabled / loading / editing / selecting / select down / finish /
          -</span
        >
      </div>
    </div>

    <div class="row">
      <div><div>inputValue</div></div>
      <div>
        <span class="i-block d-md-none">{{ $t("ui.general.Output") }}: </span>
        <span>{{ app.tool.inputValue || "-" }}</span>
      </div>
      <div>
        <span class="i-block d-md-none"
          >{{ $t("ui.general.Description") }}:
        </span>
        <span>{{ $t("attributes.events.inputValue") }}</span>
      </div>
      <div>
        <span class="i-block d-md-none">{{ $t("ui.general.Type") }}: </span>
        <span>string</span>
      </div>
      <div class="d-none d-md-block">
        <span> - </span>
      </div>
    </div>

    <div class="row">
      <div><div>selectingTag</div></div>
      <div>
        <span class="i-block d-md-none">{{ $t("ui.general.Output") }}: </span>
        <pre class="data" :class="app.framework">{{
          app.tool.selectingTag || "{}"
        }}</pre>
      </div>
      <div>
        <span class="i-block d-md-none"
          >{{ $t("ui.general.Description") }}:
        </span>
        <span>{{ $t("attributes.events.selectingTag") }}</span>
      </div>
      <div>
        <span class="i-block d-md-none">{{ $t("ui.general.Type") }}: </span>
        <span>string</span>
      </div>
      <div class="d-none d-md-block">
        <span> - </span>
      </div>
    </div>
  </div>
</template>

<script>
import InjectApp from "../mixins/inject-app.js";
import { defineComponent } from "vue";
export default defineComponent({
  name: "events-detail",
  mixins: [InjectApp],
});
</script>
<style scoped lang="scss">
@import "./assets/stylesheets.scss";
@media all and (min-width: 576px) {
  .row {
    & > div:nth-child(1) {
      width: 15%;
      order: 1;
    }
    & > div:nth-child(2) {
      width: 25%;
      order: 2;
    }
    & > div:nth-child(3) {
      width: 30%;
      order: 3;
    }
    & > div:nth-child(4) {
      width: 6%;
      order: 4;
    }
    & > div:nth-child(5) {
      width: 24%;
      order: 5;
    }
  }
}
</style>
