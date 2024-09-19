<script>
export default {
  name: 'header-languages'
}
</script>

<script setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
const i18nLocale = useI18n()

const setLocale = (locale) => {
  i18nLocale.locale.value = locale
  localStorage.setItem('lang', locale)
  document.querySelector('html').setAttribute('lang', locale)
}

const isActive = ref(false)
/**
 * toggle active by mouse
 * @return {void}
 */
const toggleActiveByMouse = (boolean = false) => {
  if (window.innerWidth <= 890) {
    return
  }
  isActive.value = boolean
}
</script>

<template>
  <div
    class="navbar-dropdown navbar-languages"
    :class="{ active: isActive }"
    @mouseover="toggleActiveByMouse(true)"
    @mouseleave="toggleActiveByMouse(false)"
    @click="isActive = !isActive"
  >
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
        :class="{ active: $i18n.locale == locale }"
        @click="setLocale(locale)"
      >
        {{ $t(`ui.languages.${locale}`) }}
      </span>
    </div>
  </div>
</template>
