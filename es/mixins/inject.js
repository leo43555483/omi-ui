var inject = function inject(parentKey, unbindParent) {
  var _inject;

  return {
    inject: (_inject = {}, _inject[parentKey] = {
      default: null
    }, _inject),
    computed: {
      parent: function parent() {
        if (unbindParent && this[unbindParent]) return null;
        return this[parentKey];
      }
    },
    mounted: function mounted() {
      if (this.parent) this.parent.addChild(this);
    },
    beforeDestroy: function beforeDestroy() {
      if (this.parent) this.parent.removeChild(this);
    }
  };
};

export { inject as default };
