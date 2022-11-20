<script>
import { defineComponent, h, isVue2 } from "vue-demi";
export default defineComponent({
  name: "tag-render",
  props: ["elm", "elmClass"],
  render(createElement) {
    const shell = {
      class: this.elmClass,
    };

    if (isVue2) {
      return createElement("div", shell, this.elm);
    }
    // vue3
    return h("div", shell, this.elm);
  },
});
</script>
