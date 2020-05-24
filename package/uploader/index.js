import Uploader from './src';

Uploader.install = function (Vue) {
  Vue.component(Uploader.name, Uploader);
};
export default Uploader;
