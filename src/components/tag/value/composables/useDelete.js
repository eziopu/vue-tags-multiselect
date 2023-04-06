import { inject } from "vue";

export default function useDelete(props) {
  // ================ INJECT ================

  const appDeleteTags = inject("appDeleteTags");

  const appReFocus = inject("appReFocus");

  // ============== METHODS ==============

  const deleteTag = () => {
    appDeleteTags([props.tag.index]);
    appReFocus();
  };

  return {
    deleteTag,
  };
}
