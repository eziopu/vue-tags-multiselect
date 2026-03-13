import { computed, inject } from "vue";

import {
  appPropsKey,
  appElInputValueKey,
  dropdownPropsKey,
} from "../../../injectionKeys";

import { defaultDropdownProps } from "../models";
import type { UseSearchDeps } from "./types";

export default function useSearch(props: Record<string, unknown>, dep: UseSearchDeps) {
  // ============== INJECT ================

  const appProps = inject(appPropsKey)!;
  const appElInputValue = inject(appElInputValueKey)!;

  const dropdownProps = inject(dropdownPropsKey) || defaultDropdownProps;

  // ============== DATA ================

  const value = props.title ? dropdownProps.value : props.value;

  const innerHTML = dep.innerHTML;

  // ============== COMPUTED ==============

  const strippedInnerHTML = computed(() => {
    return String(innerHTML.value).replace(/<\/?[^>]+(>|$)/g, "");
  });

  const isCanSearch = computed(() => {
    return (
      appProps.search == true &&
      (appElInputValue.value != "" || props.system == false)
    );
  });

  const isSearchable = computed(() => {
    if (isCanSearch.value == false) {
      return false;
    }

    const regex = new RegExp(appElInputValue.value, "i");
    const searchValue = String(value).search(regex);
    const searchInnerHTML =
      strippedInnerHTML.value == "null"
        ? -1
        : String(strippedInnerHTML.value).search(regex);

    if (searchValue != -1 || searchInnerHTML != -1) {
      return true;
    }

    return false;
  });

  return {
    isCanSearch,
    isSearchable,
  };
}
