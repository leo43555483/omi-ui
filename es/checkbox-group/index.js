import CheckboxGroup from './src/index.vue.js';
export { default } from './src/index.vue.js';

CheckboxGroup.install = function (Vue) {
  Vue.component(CheckboxGroup.name, CheckboxGroup);
};
