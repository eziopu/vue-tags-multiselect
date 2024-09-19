<script>
export default {
  name: 'header-pages'
}
</script>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

// 使用 Vue Router hooks 來獲取當前路由和路由器實例
const route = useRoute()
const router = useRouter()

const currentPage = ref(route.name)
const pages = router.getRoutes()

router.afterEach((to) => {
  updateCurrentPage(to)
})

const updateCurrentPage = (to) => {
  if (window.innerWidth < 890) {
    currentPage.value = 'Pages'
  } else {
    currentPage.value = to.name
  }
}

onMounted(() => {
  updateCurrentPage(route)
  window.addEventListener('resize', () => updateCurrentPage(route))
})

const isActive = ref(false)
/**
 * toggle active
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
    class="navbar-dropdown navbar-pages"
    :class="{ active: isActive }"
    @mouseover="toggleActiveByMouse(true)"
    @mouseleave="toggleActiveByMouse(false)"
  >
    <button class="navbar-dropdown--button">
      {{ currentPage }}
      <i class="fa fa-caret-down"></i>
    </button>
    <div class="navbar-dropdown--content">
      <RouterLink
        class="navbar-dropdown--option"
        data-action="close-navbar"
        v-for="page in pages"
        :key="page.name"
        :class="{ active: currentPage == page.name }"
        :to="{ path: page.path, query: $route.query }"
      >
        {{ page.name }}
      </RouterLink>
    </div>
  </div>
</template>
