import CheckBox from './src/index.js';
export { default } from './src/index.js';

CheckBox.install = function (Vue) {
  Vue.component(CheckBox.name, CheckBox);
};
