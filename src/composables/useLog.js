import { provide } from "vue";

export default function useLog(props) {
  const types = {
    info: "background: #17a2b8; color: #fff",
    warning: "background: #ffc107; color: #212529",
    success: "background: #28a745; color: #fff",
    error: "background: #dc3545; color: #fff",
    light: "background: #f8f9fa; color: #212529",
  };

  // ============== METHODS ==============

  const title = "[v-tags-multiselect]";

  const log = (context = "", type = "info", method = "") => {
    if (props.debugLog == false) {
      return;
    }

    console.log(
      `${reassembleTitle(method)}: ` + `%c ${type} ` + `%c ${context}`,
      types[type],
      ""
    );
  };

  const log2 = (content, parameter) => {
    const getBlankString = (number) => {
      if (0 >= number) {
        return "  ";
      }
      return new Array(number).fill(" ").join("");
    };

    const spaces = getBlankString(title.length - content.length);

    console.log(`${spaces}${content}:`, parameter);
  };

  const reassembleTitle = (method = "") => {
    if (method != "") {
      return `${title} ${method}`;
    }
    return title;
  };

  // ============== PROVIDE ==============

  provide("log", log);
  provide("log2", log2);

  return {
    log,
    log2,
  };
}
