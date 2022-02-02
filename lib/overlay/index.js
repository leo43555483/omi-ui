'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var index = require('./src/index.js');

index["default"].install = function (Vue) {
  Vue.component(index["default"].name, index["default"]);
};

exports["default"] = index["default"];
