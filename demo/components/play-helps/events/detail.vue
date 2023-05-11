<template>
  <div class="detail attributes container">
    <div class="row titles">
      <div>
        <h6>{{ $t("ui.general.Name") }}</h6>
      </div>
      <div>
        <h6>{{ $t("ui.general.Output") }}</h6>
      </div>
      <div>
        <h6>{{ $t("ui.general.Description") }}</h6>
      </div>
      <div>
        <h6>{{ $t("ui.general.Type") }}</h6>
      </div>
      <div>
        <h6>{{ $t("ui.general.Parameters") }}</h6>
      </div>
    </div>
    <div class="row">
      <div><div>getStatus</div></div>
      <div>
        <span class="i-block d-md-none">{{ $t("ui.general.Output") }}: </span>
        <span>{{ app.tool.status || "[]" }}</span>
      </div>
      <div>
        <span class="i-block d-md-none"
          >{{ $t("ui.general.Description") }}:
        </span>
        <span>{{ $t("attributes.description.events.getStatus") }}</span>
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
      <div><div>getSelectingKey</div></div>
      <div>
        <span class="i-block d-md-none">{{ $t("ui.general.Output") }}: </span>
        <span>{{ app.tool.selectingKey || "-" }}</span>
      </div>
      <div>
        <span class="i-block d-md-none"
          >{{ $t("ui.general.Description") }}:
        </span>
        <span>{{ $t("attributes.description.events.getSelectingKey") }}</span>
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
      <div><div>getInputValue</div></div>
      <div>
        <span class="i-block d-md-none">{{ $t("ui.general.Output") }}: </span>
        <span>{{ app.tool.inputValue || "-" }}</span>
      </div>
      <div>
        <span class="i-block d-md-none"
          >{{ $t("ui.general.Description") }}:
        </span>
        <span>{{ $t("attributes.description.events.getInputValue") }}</span>
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
      <div><div>getEdintng</div></div>
      <div>
        <span class="i-block d-md-none">{{ $t("ui.general.Output") }}: </span>
        <span>{{ app.tool.editing || {} }}</span>
      </div>
      <div>
        <span class="i-block d-md-none"
          >{{ $t("ui.general.Description") }}:
        </span>
        <span>{{ $t("attributes.description.events.getEdintng") }}</span>
      </div>
      <div>
        <span class="i-block d-md-none">{{ $t("ui.general.Type") }}: </span>
        <span>obect</span>
      </div>
      <div class="d-none d-md-block">
        <span> {} </span>
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
<style lang="scss" scoped>
@media all and (min-width: 576px) {
  .row {
    & > div:nth-child(1) {
      width: 15%;
      order: 1;
    }
    & > div:nth-child(2) {
      width: 14%;
      order: 2;
    }
    & > div:nth-child(3) {
      width: 35%;
      order: 3;
    }
    & > div:nth-child(4) {
      width: 6%;
      order: 4;
    }
    & > div:nth-child(5) {
      width: 30%;
      order: 5;
    }
  }
}
</style>
