import PullFresh from './src/index.js';
export { default } from './src/index.js';

PullFresh.install = function (Vue) {
  Vue.component(PullFresh.name, PullFresh);
};
