import { inject } from "vue";

export default function useDelete(props) {
  // ============== INJECT ================

  const appDeleteTags = inject("appDeleteTags");

  const appReFocus = inject("appReFocus");

  const log = inject("log");

  // ============== METHODS ==============

  const deleteTag = (where = "", reason = "") => {
    log(
      `tag value deleteTag`,
      `method available${where != "" ? ", called by " + where : ""}
      ${reason != "" ? ", " + reason : ""}`
    );
    appDeleteTags([props.tag.index]);
    appReFocus();
  };

  return {
    deleteTag,
  };
}
