import { createI18n } from "vue-i18n";

import enUS from "./locales/en-US.json";
import zhHant from "./locales/zh-Hant.json";
console.log(localStorage.getItem("lang"));

const messages = {
  "en-US": enUS,
  "zh-Hant": zhHant,
};

const langs = Object.keys(messages);
const lang = localStorage.getItem("lang");
let defaultLocale = langs[0];

if (lang != langs[0] && langs.includes(lang)) {
  console.log("0000");
  defaultLocale = lang;
} else {
  console.log("1111111");
  localStorage.setItem("lang", defaultLocale);
}
console.log(defaultLocale);
console.log(localStorage.getItem("lang"));
document.querySelector('html').setAttribute('lang', defaultLocale);

const i18n = createI18n({
  legacy: false, // 要把 legacy 設為 false，才可以使用 Composition API
  locale: defaultLocale,
  globalInjection: true,
  messages: messages,
});

export default i18n;
