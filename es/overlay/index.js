import OverLay from './src/index.js';
export { default } from './src/index.js';

OverLay.install = function (Vue) {
  Vue.component(OverLay.name, OverLay);
};
