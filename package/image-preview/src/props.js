import { noop } from '../../../src/utils/shared';

const DEFAULT_INITIAL_INDEX = 0;

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
};

export default props;
