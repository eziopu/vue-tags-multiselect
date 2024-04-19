<template>
  <div class="detail attributes container">
    <div class="row titles">
      <div>
        <h4>{{ $t(`ui.general.Name`) }}</h4>
      </div>
      <div>
        <h4>{{ $t(`ui.general.Description`) }}</h4>
      </div>
      <div>
        <h4>{{ $t(`ui.general.Default`) }}</h4>
      </div>
    </div>
    <div class="row">
      <div><div>v-tag-dropdown</div></div>
      <div v-html="$t(`attributes.slots.v-tag-dropdown`)"></div>
      <div class="d-none d-md-block">
        <span class="i-block d-md-none">{{ $t(`ui.general.Default`) }}: </span>
        <span>-</span>
      </div>
    </div>
    <div class="row">
      <div><div>v-tag-option</div></div>
      <div v-html="$t(`attributes.slots.v-tag-option`)"></div>
      <div class="d-none d-md-block">
        <span class="i-block d-md-none">{{ $t(`ui.general.Default`) }}: </span>
        <span>-</span>
      </div>
    </div>
    <div class="row">
      <div class="flex-between text">
        <div>loading</div>
        <div class="ui input loading">
          <input
            type="text"
            class="form-control"
            v-model="app.loadingContent"
          />
        </div>
      </div>
      <div>
        <span> {{ $t(`attributes.slots.loading`) }} *</span>
        <span
          v-html="$t(`attributes.slots.loading__notice`)"
        ></span>
      </div>
      <div style="display: inline-flex">
        <span class="i-block d-md-none" style="margin-right: 6px">
          {{ $t(`ui.general.Default`) }}:
        </span>
        <div class="demo__loading">
          <i class="demo__loading--icon"></i>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="flex-between text">
        <div>tag-conjunction</div>
        <div class="ui input mini-width">
          <input
            type="text"
            class="form-control"
            v-model="app.tagConjunctionContent"
            :disabled="app.merge == 'false'"
            :placeholder="`&`"
          />
        </div>
      </div>
      <div>
        <span
          v-html="$t(`attributes.slots.tag-conjunction`)"
        ></span>
        *<span
          v-html="$t(`attributes.slots.tag-conjunction__notice`)"
        ></span>
      </div>
      <div>
        <span class="i-block d-md-none">{{ $t(`ui.general.Default`) }}: </span>
        &
      </div>
    </div>
    <div class="row">
      <div class="flex-between text">
        <div>option-undo</div>
        <div class="ui input mini-width relative">
          <input
            type="text"
            class="form-control"
            v-model="app.optionUndoContent"
          />
          <div class="demo__fake-placeholder" v-if="app.optionUndoContent == ''">
            <i class="demo__arrow-left"></i>Undo
          </div>
        </div>
      </div>
      <div>
        <span v-html="$t(`attributes.slots.option-undo`)"></span>
        *<span
          v-html="$t(`attributes.slots.option-undo__notice`)"
        ></span>
      </div>
      <div>
        <span class="i-block d-md-none">{{ $t(`ui.general.Default`) }}: </span>
        <i class="demo__arrow-left"></i> Undo
      </div>
    </div>
    <div class="row">
      <div class="flex-between text">
        <div>option-OR-conjunction</div>
        <div class="ui input mini-width">
          <input
            type="text"
            class="form-control"
            v-model="app.optionORConjunctionContent"
            :placeholder="`OR`"
          />
        </div>
      </div>
      <div>
        <span
          v-html="$t(`attributes.slots.option-OR-conjunction`)"
        ></span>
        *<span
          v-html="
            $t(`attributes.slots.option-OR-conjunction__notice`)
          "
        ></span>
      </div>
      <div>
        <span class="i-block d-md-none">{{ $t(`ui.general.Default`) }}: </span>
        OR
      </div>
    </div>
  </div>
</template>

<script>
import InjectApp from "../mixins/inject-app.js";
import { defineComponent } from "vue";
export default defineComponent({
  name: "slots-detail",
  mixins: [InjectApp],
});
</script>

<style scoped lang="scss">
.loading-icon {
  display: flex;
  align-items: center;
}
.loading-icon i.loading {
  border: 4px solid #ebebeb;
  border-top: 4px solid #c8c8c8;
  border-radius: 80%;
  width: 16px;
  height: 16px;
  animation: spin 1s linear infinite;
}
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.row {
  .ui.input {
    &.loading {
      max-width: 160px;
    }
    &.mini-width {
      max-width: 100px;
    }
  }
}
@media all and (min-width: 576px) {
  .row {
    & > div:nth-child(1) {
      width: 30%;
      order: 1;
    }
    & > div:nth-child(2) {
      width: 60%;
      order: 2;
    }
    & > div:nth-child(3) {
      width: 10%;
      order: 3;
    }
  }
}
@media all and (max-width: 992px) {
  .row {
    .ui.input {
      max-width: auto !important;
      width: 100%;
    }
    & > div:nth-child(1) {
      width: 84%;
    }
    &.titles > div:nth-child(2) {
      display: none;
    }
    & > div:nth-child(3) {
      width: 16%;
    }
    & > div:nth-child(2) {
      width: 100%;
      order: 4;
    }
  }
}
@media all and (max-width: 576px) {
  .flex-between.text {
    display: block !important;
  }
  .ui.input {
    min-width: 100% !important;
  }
}
</style>
