import { createI18n } from "vue-i18n";

import enUS from "./locales/en-US.json";
import zhTW from "./locales/zh-TW.json";

const i18n = createI18n({
  legacy: false, // 要把 legacy 設為 false，才可以使用 Composition API
  locale: "zh-TW",
  fallbackLocale: "zh-TW",
  globalInjection: true,
  messages: {
    "en-US": enUS,
    "zh-TW": zhTW,
  },
});

export default i18n;
