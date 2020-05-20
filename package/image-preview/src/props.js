import { noop } from '../../../src/utils/shared';

const DEFAULT_INITIAL_INDEX = 0;
const OVERLAY_CLASSNAME = 'omi-image-preview__overlay';
const props = {
  images: {
    type: Array,
    default: () => [],
  },
  value: {
    type: Boolean,
    default: false,
  },
  onClose: {
    type: Function,
    default: noop,
  },
  initialIndex: {
    type: Number,
    default: DEFAULT_INITIAL_INDEX,
  },
  overlayClassName: {
    type: String,
    default: OVERLAY_CLASSNAME,
  },
  showClose: {
    type: Boolean,
    default: false,
  },
};

export default props;
