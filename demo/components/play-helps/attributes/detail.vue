<script>
export default {
  name: 'play-attributes-detail'
}
</script>
<script setup>
import { inject, reactive } from 'vue'
import { GET_ATTRIBUTE_INVALID_REASON } from '../../models.js'

const displays = reactive({
  conjunction: false,
  deleteIcon: false
})
const appAttributes = inject('attributes')
</script>

<template>
  <div class="detail attributes container">
    <div class="row titles">
      <div
        v-for="value in ['Attribute', 'Description', 'Type', 'AcceptedValues', 'Default']"
        :key="value"
      >
        <h4>{{ $t(`ui.general.${value}`) }}</h4>
      </div>
    </div>

    <!-- v-model -->
    <div class="row">
      <div><div>model-value / v-model</div></div>
      <div>{{ $t(`attributes.app.v-model`) }}</div>
      <div>
        <span class="i-block d-md-none">{{ $t(`ui.general.Type`) }}: </span>
        <span>object</span>
      </div>
      <div class="d-none d-md-block">
        <span class="i-block d-md-none">{{ $t(`ui.general.AcceptedValues`) }}: </span>
        <span>-</span>
      </div>
      <div class="d-none d-md-block">
        <span class="i-block d-md-none">{{ $t(`ui.general.Default`) }}: </span>
        <span>-</span>
      </div>
    </div>

    <!-- attributes -->
    <template v-for="(attribute, key) in appAttributes" :key="key">
      <div class="row" v-if="key != 'placeholder' && key != 'placeholders'">
        <LabelAndControls
          :label="$toKebabCase(key)"
          v-model="attribute.value"
          :values="attribute.acceptedValues"
          :disabled="!!GET_ATTRIBUTE_INVALID_REASON(key, appAttributes)"
        >
          <template v-slot:tooltip v-if="GET_ATTRIBUTE_INVALID_REASON(key, appAttributes)">
            {{ GET_ATTRIBUTE_INVALID_REASON(key, appAttributes) }}
          </template>
        </LabelAndControls>

        <div v-if="attribute.acceptedValues.length == 0 || key == 'tagPosition'">
          {{ $t(`attributes.app.${key}`) }}
          <p v-if="$te(`attributes.app.${key}__notice`)">
            *<span v-html="$t(`attributes.app.${key}__notice`)"> </span>
          </p>
        </div>
        <div v-else>
          <span
            @click="displays[key] = !displays[key]"
            class="pointer"
            :class="{ active: displays[key] }"
          >
            {{ $t(`attributes.app.${key}`) }}
            <span class="arrow"></span>
          </span>
          <div v-show="displays[key]" class="attribute-detail">
            <hr style="margin: 2px" />
            <p v-for="(value, valueKey) in attribute.acceptedValues" :key="valueKey">
              {{ $t(`attributes.app.${key}__parameters.${value}`) }}
            </p>
          </div>
        </div>
        <div>
          <span class="i-block d-md-none">{{ $t(`ui.general.Type`) }}: </span>
          <span>{{ attribute.type }}</span>
        </div>
        <div :class="{ 'd-none d-md-block': attribute.acceptedValues.length == 0 }">
          <span class="i-block d-md-none">{{ $t(`ui.general.AcceptedValues`) }}: </span>
          <span>{{ attribute.acceptedValues.join(' / ').replace('null', '-') }}</span>
        </div>
        <div>
          <span class="i-block d-md-none">{{ $t(`ui.general.Default`) }}: </span>
          <span>{{ String(attribute.default).replace('null', '-') }}</span>
        </div>
      </div>
    </template>

    <!-- placeholder -->
    <div class="row">
      <LabelAndControls
        label="placeholder"
        model="input"
        v-model="appAttributes.placeholder.value"
      />
      <div>
        {{ $t(`attributes.app.placeholder`) }}
        <p>* {{ $t(`attributes.app.placeholder__details.remark`) }}</p>
      </div>
      <div>
        <span class="i-block d-md-none">{{ $t(`ui.general.Type`) }}: </span>
        <span>{{ appAttributes.placeholder.type }}</span>
      </div>
      <div class="d-none d-md-block">
        <span class="i-block d-md-none">{{ $t(`ui.general.AcceptedValues`) }}: </span>
        <span>-</span>
      </div>
      <div>
        <span class="i-block d-md-none">{{ $t(`ui.general.Default`) }}: </span>
        <span>-</span>
      </div>
    </div>

    <!-- placeholders -->
    <div class="play-attributes-detail__placeholders">
      <h4 class="placeholders-title">Placeholders</h4>
      <div class="placeholders-depiction depiction">
        {{ $t('attributes.app.placeholders__detail') }}
      </div>

      <div class="placeholders-attributes">
        <div
          class="row"
          v-for="(subPlaceholder, subKey) in appAttributes.placeholders"
          :key="subKey"
        >
          <LabelAndControls
            :label="$toKebabCase(subKey)"
            model="input"
            v-model="subPlaceholder.value"
            :disabled="!!GET_ATTRIBUTE_INVALID_REASON(`placeholders.${subKey}`, appAttributes)"
          />
          <div>
            {{ $t(`attributes.app.placeholders.${subKey}`) }}
            <p v-if="$te(`attributes.app.placeholders.${subKey}__notice`)">
              *<span v-html="$t(`attributes.app.placeholders.${subKey}__notice`)"> </span>
            </p>
          </div>

          <div>
            <span class="i-block d-md-none">{{ $t(`ui.general.Type`) }}: </span>
            <span>{{ subPlaceholder.type }}</span>
          </div>
          <div class="flex-between">
            <div class="d-none d-md-block">
              <span class="i-block d-md-none">{{ $t(`ui.general.AcceptedValues`) }}: </span>
              <span> - </span>
            </div>
            <div>
              <span class="i-block d-md-none">{{ $t(`ui.general.Default`) }}: </span>
              <span>{{ String(subPlaceholder.default).replace('null', '-') }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.play-attributes-detail__placeholders {
  margin-top: 20px;
  .placeholders-title,
  .placeholders-depiction {
    margin-right: -10px;
    margin-left: -10px;
  }
}

.attribute-detail {
  padding-top: 9px;
  padding-left: 6px;
  p {
    margin-bottom: 6px;
  }
}

.tool-attribute {
  align-items: flex-start !important;
}

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
