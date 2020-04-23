import ActionSheet from './src/index.js';

ActionSheet.install = function (Vue) {
  Vue.component(ActionSheet.name, ActionSheet);
};
export default ActionSheet;
