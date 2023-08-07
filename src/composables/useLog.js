import { provide } from "vue";

export default function useLog(props) {
  const types = {
    info: "background: #17a2b8; color: #fff",
    warning: "background: #ffc107; color: #212529",
    success: "background: #28a745; color: #fff",
    error: "background: #dc3545; color: #fff",
  };

  // ============== METHODS ==============

  const log = (context = "", type = "info") => {
    if (props.debugLog == true) {
      console.log(
        `[v-tags-multiselect]: ` + `%c ${type} ` + `%c ${context}`,
        types[type],
        ""
      );
    }
  };

  // ============== PROVIDE ==============

  provide("log", log);

  return {
    log,
  };
}
