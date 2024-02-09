<script>
  export default {
    name: "header-pages",
  }
</script>

<script setup>
import { inject } from "vue";

const currentPage = inject("currentPage");
const pages = inject("pages") || [];

const setCurrentPage = (input) => {
  currentPage.value = input;
  pushURLPathnameState(input);
}

const pushURLPathnameState = (newPath) => {
  const currentUrl = new URL(window.location.href);
  currentUrl.pathname = newPath;
  
  const newUrl = currentUrl.href;
  window.history.pushState({ path: newUrl }, '', newUrl);
}

</script>

<template>
  <div class="navbar-dropdown navbar-pages">
    <button class="navbar-dropdown--button">
        Pages
      <i class="fa fa-caret-down"></i>
    </button>
    <div class="navbar-dropdown--content">
      <span
        class="navbar-dropdown--option"
        v-for="page in pages"
        :key="page"
        :value="page"
        :class="{active: currentPage == page }"
        @click="setCurrentPage(page)"
      >
        {{ page }}
      </span>
    </div>
  </div>
</template>