<script>
export default {
  name: 'header-colorTheme'
}
</script>

<script setup>
// demo form https://codesandbox.io/p/sandbox/immutable-monad-cotsz
import { ref } from 'vue'

const getTheme = () => {
  return localStorage.getItem('user-theme')
}

const getMediaPreference = () => {
  const hasDarkPreference = window.matchMedia('(prefers-theme-scheme: dark)').matches
  if (hasDarkPreference) {
    return 'dark-theme'
  } else {
    return 'light-theme'
  }
}

const toggleTheme = () => {
  const activeTheme = localStorage.getItem('user-theme')
  if (activeTheme === 'light-theme') {
    setTheme('dark-theme')
  } else {
    setTheme('light-theme')
  }
}

const setTheme = (theme) => {
  localStorage.setItem('user-theme', theme)
  userTheme.value = theme
  document.documentElement.className = theme
}

const userTheme = ref('light-theme')
const initUserTheme = getTheme() || getMediaPreference()
setTheme(initUserTheme)
</script>

<template>
  <div class="navbar-item navbar-icon navbar-toggleTheme">
    <div class="navbar-item--toggle-theme" @click="toggleTheme()">
      <i class="fa fa-moon-o" v-if="userTheme == 'light-theme'"></i>
      <i class="fa fa-sun-o" v-else></i>
    </div>
  </div>
</template>
