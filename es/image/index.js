import Image from './src/index.js';
export { default } from './src/index.js';

Image.install = function (Vue) {
  Vue.component(Image.name, Image);
};
