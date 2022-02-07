import inject from '../../mixins/inject.js';
import RouteButton from '../../utils/RouteButton.js';
import '../../icon/index.js';
import '../../badge/index.js';
import { unDef } from '../../utils/shared.js';
import Badge from '../../badge/src/index.vue.js';
import Icon from '../../icon/src/index.vue.js';

//
var script = {
  name: 'OmiTabBarItem',
  mixins: [inject('omiTabBar')],
  inheritAttrs: false,
  components: {
    RouteButton: RouteButton,
    Icon: Icon,
    Badge: Badge
  },
  methods: {
    onClick: function onClick() {
      this.parent.setActive(this.activeKey);
    },
    getParentProps: function getParentProps(property) {
      return this.parent && this.parent[property];
    }
  },
  props: {
    name: {
      type: String,
      default: null
    },
    dot: {
      type: Boolean,
      default: false
    },
    dotMaxNumber: {
      type: Number,
      default: null
    },
    dotText: {
      type: String,
      default: ''
    },
    iconType: {
      type: String,
      default: ''
    },
    iconSize: {
      type: Number,
      default: null
    },
    activeColor: {
      type: String,
      default: null
    }
  },
  computed: {
    itemStyles: function itemStyles() {
      return {
        color: this.getActiveColor
      };
    },
    getActiveColor: function getActiveColor() {
      return this.activeColor || this.getParentProps('activeColor');
    },
    getIconSize: function getIconSize() {
      return this.iconSize || this.getParentProps('iconSize');
    },
    activeKey: function activeKey() {
      if (!unDef(this.name)) return this.name;
      return this.parent.getCildIndex(this);
    },
    activeItemClass: function activeItemClass() {
      if (this.parent && this.parent.isActiveItem(this.activeKey)) {
        return ['omi-tabbar-item__active'];
      }

      return [];
    }
  }
};

export { script as default };
