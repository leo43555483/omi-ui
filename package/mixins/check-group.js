export default {
  props: {
    disable: {
      type: Boolean,
      default: false,
    },
    horizontal: {
      type: Boolean,
      default: false,
    },
    value: {
      type: Array,
      default: () => [],
    },
    activeColor: {
      type: String,
      default: null,
    },
  },
};
