<script>
  export default {
    name: "header-frameworks",
  }
</script>

<script setup>
import { inject } from "vue";

const theme = inject("theme");
const frameworks = inject("frameworks") | [];

/* theme change */
const changeTheme = (framework = "") => {
  location.href =
    window.location.protocol +
    "//" +
    window.location.host +
    (framework != "default" ? "?theme=" + framework : "");
};
</script>

<template>
  <div class="navbar-dropdown">
    <button class="navbar-dropdown--button">
        <span v-if="theme == 'default'">
          UI framework
        </span>
        <span v-else
          v-html="theme + (theme == 'bootstrap' ? ' v4.6.0 ' : ' v2.4.1 ')"
        >
        </span>
      <i class="fa fa-caret-down"></i>
    </button>
    
    <div class="navbar-dropdown--content">
      <span
        v-for="(framework, index) in frameworks"
        class="navbar-dropdown--option"
        :class="{active: theme == framework }"
        @click="changeTheme(framework)"
        :key="`framework${index}`"
        :value="locale"
      >
        <span v-if="framework == 'default'">
          {{ $t("ui.general.default") }}
        </span>
        <span v-else>
          {{ framework }}
          <span
            class="version"
            v-if="theme == framework && framework != 'default'"
            v-html="framework == 'bootstrap' ? ' v4.6.0' : ' v2.4.1'"
          >
          </span>
        </span>
      </span>
    </div>
  </div>
</template>
