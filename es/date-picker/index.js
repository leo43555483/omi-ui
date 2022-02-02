import DatePicker from './src/index.js';
export { default } from './src/index.js';

DatePicker.install = function (Vue) {
  Vue.component(DatePicker.name, DatePicker);
};
