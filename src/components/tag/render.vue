<script>
import { h } from "vue";

export default {
  name: "tag-render",
  props: ["elm", "elmClass"],
  render() {
    const shell = {
      class: this.elmClass,
    };
    return h("div", shell, this.elm);
  },
};
</script>
