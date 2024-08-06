<script>
export default {
  name: 'main-pagination'
}
</script>

<script setup>
import { useRoute, useRouter } from 'vue-router'
import { computed } from 'vue'

// 取得路由物件
const router = useRouter()
const route = useRoute()

const routes = router.getRoutes()

// 計算當前路由的索引
const currentIndex = computed(() => routes.findIndex((r) => r.path === route.path))

// 計算前一頁和下一頁
const prevPage = computed(() => {
  const index = currentIndex.value
  return index > 0 ? routes[index - 1] : undefined
})

const nextPage = computed(() => {
  const index = currentIndex.value
  return index < routes.length - 1 ? routes[index + 1] : undefined
})
</script>

<template>
  <nav class="page-nav">
    <span class="prev">
      <RouterLink
        v-if="prevPage != undefined"
        :aria-label="prevPage.name"
        :to="{ path: prevPage.path, query: $route.query }"
      >
        {{ prevPage.name }}
      </RouterLink>
    </span>
    <span class="next">
      <RouterLink
        v-if="nextPage != undefined"
        :aria-label="nextPage.name"
        :to="{ path: nextPage.path, query: $route.query }"
      >
        {{ nextPage.name }}
      </RouterLink>
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
    content: '←';
    padding-right: 1rem;
  }

  .next a:after {
    content: '→';
    padding-left: 1rem;
  }

  @media (max-width: 390px) {
    a {
      font-size: 14px;
    }

    .prev a:before {
      padding-right: 0.3rem;
    }

    .next a:after {
      padding-left: 0.3rem;
    }
  }
}
</style>
