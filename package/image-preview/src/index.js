import VueImagePreview from './ImagePreview';
import createInstance from '../../utils/createInstance';
import { isObject, isServer, noop } from '../../utils/shared';

const DEFAULT_OPTION = {
  images: [],
  value: false,
  onClose: () => { },
};
const creator = createInstance({
  VueComponent: VueImagePreview,
  defaultOption: DEFAULT_OPTION,
  banMultiple: true,
});
const ImagePreview = creator((getInstance, defaultOptions) => (opt) => {
  if (isServer) return noop;
  if (opt && !isObject(opt)) {
    throw new Error('[omi ui]: Expected Object with option');
  }
  const imagePreview = getInstance();
  const option = {
    ...defaultOptions,
    ...opt,
  };
  Object.assign(imagePreview, option);

  imagePreview.value = true;
  return imagePreview;
});

ImagePreview.Component = VueImagePreview;
// ImagePreview.name = VueImagePreview;
export default ImagePreview;
