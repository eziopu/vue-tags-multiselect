<script setup>
import { ref } from "vue";
import { useI18n } from "vue-i18n";

// import HelloWorld from "./components/HelloWorld.vue";
import Play from "./components/play-helps/main.vue";

const i18nLocale = useI18n();
const frameworks = ["default", "bootstrap", "semantic-ui"];
const theme = ref("default");

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

  <div class="ui container" :class="theme">
    <div class="ui-frameworks">
      <h2>{{ $t("ui.page.description.demo") }}</h2>
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

    <!-- <Keyboard></Keyboard>
      <AppAttributes></AppAttributes>

      <h3>Dropdown Slots Attributes</h3>
      <DropdownAttributes></DropdownAttributes>

      <h3>Option Slots Attributes</h3>
      <OptionAttributes></OptionAttributes>

      <h3>Other Slots</h3>
      <OtherSlots></OtherSlots>

      <h3>Custome style</h3>
      <CustomStyle></CustomStyle>

      <h3>Operate all Attributes</h3> -->
    <Play :theme="theme"></Play>
  </div>

  <!-- <header>
    <img
      alt="Vue logo"
      class="logo"
      src="./assets/logo.svg"
      width="125"
      height="125"
    />

    <div class="wrapper">
      <HelloWorld msg="You did it!" />
    </div>
  </header>

  <main>
    <v-tags-multiselect>
      <v-tag-dropdown value="country" custom>
        <v-tag-option title> title111 </v-tag-option>
        <v-tag-option value="Māre111" selected> 11Māre1111 </v-tag-option>
        <v-tag-option value="Eldia2222" selected>
          <p>11Eldia2222</p>
        </v-tag-option>
        <v-tag-option value="1111333"> 1111333 </v-tag-option>
        <v-tag-option value="1114444"> 1114444 </v-tag-option>
        <v-tag-option value="111555"> 111555 </v-tag-option>
      </v-tag-dropdown>
      <v-tag-dropdown value="country333">
        <v-tag-option value="3Māre111"> 333Māre1111 </v-tag-option>
        <v-tag-option value="3Eldia2222">
          <p>33332Eldia2222</p>
        </v-tag-option>
      </v-tag-dropdown>
    </v-tags-multiselect>
    <v-tag-dropdown value="country2" displayAll>
      <v-tag-option title> title2222 </v-tag-option>
      <v-tag-option value="2Māre111" selected> 222Māre1111 </v-tag-option>
      <v-tag-option value="2Eldia2222" selected>
        <p>222Eldia2222</p>
      </v-tag-option>
      <v-tag-option value="22223333"> 22223333 </v-tag-option>
      <v-tag-option value="2224444"> 2224444 </v-tag-option>
      <v-tag-option value="22555"> 22555 </v-tag-option>
    </v-tag-dropdown>
  </main>
  -->
</template>

<style lang="scss" v-if="theme == 'bootstrap'">
@import "./assets/stylesheets/bootstrap.scss";
</style>

<style lang="scss" v-if="theme == 'semantic-ui'">
@import "./assets/stylesheets/semantic-ui.scss";
@import "./assets/stylesheets/bootstrap-display.css";
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
  .ui-frameworks {
    h2 {
      margin: 12px 0;
    }
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

<style lang="scss">
body {
  background-color: #f5f5f5 !important;
}

.pointer {
  cursor: pointer;
}

.text-center {
  text-align: center;
}

.container.default {
  table {
    width: 100%;
    border-collapse: collapse;
  }
  table,
  td,
  th {
    border: 1px solid black;
  }
}

.demo {
  margin-top: 30px;
  margin-bottom: 30px;

  &,
  .relative {
    position: relative;
  }

  .attributes {
    &:not(.ui):not(.default) input {
      height: calc(1em + 0.75rem + 2px);
    }
    &.ui input {
      padding: 0.3em 1em;
    }
  }

  .attribute.disable {
    pointer-events: none;
    opacity: 0.6;
  }
  .depiction {
    margin-bottom: 6px;

    .sub-depiction {
      padding-left: 12px;
      p {
        margin: 0;
      }
    }
    code.tag {
      background: #333;
      padding: 6px;
      color: white;
      border-radius: 0.25rem;
    }
  }

  .demo-control {
    position: absolute;
    right: 0px;
    top: -24px;
    color: #888;
    * {
      margin: 0 3px;
    }
  }
  .show-code-btn {
    font-weight: bold;
  }
  .show-code-btn.active {
    color: #444;
  }
  .detail {
    margin: 0 0;
  }
  .flex-between {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
  }

  #helps,
  #datas {
    .title {
      display: inline-block;
    }
    .title.ui {
      margin-top: 12px;
      margin-bottom: 0;
    }
    hr {
      margin: 0.5rem !important;
    }
    .attributes {
      .operation {
        display: flex;
        justify-content: space-between;
        align-items: baseline;
        padding: 6px 12px;
      }
      @media all and (max-width: 410px) {
        .operation.text {
          display: block !important;
        }
      }
    }
    .simple.attributes {
      .flex-between {
        float: left;
        padding: 6px 12px;
      }
      .clear {
        clear: both;
      }
    }

    .detail.attributes {
      .row {
        & {
          display: flex;
          flex-wrap: wrap;
        }
        &.titles h6 {
          margin: 0;
          background: #e9ecef;
          padding: 0.75rem;
        }
        &:not(.titles):not(:last-child) {
          border-bottom: 1px solid #dee2e6;
        }
        &:not(.titles) > div {
          padding: 0.6rem;
          box-sizing: border-box;
        }
      }
      code {
        background-color: #333;
        color: white;
        border-radius: 3px;
        padding: 3px;
      }
      @media all and (max-width: 768px) {
        .row {
          &.titles {
            display: none;
          }
          &:not(.titles) {
            display: block !important;
            padding: 0.4rem;

            &:nth-child(even) {
              background: #e9ecef;
            }
            & > div {
              border-bottom: 0px;
              width: 100%;
              padding: 0.2rem;
            }
            & > div:first-child div:first-child {
              font-size: 18px;
              font-weight: bold;
            }
            & > div:not(:first-child) {
              padding-left: 12px;
            }
          }
        }
      }
    }
  }

  span.arrow {
    width: 13px;
    height: 13px;
    display: inline-block;
    position: relative;
    bottom: -5px;
    left: -10px;
    margin: 0 6px;
    margin-left: 14px;
    transition: 0.4s ease;
    margin-top: 2px;
    text-align: left;
    transform: rotate(45deg);

    &:before,
    &:after {
      position: absolute;
      content: "";
      display: inline-block;
      width: 12px;
      height: 3px;
      background-color: black;
      transition: 0.4s ease;
    }
    &:after {
      transform: rotate(90deg);
      top: -5px;
      left: 5px;
    }
  }
  .active .arrow {
    transform: rotate(45deg) translate(-5px, -5px);
    &:before {
      transform: translate(10px, 0);
    }
    &:after {
      transform: rotate(90deg) translate(10px, 0);
    }
  }

  pre {
    margin: 0;
    margin-top: 6px;
    padding: 16px;
    overflow: auto;
    font-size: 85%;
    color: white;
    background-color: #333;
    border-radius: 3px;
    white-space: pre-wrap;
    transform-origin: top;
    transition: transform 0.3s ease-in-out;
  }
  .transition-top {
    transform-origin: top;
    transition: transform 0.3s ease-in-out;
  }
  .prettyprint.lang-html.customize {
    .tag {
      color: #61afef;
    }
    .atn {
      color: #e0e2e4;
    }
    .lit,
    .lit span {
      color: #facd22 !important;
    }
    .atv {
      color: #ca9564;
    }
    .com {
      color: #66747b;
    }
    .cyan-blue,
    .cyan-blue span {
      color: #53abb7;
    }
    .green,
    .green span {
      color: #8ac379;
    }
    .purple,
    .purple span {
      color: #c678dd;
    }
    .red,
    .red span {
      color: #e06c62;
    }

    .bolder {
      font-weight: bolder;
    }
  }
  code a:link,
  code a:visited {
    text-decoration: none;
  }
  .slide-enter,
  .slide-leave-to {
    transform: scaleY(0);
  }
}
</style>
