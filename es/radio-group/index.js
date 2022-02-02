import RadioGroup from './src/index.vue.js';
export { default } from './src/index.vue.js';

RadioGroup.install = function (Vue) {
  Vue.component(RadioGroup.name, RadioGroup);
};
