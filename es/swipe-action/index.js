import SwipeAction from './src/index.vue.js';
export { default } from './src/index.vue.js';

SwipeAction.install = function (Vue) {
  Vue.component(SwipeAction.name, SwipeAction);
};
