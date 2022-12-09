export default {
  methods: {
    slotsToText(slots) {
      let result = "";
      slots.forEach((slot) => {
        result += this.slotToText(slot);
      });
      return result;
    },
    slotToText(slot) {
      let result = "";
      const children = slot.children;
      if (children && children.length != 0 && typeof children != "string") {
        slot.children.forEach((slot) => {
          result += this.slotToText(slot);
        });
      }
      return result + (slot.text ? " " + slot.text : "");
    },
  },
};
