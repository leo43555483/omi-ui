import { noop } from '../../utils/shared.js';

var DEFAULT_INITIAL_INDEX = 0;
var OVERLAY_CLASSNAME = 'omi-image-preview__overlay';
var DEFAULT_PLACEHOLER_HEIGHT = '150px';
var props = {
  images: {
    type: Array,
    default: function _default() {
      return [];
    }
  },
  value: {
    type: Boolean,
    default: false
  },
  onClose: {
    type: Function,
    default: noop
  },
  initialIndex: {
    type: Number,
    default: DEFAULT_INITIAL_INDEX
  },
  overlayClassName: {
    type: String,
    default: OVERLAY_CLASSNAME
  },
  showClose: {
    type: Boolean,
    default: false
  },
  placeholderHeight: {
    type: [String, Number],
    default: DEFAULT_PLACEHOLER_HEIGHT
  }
};
var props$1 = props;

export { props$1 as default };
