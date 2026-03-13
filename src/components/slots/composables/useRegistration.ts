import { ref, watchEffect, inject, onMounted, onBeforeUnmount } from "vue";
import clearHTML from "../../../utils/clearHTML";

import type { OptionStatusMap } from "../../../types";

import {
  dropdownPropsKey,
  dropdownOptionStatusKey,
  logKey,
  log2Key,
} from "../../../injectionKeys";

import { defaultDropdownProps } from "../models";
import type { UseRegistrationDeps } from "./types";

export default function useRegistration(props: Record<string, unknown>, dep: UseRegistrationDeps) {
  // ============== DATA ================

  const isDuplicateOption = ref(false);

  // ============== METHODS ================

  const getInnerHTML = (): string | null => {
    if (dep.elOption.value == null) {
      return null;
    }
    return clearHTML(dep.elOption.value.innerHTML);
  };

  const dropdownProps = inject(dropdownPropsKey) || defaultDropdownProps;
  const dropdownOptionStatus = inject(dropdownOptionStatusKey) || {} as OptionStatusMap;
  onMounted(() => {
    if (dropdownProps.system == true) {
      return;
    }
    const value = props.title == true ? dropdownProps.value : props.value;
    const registrationName = value + "_" + getInnerHTML();

    if (dropdownOptionStatus[registrationName] != undefined) {
      isDuplicateOption.value = true;
      const log = inject(logKey)!;
      const log2 = inject(log2Key)!;
      log(
        `option onMounted`,
        `Duplicate ${
          props.title ? "title" : ""
        } options! last option will be forced to be hidden.`,
        `error`
      );
      log2(`dropdown key:${dropdownProps.value}`);
      log2(`value:${value}`);
      return;
    }

    dropdownOptionStatus[registrationName] = {
      isTitle: props.title as boolean,
      isHidden: false,
      isSelected: false,
      isBeSearched: false,
    };

    watchEffect(() => {
      dropdownOptionStatus[registrationName].isHidden = dep.isHidden.value;
      dropdownOptionStatus[registrationName].isSelected = dep.isSelected.value;
      dropdownOptionStatus[registrationName].isBeSearched = dep.isSearchable.value;
    });

    onBeforeUnmount(() => {
      delete dropdownOptionStatus[registrationName];
    });
  });

  return { isDuplicateOption };
}
