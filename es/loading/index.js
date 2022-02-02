import Loading from './src/index.vue.js';
export { default } from './src/index.vue.js';

Loading.install = function (Vue) {
  Vue.component(Loading.name, Loading);
};
