<template>
  <div class="detail attributes container">
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
        <h6>{{ $t("ui.general.AcceptedValues") }}</h6>
      </div>
      <div>
        <h6>{{ $t("ui.general.Default") }}</h6>
      </div>
    </div>
    <div class="row">
      <div><div>model-value / v-model</div></div>
      <div>{{ $t("attributes.description.app.v-model") }}</div>
      <div>
        <span class="i-block d-md-none">{{ $t("ui.general.Type") }}: </span>
        <span>object</span>
      </div>
      <div class="d-none d-md-block">
        <span class="i-block d-md-none"
          >{{ $t("ui.general.AcceptedValues") }}:
        </span>
        <span>-</span>
      </div>
      <div class="d-none d-md-block">
        <span class="i-block d-md-none">{{ $t("ui.general.Default") }}: </span>
        <span>-</span>
      </div>
    </div>
    <div class="row">
      <LabelAndSelect value="disabled" />
      <div>{{ $t("attributes.description.app.disabled") }}</div>
      <div>
        <span class="i-block d-md-none">{{ $t("ui.general.Type") }}: </span>
        <span>boolean</span>
      </div>
      <div class="d-none d-md-block">
        <span class="i-block d-md-none"
          >{{ $t("ui.general.AcceptedValues") }}:
        </span>
        <span>-</span>
      </div>
      <div>
        <span class="i-block d-md-none">{{ $t("ui.general.Default") }}: </span>
        <span>false</span>
      </div>
    </div>
    <div class="row">
      <LabelAndSelect value="loading" />
      <div>{{ $t("attributes.description.app.loading") }}</div>
      <div>
        <span class="i-block d-md-none">{{ $t("ui.general.Type") }}: </span>
        <span>boolean</span>
      </div>
      <div class="d-none d-md-block">
        <span class="i-block d-md-none"
          >{{ $t("ui.general.AcceptedValues") }}:
        </span>
        <span>-</span>
      </div>
      <div>
        <span class="i-block d-md-none">{{ $t("ui.general.Default") }}: </span>
        <span>false</span>
      </div>
    </div>
    <div class="row">
      <LabelAndSelect value="search" />
      <div>{{ $t("attributes.description.app.search") }}</div>
      <div>
        <span class="i-block d-md-none">{{ $t("ui.general.Type") }}: </span>
        <span>boolean</span>
      </div>
      <div class="d-none d-md-block">
        <span class="i-block d-md-none"
          >{{ $t("ui.general.AcceptedValues") }}:
        </span>
        <span>-</span>
      </div>
      <div>
        <span class="i-block d-md-none">{{ $t("ui.general.Default") }}: </span>
        <span>true</span>
      </div>
    </div>
    <div class="row">
      <LabelAndSelect value="create" />
      <div>{{ $t("attributes.description.app.create") }}</div>
      <div>
        <span class="i-block d-md-none">{{ $t("ui.general.Type") }}: </span>
        <span>boolean</span>
      </div>
      <div class="d-none d-md-block">
        <span class="i-block d-md-none"
          >{{ $t("ui.general.AcceptedValues") }}:
        </span>
        <span>-</span>
      </div>
      <div>
        <span class="i-block d-md-none">{{ $t("ui.general.Default") }}: </span>
        <span>true</span>
      </div>
    </div>
    <div class="row">
      <LabelAndSelect value="merge" :disabled="app.conjunction == 'AND'" />
      <div>{{ $t("attributes.description.app.merge") }}</div>
      <div>
        <span class="i-block d-md-none">{{ $t("ui.general.Type") }}: </span>
        <span>boolean</span>
      </div>
      <div class="d-none d-md-block">
        <span class="i-block d-md-none"
          >{{ $t("ui.general.AcceptedValues") }}:
        </span>
        <span>-</span>
      </div>
      <div>
        <span class="i-block d-md-none">{{ $t("ui.general.Default") }}: </span>
        <span>true</span>
      </div>
    </div>
    <div class="row">
      <LabelAndSelect value="transition" />
      <div>{{ $t("attributes.description.app.transition") }}</div>
      <div>
        <span class="i-block d-md-none">{{ $t("ui.general.Type") }}: </span>
        <span>boolean</span>
      </div>
      <div class="d-none d-md-block">
        <span class="i-block d-md-none"
          >{{ $t("ui.general.AcceptedValues") }}:
        </span>
        <span>-</span>
      </div>
      <div>
        <span class="i-block d-md-none">{{ $t("ui.general.Default") }}: </span>
        <span>true</span>
      </div>
    </div>
    <div class="row">
      <LabelAndSelect value="conjunction" :values="['AND', 'OR', 'null']" />
      <div>
        <span
          @click="
            app.displays.details.conjunction = !app.displays.details.conjunction
          "
          class="pointer"
          :class="{ active: app.displays.details.conjunction }"
        >
          {{ $t("attributes.description.app.conjunction") }}
          <span class="arrow"></span>
        </span>
        <span v-show="app.displays.details.conjunction" class="detail">
          <br />
          <hr style="margin: 2px" />
          {{ $t("attributes.description.app.conjunction__detail.1") }}
          <br />
          {{ $t("attributes.description.app.conjunction__detail.2") }}
          <br />
          {{ $t("attributes.description.app.conjunction__detail.3") }}
        </span>
      </div>
      <div>
        <span class="i-block d-md-none">{{ $t("ui.general.Type") }}: </span>
        <span>string</span>
      </div>
      <div>
        <span class="i-block d-md-none"
          >{{ $t("ui.general.AcceptedValues") }}:
        </span>
        <span>AND / OR / -</span>
      </div>
      <div>
        <span class="i-block d-md-none">{{ $t("ui.general.Default") }}: </span>
        <span>-</span>
      </div>
    </div>
    <div class="row">
      <LabelAndSelect value="deleteIcon" :values="['always', 'edit', 'none']" />
      <div>
        <span
          @click="
            app.displays.details.deleteIcon = !app.displays.details.deleteIcon
          "
          class="pointer"
          :class="{ active: app.displays.details.deleteIcon }"
        >
          {{ $t("attributes.description.app.deleteIcon") }}
          <span class="arrow"></span>
          <br />
          *{{ $t("attributes.description.app.deleteIcon__notice") }}
        </span>
        <span v-show="app.displays.details.deleteIcon" class="detail">
          <br />
          <hr style="margin: 2px" />
          {{ $t("attributes.description.app.deleteIcon__detail.1") }}
          <br />
          {{ $t("attributes.description.app.deleteIcon__detail.2") }}
          <br />
          {{ $t("attributes.description.app.deleteIcon__detail.3") }}
        </span>
      </div>
      <div>
        <span class="i-block d-md-none">{{ $t("ui.general.Type") }}: </span>
        <span>string</span>
      </div>
      <div>
        <span class="i-block d-md-none"
          >{{ $t("ui.general.AcceptedValues") }}:
        </span>
        <span>always / edit / none</span>
      </div>
      <div>
        <span class="i-block d-md-none">{{ $t("ui.general.Default") }}: </span>
        <span>always</span>
      </div>
    </div>
    <div class="row">
      <div class="flex-between text">
        <div>placeholder</div>
        <div class="ui input">
          <input type="text" class="form-control" v-model="app.placeholder" />
        </div>
      </div>
      <div>{{ $t("attributes.description.app.placeholder") }}</div>
      <div>
        <span class="i-block d-md-none">{{ $t("ui.general.Type") }}: </span>
        <span>string</span>
      </div>
      <div class="d-none d-md-block">
        <span class="i-block d-md-none"
          >{{ $t("ui.general.AcceptedValues") }}:
        </span>
        <span>-</span>
      </div>
      <div>
        <span class="i-block d-md-none">{{ $t("ui.general.Default") }}: </span>
        <span>-</span>
      </div>
    </div>
    <div class="row">
      <div class="flex-between text">
        <div>loadingPlaceholder</div>
        <div class="ui input">
          <input
            type="text"
            class="form-control"
            v-model="app.loadingPlaceholder"
            :placeholder="`Wait a moment, please.`"
          />
        </div>
      </div>
      <div v-html="$t('attributes.description.app.loadingPlaceholder')"></div>
      <div>
        <span class="i-block d-md-none">{{ $t("ui.general.Type") }}: </span>
        <span>string</span>
      </div>
      <div class="flex-between">
        <div class="d-none d-md-block">
          <span class="i-block d-md-none"
            >{{ $t("ui.general.AcceptedValues") }}:
          </span>
          <span>-</span>
        </div>
        <div>
          <span class="i-block d-md-none"
            >{{ $t("ui.general.Default") }}:
          </span>
          <span>Wait a moment, please.</span>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="flex-between text">
        <div>selectDownPlaceholder</div>
        <div class="ui input">
          <input
            type="text"
            class="form-control"
            v-model="app.selectDownPlaceholder"
            :placeholder="`Selected End.`"
          />
        </div>
      </div>
      <div
        v-html="$t('attributes.description.app.selectDownPlaceholder')"
      ></div>
      <div>
        <span class="i-block d-md-none">{{ $t("ui.general.Type") }}: </span>
        <span>string</span>
      </div>
      <div class="flex-between">
        <div class="d-none d-md-block">
          <span class="i-block d-md-none"
            >{{ $t("ui.general.AcceptedValues") }}:
          </span>
          <span>-</span>
        </div>
        <div>
          <span class="i-block d-md-none"
            >{{ $t("ui.general.Default") }}:
          </span>
          <span>Selected End.</span>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="flex-between text">
        <div>finishPlaceholder</div>
        <div class="ui input">
          <input
            type="text"
            class="form-control"
            v-model="app.finishPlaceholder"
            :disabled="app.create == 'true'"
            :placeholder="`Finish.`"
          />
        </div>
      </div>
      <div v-html="$t('attributes.description.app.finishPlaceholder')"></div>
      <div>
        <span class="i-block d-md-none">{{ $t("ui.general.Type") }}: </span>
        <span>string</span>
      </div>
      <div class="flex-between">
        <div class="d-none d-md-block">
          <span class="i-block d-md-none"
            >{{ $t("ui.general.AcceptedValues") }}:
          </span>
          <span>-</span>
        </div>
        <div>
          <span class="i-block d-md-none"
            >{{ $t("ui.general.Default") }}:
          </span>
          <span>Finish.</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import InjectApp from "../mixins/inject-app.js";
import LabelAndSelect from "./label-and-select.vue";

import { defineComponent } from "vue";
export default defineComponent({
  name: "attributes-detail",
  mixins: [InjectApp],
  components: {
    LabelAndSelect,
  },
});
</script>
<style lang="scss" scoped>
.row {
  .ui.input {
    min-width: 209px;
  }
}
@media all and (min-width: 576px) {
  .row {
    & > div:nth-child(1) {
      width: 35%;
      order: 1;
    }
    & > div:nth-child(2) {
      width: 35%;
      order: 2;
    }
    & > div:nth-child(3) {
      width: 8%;
      order: 3;
    }
    & > div:nth-child(4) {
      width: 14%;
      order: 4;
    }
    & > div:nth-child(5) {
      width: 8%;
      order: 5;
    }
    & > div:nth-child(4):last-child {
      width: 14+8%;
    }
  }
}
@media all and (max-width: 1200px) {
  .row {
    & > div:nth-child(1) {
      width: 30%;
    }
    & > div:nth-child(4) {
      width: 19%;
    }
    & > div:nth-child(4):last-child {
      width: 19+8%;
    }
  }
  .flex-between.text {
    display: block !important;
  }
  .ui.input {
    min-width: 100% !important;
  }
}
@media all and (max-width: 992px) {
  .row {
    & > div:nth-child(1) {
      width: 40%;
    }
    &.titles > div:nth-child(2) {
      display: none;
    }
    & > div:nth-child(2) {
      width: 100%;
      order: 6;
    }
    & > div:nth-child(3) {
      width: 15%;
    }
    & > div:nth-child(4) {
      width: 30%;
    }
    & > div:nth-child(5) {
      width: 15%;
    }
    & > div:nth-child(4):last-child {
      width: 30+15%;
    }
  }
}
</style>
