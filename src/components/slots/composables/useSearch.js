import { computed } from "vue";

export default function useSearch(props, _context, dep) {
  // ============== INJECT ================

  const app = dep.app;

  const dropdown = dep.dropdown;

  // ============== DATA ================

  const value = props.title ? dropdown.props.value : props.value;

  const innerHTML = dep.innerHTML;

  // ============== COMPUTED ==============

  const strippedInnerHTML = computed(() => {
    return String(innerHTML.value).replace(/<\/?[^>]+(>|$)/g, "");
  });

  const isCanSearch = computed(() => {
    return (
      app.props.search == true &&
      (app.elInputValue.value != "" || props.system == false)
    );
  });

  const isSearchable = computed(() => {
    if (isCanSearch.value == false) {
      return false;
    }

    const regex = new RegExp(app.elInputValue.value, "i");
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
