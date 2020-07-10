const inject = (parentKey, unbindParent) => ({
  inject: {
    [parentKey]: {
      default: null,
    },
  },
  computed: {
    parent() {
      if (unbindParent && this[unbindParent]) return null;
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
