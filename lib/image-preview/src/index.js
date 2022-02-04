'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var ImagePreview$2 = require('./ImagePreview.js');
var createInstance = require('../../utils/createInstance.js');
var shared = require('../../utils/shared.js');

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
var DEFAULT_OPTION = {
  images: [],
  value: false,
  onClose: function onClose() {}
};
var creator = createInstance["default"]({
  VueComponent: ImagePreview$2["default"],
  defaultOption: DEFAULT_OPTION,
  banMultiple: true
});
var ImagePreview = creator(function (getInstance, defaultOptions) {
  return function (opt) {
    if (shared.isServer) return shared.noop;

    if (opt && !shared.isObject(opt)) {
      throw new Error('[omi ui]: Expected Object with option');
    }

    var imagePreview = getInstance();

    var option = _extends({}, defaultOptions, opt);

    Object.assign(imagePreview, option);
    imagePreview.value = true;
    return imagePreview;
  };
});
ImagePreview.Component = ImagePreview$2["default"]; // ImagePreview.name = VueImagePreview;

var ImagePreview$1 = ImagePreview;

exports["default"] = ImagePreview$1;
