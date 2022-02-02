'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('../../icon/index.js');
var index = require('../../icon/src/index.vue.js');

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
  components: (_components = {}, _components[index["default"].name] = index["default"], _components),
  methods: {
    onClick: function onClick(e, type) {
      this.$emit(type, e);
    }
  }
};

exports["default"] = script;
