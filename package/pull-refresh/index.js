import PullFresh from './src';

PullFresh.install = function (Vue) {
  Vue.component(PullFresh.name, PullFresh);
};
export default PullFresh;
