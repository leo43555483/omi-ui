import ImagePreview from './src';

ImagePreview.install = function (Vue) {
  Vue.prototype.$imagePreview = ImagePreview;
  Vue.component(ImagePreview.Component.name, ImagePreview.Component);
};
export default ImagePreview;
