<template>
  <div id="slotAttributesOption">
    <HelpTitle 
      label="Slot Option Attributes"
      target="slotOption"
    />

    <transition name="slide">
      <div
        class="detail attributes container"
        v-if="app.displays.slotOption"
      >
        <div class="row titles">
          <div>
            <h4>{{ $t(`ui.general.Attribute`) }}</h4>
          </div>
          <div>
            <h4>{{ $t(`ui.general.Description`) }}</h4>
          </div>
          <div>
            <h4>{{ $t(`ui.general.Type`) }}</h4>
          </div>
          <div>
            <h4>{{ $t(`ui.general.Default`) }}</h4>
          </div>
          <div>
            <h4>{{ $t(`ui.general.Required`) }}</h4>
          </div>
        </div>
        <div class="row">
          <div><div>value</div></div>
          <div>
            <span class="i-block d-md-none"
              >{{ $t(`ui.general.Description`) }}:
            </span>
            <span>{{ $t(`attributes.option.value`) }}</span>
          </div>
          <div>
            <span class="i-block d-md-none">{{ $t(`ui.general.Type`) }}: </span>
            <span>string</span>
          </div>
          <div>
            <span class="i-block d-md-none"
              >{{ $t(`ui.general.Default`) }}:
            </span>
            <span> - </span>
          </div>
          <div>
            <span class="i-block d-md-none"
              >{{ $t(`ui.general.Required`) }}:
            </span>
            <span>*yes</span>
          </div>
        </div>
        <div class="row">
          <div><div>title</div></div>
          <div>
            <span class="i-block d-md-none"
              >{{ $t(`ui.general.Description`) }}:
            </span>
            <span>
              {{ $t(`attributes.option.title`) }}
            </span>
          </div>
          <div>
            <span class="i-block d-md-none">{{ $t(`ui.general.Type`) }}: </span>
            <span>boolean</span>
          </div>
          <div>
            <span class="i-block d-md-none"
              >{{ $t(`ui.general.Default`) }}:
            </span>
            <span>false</span>
          </div>
          <div class="d-none d-md-block">no</div>
        </div>
        <div class="row">
          <div><div>display-value</div></div>
          <div>
            <span class="i-block d-md-none"
              >{{ $t(`ui.general.Description`) }}:
            </span>
            <span>
              {{ $t(`attributes.option.display-value`) }}
            </span>
          </div>
          <div>
            <span class="i-block d-md-none">{{ $t(`ui.general.Type`) }}: </span>
            <span>boolean</span>
          </div>
          <div>
            <span class="i-block d-md-none"
              >{{ $t(`ui.general.Default`) }}:
            </span>
            <span>false</span>
          </div>
          <div class="d-none d-md-block">no</div>
        </div>
        <div class="row">
          <div><div>disabled</div></div>
          <div>
            <span class="i-block d-md-none"
              >{{ $t(`ui.general.Description`) }}:
            </span>
            <span> {{ $t(`attributes.option.disabled`) }} </span>
          </div>
          <div>
            <span class="i-block d-md-none">{{ $t(`ui.general.Type`) }}: </span>
            <span>boolean</span>
          </div>
          <div>
            <span class="i-block d-md-none"
              >{{ $t(`ui.general.Default`) }}:
            </span>
            <span>false</span>
          </div>
          <div class="d-none d-md-block">no</div>
        </div>
        <div class="row">
          <div><div>selected</div></div>
          <div>
            <span class="i-block d-md-none"
              >{{ $t(`ui.general.Description`) }}:
            </span>
            <span> {{ $t(`attributes.option.selected`) }} </span>
          </div>
          <div>
            <span class="i-block d-md-none">{{ $t(`ui.general.Type`) }}: </span>
            <span>boolean</span>
          </div>
          <div>
            <span class="i-block d-md-none"
              >{{ $t(`ui.general.Default`) }}:
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
import HelpTitle from "../components/title.vue";

import { defineComponent } from "vue";
export default defineComponent({
  name: "slots-option",
  mixins: [InjectApp],
  components: {
    HelpTitle,
  },
});
</script>

<style scoped lang="scss">
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
