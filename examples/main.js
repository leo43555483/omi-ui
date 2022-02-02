import '../src/styles/index.scss';
import Vue from 'vue';
// import LazyLoad from 'vue-lazyload';
import App from './App.vue';
import router from './router';
// import Toast from '../package/toast';
import omi from '../src';

Vue.use(omi);
Vue.config.productionTip = false;
Vue.config.debug = true;
// Vue.use(LazyLoad);
new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
