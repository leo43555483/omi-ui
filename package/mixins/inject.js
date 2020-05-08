const inject = (parentKey) => ({
  inject: {
    [parentKey]: {
      default: null,
    },
  },
  computed: {
    parent() {
      return this[parentKey];
    },
  },
  mounted() {
    if (this.parent) this.parent.addChild(this);
  },
  beforeDestroy() {
    if (this.parent) this.parent.removeChild(this);
  },
});
export default inject;
