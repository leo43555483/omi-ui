import ImagePreview from './src/index.js';
export { default } from './src/index.js';

ImagePreview.install = function (Vue) {
  Vue.prototype.$imagePreview = ImagePreview;
  Vue.component(ImagePreview.Component.name, ImagePreview.Component);
};
