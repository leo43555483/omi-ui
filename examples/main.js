import Vue from 'vue';
import App from './App.vue';
import router from './router';
import omi from '../src';


Vue.config.productionTip = false;
Vue.config.debug = true;
Vue.use(omi);
new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
