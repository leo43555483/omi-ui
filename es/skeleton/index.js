import Skeleton from './src/index.vue.js';
export { default } from './src/index.vue.js';

Skeleton.install = function (Vue) {
  Vue.component(Skeleton.name, Skeleton);
};
