import ActionSheet from './src/index.js';
export { default } from './src/index.js';

ActionSheet.install = function (Vue) {
  Vue.component(ActionSheet.name, ActionSheet);
};
