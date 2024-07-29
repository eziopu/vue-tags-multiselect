<script>
export default {
  name: 'exposes-pushTag__parameter'
}
</script>

<script setup>
import { GET_EXPOSES__PUSHTAG_PARAMETER_DETAIL } from '@models/attributes/detail.js'
</script>

<template>
  <div id="method-pushTag__parameter--table" class="demo__table container">
    <div class="row titles">
      <div v-for="item in ['Attribute', 'Description', 'Type', 'Default', 'Required']" :key="item">
        <h5>{{ $t(`ui.general.${item}`) }}</h5>
      </div>
    </div>
    
    <div class="row" v-for="(value, key) in GET_EXPOSES__PUSHTAG_PARAMETER_DETAIL()" :key="`parameters_${key}`">
      <div>{{ key }}</div>
      <div>
        <span class="i-block d-md-none">{{ $t(`ui.general.Description`) }}: </span>
        <span>{{ $t(`attributes.exposes.pushTag__details.parameter.${key}`) }}</span>
      </div>

      <div>
        <span class="i-block d-md-none"> {{ $t(`ui.general.Type`) }}: </span>
        {{ value.type }}
      </div>
      <div>
        <span class="i-block d-md-none"> {{ $t(`ui.general.Default`) }}: </span>
        {{ value.default }}
      </div>
      <div v-if="!value.isRequired">
        <div class="d-none d-md-block">no</div>
      </div>
      <div v-else>
        <span class="i-block d-md-none"> {{ $t(`ui.general.Required`) }}: </span>
        *yes
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@media (min-width: 768px) {
  #method-pushTag__parameter--table .row {
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
