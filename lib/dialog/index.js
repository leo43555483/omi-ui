'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var index = require('./src/index.js');

index["default"].install = function (Vue) {
  Vue.prototype.$dialog = index["default"];
  Vue.component(index["default"].Component.name, index["default"]);
};

exports["default"] = index["default"];
