<template>
  <header class="navbar">
    <a :href="home_link" class="navbar-site" :data-intro="$t('ui.page.intro.wellcome')">
      <img class="logo" src="../../../assets/logo.svg" alt="Vue" />
      <h1 class="site-name">vue-tags-multiselect</h1>
    </a>

    <div class="navbar-items">
      <Pages :data-intro="$t('ui.page.intro.pages')" />
      <div class="navbar-line"></div>
      <Frameworks :data-intro="$t('ui.page.intro.frameworks')" />
      <Languages :data-intro="$t('ui.page.intro.languages')" />
      <colorTheme :data-intro="$t('ui.page.intro.colorTheme')" />
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
        <div class="navbar-item--help" @click="introStart()">
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

import { inject } from 'vue'

const introStart = inject('introStart')
const framework = inject('framework')
const home_link = framework.value !== 'default' ? `#/?framework=${framework.value}` : '#/'
</script>
