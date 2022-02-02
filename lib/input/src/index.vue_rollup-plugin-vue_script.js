'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var shared = require('../../utils/shared.js');
var field = require('../../mixins/field.js');
var input = require('../../mixins/input.js');

//
var INPUT_TYPE = ['text', 'password', 'url', 'email', 'date', 'number', 'tel', 'search'];
var script = {
  name: 'OmiInput',
  mixins: [field["default"], input["default"]],
  inheritAttrs: false,
  data: function data() {
    return {
      isComposing: false
    };
  },
  methods: {
    focus: function focus() {
      this.$refs.input.focus();
    }
  },
  watch: {
    value: function value() {
      this.validateTriggerOn('change');
    }
  },
  props: {
    type: {
      validator: function validator(value) {
        return shared.oneOf(value, INPUT_TYPE);
      },
      default: 'text'
    },
    value: {
      type: [String, Number],
      default: ''
    }
  }
};

exports["default"] = script;
