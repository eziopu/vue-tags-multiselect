<script setup>
import { ref, onMounted, nextTick } from "vue";
import { useI18n } from "vue-i18n";

// import HelloWorld from "./components/HelloWorld.vue";
import Keyboard from "./components/keyboard.vue";
import AppAttributes from "./components/app/main.vue";
import Play from "./components/play-helps/main.vue";

const isDev = false;

const i18nLocale = useI18n();
const colorMode = ref("dark");

const frameworks = ["default", "bootstrap", "semantic-ui"];
const theme = ref("default");

const toggleColorMode = () => {
  console.log(colorMode.value);
  colorMode.value = (colorMode.value == "dark")
    ? "light"
    : "dark"
}

/* theme change */
const changeTheme = (framework = "") => {
  location.href =
    window.location.protocol +
    "//" +
    window.location.host +
    (framework != "default" ? "?theme=" + framework : "");
};

/* set theme */
const urlQueryTheme = new URL(location.href).searchParams.get("theme");
if (
  frameworks.find((framework) => {
    return framework == urlQueryTheme;
  })
) {
  theme.value = urlQueryTheme;
}

onMounted(async () => {
  await nextTick();
  // eslint-disable-next-line no-undef
  PR.prettyPrint();
});
</script>

<template>
  <link
    v-if="theme == 'bootstrap'"
    rel="stylesheet"
    href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css"
    integrity="sha384-B0vP5xmATw1+K9KRQjQERJvTumQW0nPEzvF6L/Z6nronJ3oUOFUFpCjEUQouq2+l"
    crossorigin="anonymous"
  />
  <link
    v-if="theme == 'semantic-ui'"
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.4.1/semantic.min.css"
    integrity="sha512-8bHTC73gkZ7rZ7vpqUQThUDhqcNFyYi2xgDgPDHc+GXVGHXq+xPjynxIopALmOPqzo9JZj0k6OqqewdGO3EsrQ=="
    crossorigin="anonymous"
  />
  <link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
  />
  <div :class="colorMode">
    <header class="navbar">
      <a href="/" class="">
        <img class="logo" src="./assets/logo.svg" alt="Vue">
        <span class="site-name">vue-tags-multiselect</span>
      </a>
      <nav class="navbar-items">
        <button class="navbar-dropdown-title" type="button" aria-label="v2.0.0-rc.0">
          <span class="title">v2.0.0-rc.0</span>
          <span class="arrow down"></span>
        </button>
        <button class="navbar-dropdown-title" type="button" aria-label="Select language">
          <span class="title">Languages</span>
          <span class="arrow down"></span>
        </button>
      </nav>
      <label class="color-mode-toggle" arial-label="Toggle dark mode">
        <input type="checkbox">
        <span>☀️</span>
        <span>🌙</span>
      </label>
    </header>

    <aside class="sidebar">
      <ul class="sidebar-items">
        <li>
          <p tabindex="0" class="sidebar-item sidebar-heading collapsible">
            Bundlers Reference
            <span class="right arrow"></span>
          </p>
          <ul class="sidebar-item-children"></ul>
          <li>
            <a aria-label="Command Line Interface" class="sidebar-item" href="/">
              Command Line Interface
            </a>
          </li>
          <li>
            <a aria-label="Command Line Interface" class="sidebar-item" href="/">
              TEST
            </a>
          </li>
        </li>
      </ul>
    </aside>

    <main class="page ui container" :class="theme">
      <div class="ui-title" v-if="!isDev">
        <h1>vue-tags-multiselect</h1>
        <h2>{{ $t("ui.page.description.title") }}</h2>
      </div>
      <div class="ui-frameworks">
        <ul>
          <li>
            <div class="framework">
              <h4>UI framework:</h4>
              <button
                class="btn pointer"
                v-for="(framework, index) in frameworks"
                @click="changeTheme(framework)"
                :key="`framework${index}`"
                :class="{
                  active: theme == framework,
                  'btn-outline-primary': theme == 'bootstrap',
                  'ui primary button': theme == 'semantic-ui',
                  'basic ': theme == 'semantic-ui' && theme != framework,
                }"
              >
                <span v-if="framework == 'default'">
                  {{ $t("ui.general.default") }}
                </span>
                <span v-else>{{ framework }}</span>
                <span
                  class="version"
                  v-if="theme == framework && framework != 'default'"
                  v-html="framework == 'bootstrap' ? ' v4.6.0' : ' v2.4.1'"
                >
                </span>
              </button>
            </div>
          </li>

          <li>
            <h4>icon: font-awesome v4.7.0</h4>
          </li>

          <li>
            <div class="language">
              <h4>language:</h4>
              <select v-model="$i18n.locale">
                <option
                  v-for="locale in i18nLocale.availableLocales"
                  :key="locale"
                  :value="locale"
                >
                  {{ $t(`ui.languages.${locale}`) }}
                </option>
              </select>
            </div>
          </li>
        </ul>
      </div>

      <div class="demo" v-if="theme != 'default'">
        <div class="demo-control">
          <a
            class="show-code-btn pointer"
            style="color: inherit"
            target="_blank"
            :href="`https://github.com/eziopu/vue-tags-multiselect/blob/master/src/assets/stylesheets/${theme}.scss`"
          >
            scss <i class="fa fa-external-link"></i>
          </a>
        </div>
      </div>
      <hr />

      <div v-if="!isDev">
        <Keyboard></Keyboard>
        <AppAttributes></AppAttributes>
        <!-- 
          <h3>Dropdown Slots Attributes</h3>
          <DropdownAttributes></DropdownAttributes>

          <h3>Option Slots Attributes</h3>
          <OptionAttributes></OptionAttributes>

          <h3>Other Slots</h3>
          <OtherSlots></OtherSlots>

          <h3>Custome style</h3>
          <CustomStyle></CustomStyle>

          <h3>Operate all Attributes</h3>
        -->
      </div>

      <Play :theme="theme"></Play>
    </main>
  </div>
</template>

<style lang="scss" v-if="theme == 'bootstrap'">
@import "./assets/stylesheets/UI-frameworks/bootstrap.scss";
</style>

<style lang="scss" v-if="theme == 'semantic-ui'">
@import "./assets/stylesheets/UI-frameworks/semantic-ui.scss";
@import "./assets/stylesheets/UI-frameworks/bootstrap-display.css";
</style>

<style lang="scss">
@import "./assets/stylesheets/header.scss";
@import "./assets/stylesheets/header.scss";
@import "./assets/stylesheets/layout.scss";
</style>

<style scoped lang="scss">
h1,
h2,
h3,
h4,
h5,
h6 {
  margin: 0;
}
.container {
  .ui-title {
    margin: 12px 0;
    display: flex;
    align-items: flex-end;
    @media (max-width: 768px) {
      flex-wrap: wrap;
    }
    @media (min-width: 768px) {
      h2 {
        margin-left: 6px;
      }
    }
  }
  .ui-frameworks {
    li {
      margin: 6px 0;
    }

    .framework,
    .language {
      display: inline-flex;
      justify-content: flex-start;
      align-items: center;
    }
    .btn {
      margin: 0 6px;
    }
  }
  &.default {
    .ui-frameworks .btn.active {
      background: #dadada;
    }
  }
  &.bootstrap,
  &.default {
    @media all and (max-width: 768px) {
      .ui-frameworks .btn {
        padding: 0.375rem 0.6rem;
        .version {
          font-size: 12px;
        }
      }
    }
    @media all and (max-width: 540px) {
      .ui-frameworks .framework {
        display: block;
      }
    }
    @media all and (max-width: 417px) {
      .ui-frameworks {
        zoom: 80%;
      }
    }
  }
  &.semantic-ui {
    @media all and (max-width: 540px) {
      .ui-frameworks .btn {
        padding: 0.7em 0.6em;
      }
    }
    @media all and (max-width: 464px) {
      .ui-frameworks {
        .btn {
          margin: 0 3px;
        }
        .framework {
          display: block;
        }
      }
    }
  }
}
</style>
