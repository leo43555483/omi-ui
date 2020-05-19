import ImagePreview from './src';

ImagePreview.install = function (Vue) {
  Vue.component(ImagePreview.Component.name, ImagePreview.Component);
};
export default ImagePreview;
