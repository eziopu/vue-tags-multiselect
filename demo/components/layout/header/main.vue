<template>
  <header class="navbar">
    <a href="/" class="navbar-site">
      <img class="logo" src="../../../assets/logo.svg" alt="Vue">
      <h1 class="site-name">vue-tags-multiselect</h1>
    </a>

    <div class="navbar-items">
      <Frameworks />
      <Languages />
      <colorTheme />
    </div>
  </header>
</template>

<script>
  export default {
    name: "header-main",
  }
</script>

<script setup>
import Frameworks from "./frameworks.vue";
import Languages from "./languages.vue";
import colorTheme from "./colorTheme.vue";
</script>

