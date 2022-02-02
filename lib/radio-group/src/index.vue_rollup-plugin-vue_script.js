'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var checkGroup = require('../../mixins/check-group.js');
var provider = require('../../mixins/provider.js');

//
var script = {
  name: 'OmiRadioGroup',
  mixins: [checkGroup["default"], provider["default"]('omiRadioGroup')],
  // provide() {
  //   return {
  //     omiRadioGroup: this,
  //   };
  // },
  props: {
    value: {
      type: [String, Number, Boolean],
      default: null
    }
  },
  watch: {
    value: function value(_value) {
      this.$emit('change', _value);
    }
  },
  methods: {
    isChecked: function isChecked(value) {
      return value === this.value;
    },
    toggle: function toggle(checked, prop) {
      if (checked === false || prop === this.vlue) return;
      this.$emit('input', prop);
    }
  }
};

exports["default"] = script;
