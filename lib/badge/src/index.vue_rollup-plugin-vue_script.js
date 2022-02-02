'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

//
//
//
//
//
//
//
//
// default max
var DEFAULT_MAX = 99;
var script = {
  name: 'OmiBadge',
  props: {
    text: {
      type: [String, Number],
      default: ''
    },
    dot: {
      type: Boolean,
      default: false
    },
    maxNumber: {
      type: Number,
      default: DEFAULT_MAX
    }
  },
  methods: {
    overFlow: function overFlow(value) {
      if (/^\d*$/.test(value) && value * 1 >= this.maxNumber) {
        return '99+';
      }

      return value;
    }
  }
};

exports["default"] = script;
