import { inject } from "vue";

import type { TagValueComponentProp } from "../../../../types";
import {
  appDeleteTagsKey,
  appReFocusKey,
  logKey,
} from "../../../../injectionKeys";

export default function useDelete(props: Record<string, unknown>) {
  const tag = props.tag as TagValueComponentProp;
  // ============== INJECT ================

  const appDeleteTags = inject(appDeleteTagsKey)!;

  const appReFocus = inject(appReFocusKey)!;

  const log = inject(logKey)!;

  // ============== METHODS ==============

  const deleteTag = (where = "", reason = "") => {
    log(
      `tag value deleteTag`,
      `method available${where != "" ? ", called by " + where : ""}
      ${reason != "" ? ", " + reason : ""}`
    );
    appDeleteTags([tag.index]);
    appReFocus();
  };

  return {
    deleteTag,
  };
}
