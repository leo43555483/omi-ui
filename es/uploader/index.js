import Uploader from './src/index.js';
export { default } from './src/index.js';

Uploader.install = function (Vue) {
  Vue.component(Uploader.name, Uploader);
};
