import { DEMO_SETTING as SETTING, merge_v_options } from "../../models.js";
const DEMO_SETTING = JSON.parse(JSON.stringify(SETTING));

export default {
  props: {
    app: {
      type: Object,
      default: () => {
        return DEMO_SETTING.props;
      },
    },
    slots: {
      type: Object,
      default: () => {
        return DEMO_SETTING.slots;
      },
    },
    dropdown: {
      type: Object,
      default: () => {
        return DEMO_SETTING.dropdown;
      },
    },
    option: {
      type: Object,
      default: () => {
        return DEMO_SETTING.option;
      },
    },
  },
  data() {
    return {
      appProps: DEMO_SETTING.props,
      appSlots: DEMO_SETTING.slots,
      appEvent: DEMO_SETTING.event,
      appDropdown: DEMO_SETTING.dropdown,
      appOption: DEMO_SETTING.option,
    };
  },
  watch: {
    app: {
      handler(value) {
        this.appProps = { ...this.appProps, ...value };
      },
      deep: true,
      immediate: true,
    },
    slots: {
      handler(value) {
        this.appSlots = { ...this.appSlots, ...value };
      },
      deep: true,
      immediate: true,
    },
    dropdown: {
      handler(value) {
        this.appDropdown = { ...this.appDropdown, ...value };
      },
      deep: true,
      immediate: true,
    },
    option: {
      handler(value) {
        this.appOption = merge_v_options(value);
      },
      deep: true,
      immediate: true,
    },
  },
};
