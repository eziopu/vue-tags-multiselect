<template>
  <div id="slotAttributesOption">
    <div
      @click="
        app.displays.slotAttributes.option = !app.displays.slotAttributes.option
      "
      class="pointer"
      :class="{ active: app.displays.slotAttributes.option }"
    >
      <h5 class="ui title" :class="{ ui: app.theme == 'semantic-ui' }">
        Slot Option Attributes
      </h5>
      <span class="arrow"></span>
    </div>

    <transition name="slide">
      <div
        class="detail attributes container"
        v-if="app.displays.slotAttributes.option"
      >
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
        <div class="row">
          <div><div>value</div></div>
          <div>
            <span class="i-block d-md-none"
              >{{ $t("ui.general.Description") }}:
            </span>
            <span>{{ $t("attributes.description.option.value") }}</span>
          </div>
          <div>
            <span class="i-block d-md-none">{{ $t("ui.general.Type") }}: </span>
            <span>string</span>
          </div>
          <div>
            <span class="i-block d-md-none"
              >{{ $t("ui.general.Default") }}:
            </span>
            <span> - </span>
          </div>
          <div>
            <span class="i-block d-md-none"
              >{{ $t("ui.general.Required") }}:
            </span>
            <span>*yes</span>
          </div>
        </div>
        <div class="row">
          <div><div>title</div></div>
          <div>
            <span class="i-block d-md-none"
              >{{ $t("ui.general.Description") }}:
            </span>
            <span>
              {{ $t("attributes.description.option.title") }}
            </span>
          </div>
          <div>
            <span class="i-block d-md-none">{{ $t("ui.general.Type") }}: </span>
            <span>boolean</span>
          </div>
          <div>
            <span class="i-block d-md-none"
              >{{ $t("ui.general.Default") }}:
            </span>
            <span>false</span>
          </div>
          <div class="d-none d-md-block">no</div>
        </div>
        <div class="row">
          <div><div>display-value</div></div>
          <div>
            <span class="i-block d-md-none"
              >{{ $t("ui.general.Description") }}:
            </span>
            <span>
              {{ $t("attributes.description.option.display-value") }}
            </span>
          </div>
          <div>
            <span class="i-block d-md-none">{{ $t("ui.general.Type") }}: </span>
            <span>boolean</span>
          </div>
          <div>
            <span class="i-block d-md-none"
              >{{ $t("ui.general.Default") }}:
            </span>
            <span>false</span>
          </div>
          <div class="d-none d-md-block">no</div>
        </div>
        <div class="row">
          <div><div>disabled</div></div>
          <div>
            <span class="i-block d-md-none"
              >{{ $t("ui.general.Description") }}:
            </span>
            <span> {{ $t("attributes.description.option.disabled") }} </span>
          </div>
          <div>
            <span class="i-block d-md-none">{{ $t("ui.general.Type") }}: </span>
            <span>boolean</span>
          </div>
          <div>
            <span class="i-block d-md-none"
              >{{ $t("ui.general.Default") }}:
            </span>
            <span>false</span>
          </div>
          <div class="d-none d-md-block">no</div>
        </div>
        <div class="row">
          <div><div>selected</div></div>
          <div>
            <span class="i-block d-md-none"
              >{{ $t("ui.general.Description") }}:
            </span>
            <span> {{ $t("attributes.description.option.selected") }} </span>
          </div>
          <div>
            <span class="i-block d-md-none">{{ $t("ui.general.Type") }}: </span>
            <span>boolean</span>
          </div>
          <div>
            <span class="i-block d-md-none"
              >{{ $t("ui.general.Default") }}:
            </span>
            <span>false</span>
          </div>
          <div class="d-none d-md-block">no</div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import InjectApp from "../mixins/inject-app.js";
import { defineComponent } from "vue";
export default defineComponent({
  name: "slots-option",
  mixins: [InjectApp],
});
</script>

<style lang="scss" scoped>
@media all and (min-width: 576px) {
  .row {
    & > div:nth-child(1) {
      width: 20%;
      order: 1;
    }
    & > div:nth-child(2) {
      width: 45%;
      order: 2;
    }
    & > div:nth-child(3) {
      width: 10%;
      order: 3;
    }
    & > div:nth-child(4) {
      width: 10%;
      order: 4;
    }
    & > div:nth-child(5) {
      width: 15%;
      order: 5;
    }
  }
}
</style>
