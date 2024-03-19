import {
  DEMO_SETTING as SETTING,
  merge_v_dropdowns,
  merge_v_options
} from "../../models.js";

const DEMO_SETTING = JSON.parse(JSON.stringify(SETTING));

export default {
  props: {
    app: {
      type: Object,
      default: () => {
        return {};
      },
    },
    slots: {
      type: Object,
      default: () => {
        return {};
      },
    },
    dropdown: {
      type: Object,
      default: () => {
        return {};
      },
    },
    option: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  data() {
    return {
      appEvent: { ...DEMO_SETTING.event, ...{} },
    };
  },
  computed: {
    appProps() {
      return { ...DEMO_SETTING.props, ...this.app };
    },
    appSlots() {
      return { ...DEMO_SETTING.slots, ...this.slots };
    },
    appDropdown() {
      return merge_v_dropdowns(this.dropdown);
    },
    appOption() {
      return merge_v_options(this.option);
    },
  },
};
