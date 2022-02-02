import Icon from './src/index.vue.js';
export { default } from './src/index.vue.js';

Icon.install = function (Vue) {
  Vue.component(Icon.name, Icon);
};
