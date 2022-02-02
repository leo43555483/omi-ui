'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var index = require('./src/index.js');

index["default"].install = function (Vue) {
  Vue.prototype.$imagePreview = index["default"];
  Vue.component(index["default"].Component.name, index["default"].Component);
};

exports["default"] = index["default"];
