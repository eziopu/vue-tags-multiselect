<script setup>
import { ref, onMounted, nextTick, provide, readonly } from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute()

import Header from './components/layout/header/main.vue'
import Pagination from './components/layout/pagination.vue'

// == google-code-prettify ==============
const prettyCode = async () => {
  await nextTick()
  // eslint-disable-next-line no-undef
  PR.prettyPrint()
}
onMounted(() => {
  prettyCode()
})

// == Framework ==============
const frameworks = ['default', 'bootstrap', 'semantic-ui']
const framework = ref(frameworks[0])
provide('framework', framework)
provide('frameworks', readonly(frameworks))

/* set framework */
const urlQueryFramework = new URL(location.href).searchParams.get('framework')
if (
  frameworks.find((framework) => {
    return framework == urlQueryFramework
  })
) {
  framework.value = urlQueryFramework
}
</script>

<template>
  <link
    v-if="framework == 'bootstrap'"
    rel="stylesheet"
    href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css"
    integrity="sha384-B0vP5xmATw1+K9KRQjQERJvTumQW0nPEzvF6L/Z6nronJ3oUOFUFpCjEUQouq2+l"
    crossorigin="anonymous"
  />
  <link
    v-if="framework == 'semantic-ui'"
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.4.1/semantic.min.css"
    integrity="sha512-8bHTC73gkZ7rZ7vpqUQThUDhqcNFyYi2xgDgPDHc+GXVGHXq+xPjynxIopALmOPqzo9JZj0k6OqqewdGO3EsrQ=="
    crossorigin="anonymous"
  />
  <link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
  />

  <div>
    <Header />

    <main class="page ui container" :class="framework">
      <div class="page-title">
        <h2>{{ route.name }}</h2>

        <div class="demo page-framework-css" v-if="framework != 'default'">
          <div class="demo-control">
            <a
              class="show-code-btn pointer"
              style="color: inherit"
              target="_blank"
              :href="`https://github.com/eziopu/vue-tags-multiselect/blob/main/demo/assets/stylesheets/UI-frameworks/${framework}.scss`"
            >
              framework css <i class="fa fa-external-link"></i>
            </a>
          </div>
        </div>
      </div>

      <router-view v-slot="{ Component }">
        <Transition name="out-in">
          <component :is="Component" :framework="framework"></component>
        </Transition>
      </router-view>

      <Pagination />
    </main>
  </div>
</template>

<style lang="scss" v-if="framework == 'bootstrap'">
@import './assets/stylesheets/UI-frameworks/bootstrap.scss';
</style>

<style lang="scss" v-if="framework == 'semantic-ui'">
@import './assets/stylesheets/UI-frameworks/semantic-ui.scss';
@import './assets/stylesheets/UI-frameworks/bootstrap-display.css';
</style>

<style lang="scss">
@import './assets/stylesheets/color.css';
@import './assets/stylesheets/package-dark-theme.scss';
@import './assets/stylesheets/header.scss';
@import './assets/stylesheets/layout.scss';
@import './assets/stylesheets/demo-layout.scss';
@import './assets/stylesheets/pretty-code.scss';
</style>

<style scoped lang="scss">
.page-title {
  display: flex;
  justify-content: space-between;

  h2 {
    margin-top: 1.6rem;
  }
  .page-framework-css {
    white-space: nowrap;
  }
}
</style>
