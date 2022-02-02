import NavBar from './src/index.vue.js';
export { default } from './src/index.vue.js';

NavBar.install = function (Vue) {
  Vue.component(NavBar.name, NavBar);
};
