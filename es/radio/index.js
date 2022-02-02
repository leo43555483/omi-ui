import Radio from './src/index.js';
export { default } from './src/index.js';

Radio.install = function (Vue) {
  Vue.component(Radio.name, Radio);
};
