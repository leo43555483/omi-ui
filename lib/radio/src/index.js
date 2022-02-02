'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var check = require('../../mixins/check.js');

var Radio = function Radio() {
  return {
    name: 'OmiRadio',
    mixins: [check["default"]({
      type: 'radio',
      classPrefix: 'omi-radio',
      checkParent: 'omiRadioGroup',
      unbindParent: 'indeterminate'
    })]
  };
};

var Radio$1 = Radio();

exports["default"] = Radio$1;
