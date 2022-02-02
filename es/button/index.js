import Button from './src/index.vue.js';
export { default } from './src/index.vue.js';

Button.install = function (Vue) {
  Vue.component(Button.name, Button);
};
