import Picker from './src/index.js';
export { default } from './src/index.js';

Picker.install = function (Vue) {
  Vue.component(Picker.name, Picker);
};
