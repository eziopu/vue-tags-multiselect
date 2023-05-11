// <v-tags-multiselect
//   v-if="reloadByI18n"
// >
export default {
  data() {
    return {
      reloadByI18n: true,
    };
  },
  watch: {
    "$i18n.locale": {
      handler() {
        this.reloadByI18n = false;
        this.$nextTick(() => {
          setTimeout(() => {
            this.reloadByI18n = true;
            if (this.autoFocus == true) {
              this.autoFocusinApp();
            }
          }, 10);
        });
      },
      deep: true,
    },
  },
};
