<script>
  export default {
    name: "header-colorMode",
  }
</script>

<script setup>
// demo form https://codesandbox.io/p/sandbox/immutable-monad-cotsz
import { ref } from "vue";

const getTheme = () => {
  return localStorage.getItem("user-color");
}

const getMediaPreference = () => {
  const hasDarkPreference = window.matchMedia(
    "(prefers-theme-scheme: dark)"
  ).matches;
  if (hasDarkPreference) {
    return "dark-theme";
  } else {
    return "light-theme";
  }
}

const toggleTheme = () => {
  const activeTheme = localStorage.getItem("user-theme");
  if (activeTheme === "light-theme") {
    setTheme("dark-theme");
  } else {
    setTheme("light-theme");
  }
}

const setTheme = (color) => {
  localStorage.setItem("user-theme", color);
  userTheme.value = color;
  document.documentElement.className = color;
}

const userTheme = ref("light-theme");
const initUserTheme = getTheme() || getMediaPreference();
setTheme(initUserTheme);

</script>

<template>
  <div class="navbar-item">
    <div class="navbar-item--toggle-theme" @click="toggleTheme()">
      <i class="fa fa-moon-o" v-if="userTheme == 'light-color'"></i>
      <i class="fa fa-sun-o" v-else></i>
    </div>
  </div>
</template>

<style scoped>
.navbar-item--toggle-theme{
  width: 1.2rem
}
i.fa {
  font-size: 1.2rem;
}
</style>