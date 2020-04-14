import Loading from './src/index.vue';

Loading.install = function (Vue) {
  Vue.component(Loading.name, Loading);
};
export default Loading;
