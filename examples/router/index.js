import Vue from 'vue';
import VueRouter from 'vue-router';
import Form from '../components/Form.vue';

function createView(id) {
  return (c) => import('../views/createView.js').then((r) => r.default(id, c));
}
Vue.use(VueRouter);
export default new VueRouter({
  mode: 'history',
  routes: [
    {
      name: 'home',
      path: '/',
      component: () => import(/* webpackChunkName:"Home" */ '../components/Home.vue'),
    },
    {
      name: 'form',
      path: '/form',
      component: () => createView('Form')(Form),
    },
  ],
});
