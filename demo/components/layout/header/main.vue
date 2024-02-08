<template>
  <header class="navbar">
    <a href="/" class="navbar-site">
      <img class="logo" src="../../../assets/logo.svg" alt="Vue">
      <h1 class="site-name">vue-tags-multiselect</h1>
    </a>

    <div class="navbar-items">
      <Pages />
      <div class="navbar-line"></div>
      <Frameworks />
      <Languages />
      <colorTheme />
    </div>

    <Burger />
    <div class="header-overlay"></div>

  </header>
</template>

<script>
  export default {
    name: "header-main",
  }
</script>

<script setup>
import Pages from "./pages.vue";
import Frameworks from "./frameworks.vue";
import Languages from "./languages.vue";
import colorTheme from "./colorTheme.vue";
import Burger from "./burger.vue";

</script>

