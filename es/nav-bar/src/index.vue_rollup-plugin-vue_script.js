import '../../icon/index.js';
import Icon from '../../icon/src/index.vue.js';

var _components;
var script = {
  name: 'OmiNavBar',
  props: {
    showLeftArrow: {
      type: Boolean,
      default: true
    },
    title: {
      type: String
    },
    right: {
      type: String
    },
    left: {
      type: String
    }
  },
  components: (_components = {}, _components[Icon.name] = Icon, _components),
  methods: {
    onClick: function onClick(e, type) {
      this.$emit(type, e);
    }
  }
};

export { script as default };
