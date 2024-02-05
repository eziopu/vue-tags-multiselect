<script setup>
import { ref, onMounted, nextTick, provide, readonly } from "vue";

// == Components ==============
// import Keyboard from "./components/keyboard.vue";
import Attributes from "./components/app/main.vue";
import Play from "./components/play-helps/main.vue";
// demo
import Install from "./components/play-helps/main.vue";
import Slots from "./components/play-helps/main.vue";
import Dropdown from "./components/play-helps/main.vue";
import Option from "./components/play-helps/main.vue";

import Header from "./components/layout/header/main.vue";


// == Page ==============
const currentPage = ref("install");
const components = {
  "install": Install,
  "attributes": Attributes,
  "slots": Slots,
  "slot-dropdown": Dropdown,
  "slot-option": Option,
  "play": Play
};
const pages = ["install", "attributes", "slots", "slot-dropdown", "slot-option", "play"];
provide("currentPage", currentPage);
provide("pages", readonly(Object.keys(components)));

const getComponentPage = (input) => {
  const component = components[input];
  return component ? component : components["install"];
}

/* set current page */
const urlPathname = new URL(location.href).pathname.replace(/\//g, '');
if (urlPathname == "") {
  currentPage.value = pages[5];
} else {
  if (components[urlPathname] != undefined) {
    currentPage.value = urlPathname;
  }
}


// == Framework ==============
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

  <div>
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
            :href="`https://github.com/eziopu/vue-tags-multiselect/blob/main/demo/assets/stylesheets/${framework}.scss`"
          >
            scss <i class="fa fa-external-link"></i>
          </a>
        </div>
      </div>
      
      {{ currentPage }}
      <Transition name="out-in">
        <component
          :is="getComponentPage(currentPage)"
          :framework="framework">
        </component>
      </Transition>
      
        <!-- 
          <Keyboard></Keyboard>
          <AppAttributes></AppAttributes>
          <h3>Dropdown Slots Attributes</h3>
          <DropdownAttributes></DropdownAttributes>

          <h3>Option Slots Attributes</h3>
          <OptionAttributes></OptionAttributes>

          <h3>Other Slots</h3>
          <OtherSlots></OtherSlots>

          <h3>Custome style</h3>
          <CustomStyle></CustomStyle>

          <h3>Operate all Attributes</h3>
          <Play :framework="framework"></Play>
        -->

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
@import "./assets/stylesheets/color.css";
@import "./assets/stylesheets/package-dark-theme.scss";
@import "./assets/stylesheets/header.scss";
@import "./assets/stylesheets/layout.scss";
</style>

<style scoped lang="scss">
.out-in-enter-active,
.out-in-leave-active {
  transition: all 0.25s ease-out;
}

.out-in-enter-from {
  opacity: 0;
  transform: translateX(10px);
}

.out-in-leave-to {
  opacity: 0;
  transform: translateX(-10px);
}
</style>
