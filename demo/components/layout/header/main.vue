<template>
  <header class="navbar">
    <a :href="home_link" class="navbar-site" data-intro="歡迎來到說明與範例頁">
      <img class="logo" src="../../../assets/logo.svg" alt="Vue" />
      <h1 class="site-name">vue-tags-multiselect</h1>
    </a>

    <div class="navbar-items">
      <Pages data-intro="這裡有更多參數與範例頁" />
      <div class="navbar-line"></div>
      <Frameworks data-intro="可切換不同的CSS框架" />
      <Languages data-intro="目前有兩種語言(en/zh)" />
      <colorTheme data-intro="還有夜間模式!" />
      <a
        class="navbar-item navbar-icon navbar-github"
        href="https://github.com/eziopu/vue-tags-multiselect"
        target="_blank"
        title="open github"
      >
        <div class="navbar-item--github">
          <i class="fa fa-github"></i>
        </div>
      </a>

      <div class="navbar-item navbar-icon navbar-help">
        <div class="navbar-item--help" @click="introJs().start()">
          <i class="fa fa-question-circle"></i>
        </div>
      </div>
    </div>

    <Burger />
    <div class="header-overlay"></div>
  </header>
</template>

<script>
export default {
  name: 'header-main'
}
</script>

<script setup>
import Pages from './pages.vue'
import Frameworks from './frameworks.vue'
import Languages from './languages.vue'
import colorTheme from './colorTheme.vue'
import Burger from './burger.vue'

import introJs from 'intro.js'
import { inject } from 'vue'

const framework = inject('framework')
const home_link = framework.value !== 'default' ? `#/?framework=${framework.value}` : '#/'
</script>
