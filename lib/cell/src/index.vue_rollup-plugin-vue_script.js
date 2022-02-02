'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('../../icon/index.js');
var RouteButton = require('../../utils/RouteButton.js');
var shared = require('../../utils/shared.js');
var index = require('../../icon/src/index.vue.js');

//
var to = RouteButton.routeButtonProps.to,
    append = RouteButton.routeButtonProps.append,
    tag = RouteButton.routeButtonProps.tag,
    replace = RouteButton.routeButtonProps.replace,
    event = RouteButton.routeButtonProps.event;
var script = {
  name: 'OmiCell',
  inheritAttrs: false,
  props: {
    to: to,
    replace: replace,
    tag: tag,
    event: event,
    append: append,
    href: {
      type: String,
      default: null
    },
    rightArrow: {
      type: Boolean,
      default: false
    },
    clickable: {
      type: Boolean,
      default: false
    },
    titleClass: {
      type: String,
      default: ''
    },
    contentClass: {
      type: String,
      default: ''
    },
    titleStyle: {
      type: String,
      default: null
    },
    contentStyle: {
      type: String,
      default: null
    },
    title: {
      type: String,
      default: ''
    },
    label: {
      type: String,
      default: ''
    },
    content: {
      type: String,
      default: ''
    },
    titleAlign: {
      type: String,
      default: null
    },
    titleWidth: {
      type: [String, Number],
      default: null
    },
    contentAlign: {
      type: String,
      default: null
    }
  },
  components: {
    Icon: index["default"],
    RouteButton: RouteButton["default"]
  },
  methods: {
    renderSlot: function renderSlot(name) {
      return this.$slots[name];
    }
  },
  computed: {
    renderTitle: function renderTitle() {
      var title = this.title,
          label = this.label;
      var $slots = this.$slots;
      return title || label || $slots.title || $slots.label;
    },
    clickAbleClass: function clickAbleClass() {
      var clickable = this.clickable;
      return clickable ? 'omi-cell__clickable' : null;
    },
    customTitleStyles: function customTitleStyles() {
      if (this.titleStyle) return this.titleStyle;
      var styles = '';

      if (this.titleWidth) {
        var titleWidth = null;

        if (shared.isUnitString(this.titleWidth)) {
          titleWidth = this.titleWidth;
        } else if (/^\d+/.test(this.titleWidth)) {
          titleWidth = shared.getSizeString(this.titleWidth)[0] + "px";
        }

        styles = "flex: none; width: " + titleWidth + ";";
      }

      return styles + "text-align: " + this.titleAlign;
    },
    customContentStyles: function customContentStyles() {
      if (this.contentStyle) return this.contentStyle;
      return "text-align: " + this.contentAlign;
    }
  }
};

exports["default"] = script;
