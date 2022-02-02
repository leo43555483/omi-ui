var groupMxin = {
  props: {
    disable: {
      type: Boolean,
      default: false
    },
    horizontal: {
      type: Boolean,
      default: false
    },
    value: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    activeColor: {
      type: String,
      default: null
    }
  }
};

export { groupMxin as default };
