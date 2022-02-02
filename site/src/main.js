// import 'omi/es/style'
import Vue from 'vue'
import LazyLoad from 'vue-lazyload'
import App from './App.vue'
import router from './router'
import { Toast, Dialog } from 'omi'

Vue.use(Toast)
  .use(Dialog)

Vue.config.productionTip = false
Vue.config.debug = true
Vue.use(LazyLoad)
const app = new Vue({
  el: '#app',
  router,
  render: (h) => h(App)
})
export default app
