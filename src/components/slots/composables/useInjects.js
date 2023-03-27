import { inject } from "vue";

export default function useInjects() {
  // ================ INJECT ================

  const app = {
    props: inject("appProps"),

    reFocus: inject("appReFocus"),
    nextReFocusDontInit: inject("appNextReFocusDontInit"),
    editTagIndex: inject("appEditTagIndex"),

    tags: inject("appTags"),
    updateTag: inject("appUpdateTag"),
    stashTag: inject("appStashTag"),
    setStashTag: inject("appSetStashTag"),
    setTagToTags: inject("appSetTagToTags"),
  };

  const dropdown = {
    props: inject("dropdownProps") || {},
    isDown: inject("dropdownIsDown") || false,
    getTitleInnerHTML: inject("dropdownGetTitleInnerHTML") || "",
    classList: inject("dropdownClassList") || [],
  };

  return { app, dropdown };
}
