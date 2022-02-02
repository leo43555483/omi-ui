import FormItem from './src/index.vue.js';
export { default } from './src/index.vue.js';

FormItem.install = function (Vue) {
  Vue.component(FormItem.name, FormItem);
};
