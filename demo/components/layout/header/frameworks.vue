<script>
export default {
  name: 'header-frameworks'
}
</script>

<script setup>
import { inject } from 'vue'

const framework = inject('framework')
const frameworks = inject('frameworks') || []

/* framework change */
const changeframework = (inputFramework = '') => {
  if (framework.value == inputFramework) {
    return
  }

  const url = window.location
  const search = inputFramework != 'default' ? '?framework=' + inputFramework : ''

  let hash = url.hash
  const questionMarkIndex = hash.indexOf('?')

  if (questionMarkIndex !== -1) {
    hash = hash.substring(0, questionMarkIndex)
  }
  
  location.href = url.protocol + '//' + url.host + url.pathname + hash + search;
  location.reload()
}
</script>

<template>
  <div class="navbar-dropdown navbar-frameworks">
    <button class="navbar-dropdown--button">
      <span v-if="framework == 'default'"> UI framework </span>
      <span v-else v-html="framework + (framework == 'bootstrap' ? ' v4.6.0 ' : ' v2.4.1 ')">
      </span>
      <i class="fa fa-caret-down"></i>
    </button>

    <div class="navbar-dropdown--content">
      <span
        v-for="(inputFramework, index) in frameworks"
        class="navbar-dropdown--option"
        :class="{ active: framework == inputFramework }"
        @click="changeframework(inputFramework)"
        :key="`framework${index}`"
        :value="inputFramework"
      >
        <span v-if="inputFramework == 'default'">
          {{ $t('ui.general.Default', 0) }}
        </span>
        <span v-else>
          {{ inputFramework }}
          <span
            class="version"
            v-if="framework == inputFramework && inputFramework != 'default'"
            v-html="inputFramework == 'bootstrap' ? ' v4.6.0' : ' v2.4.1'"
          >
          </span>
        </span>
      </span>
    </div>
  </div>
</template>
