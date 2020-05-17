import Search from './src/index.vue';

Search.install = function (Vue) {
  Vue.component(Search.name, Search);
};
export default Search;
