<script>
  export default {
    name: "main-pagination",
  }
</script>

<script setup>
import { inject, computed } from "vue";

const setCurrentPage = inject("setCurrentPage");
const currentPage = inject("currentPage");
const pages = inject("pages") || [];

const removeHyphen = (input = "") => {
  return input.replace(/-/g, " ")
}

const pageInfo = computed(() => {
  const currentIndex = pages.indexOf(currentPage.value);
  const prev = currentIndex > 0 ? pages[currentIndex - 1] : undefined;
  const next = currentIndex < pages.length - 1 ? pages[currentIndex + 1] : undefined;
  return { prev, next };
});

</script>

<template>
  <nav class="page-nav">
    <span class="prev">
      <a v-if="pageInfo.prev != undefined"  
        @click="setCurrentPage(pageInfo.prev)"
        :aria-label="pageInfo.prev"
      >
        {{ removeHyphen(pageInfo.prev) }}
      </a>
    </span>
    <span class="next">
      <a v-if="pageInfo.next != undefined"  
        @click="setCurrentPage(pageInfo.next)"
        :aria-label="pageInfo.next"
      >
        {{ removeHyphen(pageInfo.next) }}
      </a>
    </span>
  </nav>
</template>

<style scoped lang="scss">
.page-nav {
  display: flex;
  justify-content: space-between;
  border-top: 1px solid var(--background-color-tertiary);
  padding: 1rem 0 2rem;

  a {
    font-weight: 500;
    color: var(--text-color-primary);
    text-decoration: none;
    overflow-wrap: break-word;
    cursor: pointer;
  }

  .prev a:before {
    content: "←";
    padding-right: 1rem;
  }

  .next a:after {
    content: "→";
    padding-left: 1rem;
  }

  @media (max-width: 390px) {
    a {
      font-size: 14px;
    }

    .prev a:before {
      padding-right: .3rem;
    }

    .next a:after {
      padding-left: .3rem;
    }
  }
}
</style>