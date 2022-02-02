'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var inject = require('../../mixins/inject.js');
var RouteButton = require('../../utils/RouteButton.js');
require('../../icon/index.js');
require('../../badge/index.js');
var shared = require('../../utils/shared.js');
var index = require('../../icon/src/index.vue.js');
var index$1 = require('../../badge/src/index.vue.js');

//
var script = {
  name: 'OmiTabBarItem',
  mixins: [inject["default"]('omiTabBar')],
  inheritAttrs: false,
  components: {
    RouteButton: RouteButton["default"],
    Icon: index["default"],
    Badge: index$1["default"]
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
      if (!shared.unDef(this.name)) return this.name;
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

exports["default"] = script;
