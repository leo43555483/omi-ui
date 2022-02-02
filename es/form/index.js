import Form from './src/index.vue.js';
export { default } from './src/index.vue.js';

Form.install = function (Vue) {
  Vue.component(Form.name, Form);
};
