import Vue from 'vue';
import VueImagePreview from './ImagePreview';
import createInstance from '../../../src/utils/createInstance';
import { isObject } from '../../../src/utils/shared';

const isServer = () => Vue.prototype.$isServer;

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
  if (isServer()) return {};
  if (!isObject(opt)) {
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
export default ImagePreview;
