'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var check = require('../../mixins/check.js');

var CheckBox = function CheckBox() {
  return {
    name: 'OmiCheckbox',
    mixins: [check["default"]({
      type: 'checkbox',
      classPrefix: 'omi-checkbox',
      checkParent: 'omiCheckGroup',
      unbindParent: 'indeterminate'
    })],
    props: {
      indeterminate: {
        type: Boolean,
        default: false
      }
    }
  };
};

var CheckBox$1 = CheckBox();

exports["default"] = CheckBox$1;
