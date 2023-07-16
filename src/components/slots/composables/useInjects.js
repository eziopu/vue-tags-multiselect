import { inject } from "vue";

export default function useInjects() {
  // ============== INJECT ================

  const app = {
    props: inject("appProps"),
    conjunction: inject("appConjunction"),

    reFocus: inject("appReFocus"),
    nextReFocusDontInit: inject("appNextReFocusDontInit"),
    editTagIndex: inject("appEditTagIndex"),

    tags: inject("appTags"),
    updateTag: inject("appUpdateTag"),
    stashTag: inject("appStashTag"),
    setStashTag: inject("appSetStashTag"),
    setTagToTags: inject("appSetTagToTags"),
    elInputValue: inject("appElInputValue"),
    callOptionSetTag: inject("appCallOptionSetTag"),
    callOptionSetTagFinish: inject("appCallOptionSetTagFinish"),
  };

  const dropdown = {
    props: inject("dropdownProps") || {},
    isDown: inject("dropdownIsDown") || false,
    getTitleInnerHTML: inject("dropdownGetTitleInnerHTML") || "",
    classList: inject("dropdownClassList") || [],
    optionStatus: inject("dropdownOptionStatus") || {},
  };

  return { app, dropdown };
}
