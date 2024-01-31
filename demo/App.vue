<script setup>
import { ref, onMounted, nextTick, provide, readonly } from "vue";

// import HelloWorld from "./components/HelloWorld.vue";
import Keyboard from "./components/keyboard.vue";
import AppAttributes from "./components/app/main.vue";
import Play from "./components/play-helps/main.vue";

import Header from "./components/layout/header/main.vue";

const currentPage = ref("install");
const pages = ["install", "attributes", "slots", "slot-dropdown", "slot-option", "play"];
provide("currentPage", currentPage);
provide("pages", readonly(pages));

const isDev = false;

const framework = ref("default");
const frameworks = ["default", "bootstrap", "semantic-ui"];
provide("framework", framework);
provide("frameworks", readonly(frameworks));

/* set framework */
const urlQueryFramework = new URL(location.href).searchParams.get("framework");
if (
  frameworks.find((framework) => {
    return framework == urlQueryFramework;
  })
) {
  framework.value = urlQueryFramework;
}

const hostname = location.pathname;
if (hostname == "/") {
  currentPage.value = pages[0];
}

onMounted(async () => {
  await nextTick();
  // eslint-disable-next-line no-undef
  PR.prettyPrint();
});
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
  <div :class="colorMode">
    <Header />

    <!-- <aside class="sidebar">
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
    </aside> -->

    <main class="page ui container" :class="framework">
      <div class="demo" v-if="framework != 'default'">
        <div class="demo-control">
          <a
            class="show-code-btn pointer"
            style="color: inherit"
            target="_blank"
            :href="`https://github.com/eziopu/vue-tags-multiselect/blob/master/src/assets/stylesheets/${framework}.scss`"
          >
            scss <i class="fa fa-external-link"></i>
          </a>
        </div>
      </div>

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

      <Play :framework="framework"></Play>
    </main>
  </div>
</template>

<style lang="scss" v-if="framework == 'bootstrap'">
@import "./assets/stylesheets/UI-frameworks/bootstrap.scss";
</style>

<style lang="scss" v-if="framework == 'semantic-ui'">
@import "./assets/stylesheets/UI-frameworks/semantic-ui.scss";
@import "./assets/stylesheets/UI-frameworks/bootstrap-display.css";
</style>

<style lang="scss">
@import "./assets/stylesheets/header.scss";
@import "./assets/stylesheets/layout.scss";
@import "./assets/stylesheets/color.css";

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
