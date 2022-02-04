import VueImagePreview from './ImagePreview.js';
import createInstance from '../../utils/createInstance.js';
import { isServer, noop, isObject } from '../../utils/shared.js';

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
var DEFAULT_OPTION = {
  images: [],
  value: false,
  onClose: function onClose() {}
};
var creator = createInstance({
  VueComponent: VueImagePreview,
  defaultOption: DEFAULT_OPTION,
  banMultiple: true
});
var ImagePreview = creator(function (getInstance, defaultOptions) {
  return function (opt) {
    if (isServer) return noop;

    if (opt && !isObject(opt)) {
      throw new Error('[omi ui]: Expected Object with option');
    }

    var imagePreview = getInstance();

    var option = _extends({}, defaultOptions, opt);

    Object.assign(imagePreview, option);
    imagePreview.value = true;
    return imagePreview;
  };
});
ImagePreview.Component = VueImagePreview; // ImagePreview.name = VueImagePreview;

var ImagePreview$1 = ImagePreview;

export { ImagePreview$1 as default };
