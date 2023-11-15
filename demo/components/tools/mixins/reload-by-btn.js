// <v-tags-multiselect
//   v-if="reloadByBtn"
// >
// @click="reloadByBtnFun()"
export default {
  data() {
    return {
      reloadByBtn: true,
    };
  },
  methods: {
    reloadByBtnFun() {
      this.reloadByBtn = false;
      this.$nextTick(() => {
        setTimeout(() => {
          this.reloadByBtn = true;
          if (this.autoFocus == true) {
            this.focusinApp();
          }
        }, 50);
      });
    },
  },
};
