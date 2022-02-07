import provider from '../../mixins/provider.js';

//
var DEFAULT_ITEM_INDEX = 0;
var script = {
  name: 'OmiTabBar',
  mixins: [provider('omiTabBar')],
  props: {
    value: {
      type: [String, Number],
      default: DEFAULT_ITEM_INDEX
    },
    iconSize: {
      type: Number,
      default: null
    },
    activeColor: {
      type: String,
      default: null
    },
    zIndex: {
      type: Number,
      default: null
    }
  },
  methods: {
    getCildIndex: function getCildIndex(child) {
      return this.children.indexOf(child);
    },
    setActive: function setActive(activeIndex) {
      this.$emit('input', activeIndex);
      this.$emit('change', activeIndex);
    },
    isActiveItem: function isActiveItem(childIndex) {
      return childIndex === this.value;
    }
  },
  computed: {
    styles: function styles() {
      return {
        zIndex: this.zIndex
      };
    }
  }
};

export { script as default };
