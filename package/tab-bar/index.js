import Tabbar from './src/index.vue';

Tabbar.install = function (Vue) {
  Vue.component(Tabbar.name, Tabbar);
};
export default Tabbar;
