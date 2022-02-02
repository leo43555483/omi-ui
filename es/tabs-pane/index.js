import TabsPanel from './src/index.vue.js';
export { default } from './src/index.vue.js';

TabsPanel.install = function (Vue) {
  Vue.component(TabsPanel.name, TabsPanel);
};
