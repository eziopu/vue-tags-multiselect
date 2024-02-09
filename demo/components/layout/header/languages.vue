<script>
  export default {
    name: "header-languages",
  }
</script>

<script setup>
import { useI18n } from "vue-i18n";
const i18nLocale = useI18n();

const setLocale = (locale) => {
  i18nLocale.locale.value = locale;
  localStorage.setItem("lang", locale);
  document.querySelector('html').setAttribute('lang', locale);
}
</script>

<template>
  <div class="navbar-dropdown navbar-languages">
    <button class="navbar-dropdown--button">
        {{ $t(`ui.general.language`) }}
      <i class="fa fa-caret-down"></i>
    </button>
    <div class="navbar-dropdown--content">
      <span
        class="navbar-dropdown--option"
        v-for="locale in i18nLocale.availableLocales"
        :key="locale"
        :value="locale"
        :class="{active: $i18n.locale == locale }"
        @click="setLocale(locale)"
      >
        {{ $t(`ui.languages.${locale}`) }}
      </span>
    </div>
  </div>
</template>