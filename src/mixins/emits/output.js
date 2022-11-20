export default {
  methods: {
    output() {
      this.$emit(
        "update",
        this.tags.reduce((groups, tag) => {
          groups[tag.key] = [...(groups[tag.key] || []), tag.value];
          return groups;
        }, {})
      );
    },
  },
};
