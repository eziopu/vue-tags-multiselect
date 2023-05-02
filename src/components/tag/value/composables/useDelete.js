import { inject } from "vue";

export default function useDelete(props) {
  // ============== INJECT ================

  const appDeleteTags = inject("appDeleteTags");

  const appReFocus = inject("appReFocus");

  // ============== METHODS ==============

  const deleteTag = (where) => {
    console.log(" value where", where);
    appDeleteTags([props.tag.index]);
    appReFocus();
  };

  return {
    deleteTag,
  };
}
