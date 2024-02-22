<script>
  export default {
    name: "header-pages",
  }
</script>

<script setup>
import { inject } from "vue";

const setCurrentPage = inject("setCurrentPage");
const currentPage = inject("currentPage");
const pages = inject("pages") || [];

</script>

<template>
  <div class="navbar-dropdown navbar-pages">
    <button class="navbar-dropdown--button">
        {{ currentPage == "Install" ? "Pages" : currentPage }}
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
        {{ page.replace(/-/g, " ") }}
      </span>
    </div>
  </div>
</template>