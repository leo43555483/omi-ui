import Vue from 'vue';
import VueRouter from 'vue-router';
import Form from '../components/Form.vue';
import Cell from '../components/Cell.vue';
import Button from '../components/Button.vue';
import Loading from '../components/Loading.vue';
import CheckBox from '../components/CheckBox.vue';
import Radio from '../components/Radio.vue';
import Circle from '../components/Circle.vue';
import Switch from '../components/Switch.vue';
import Toast from '../components/Toast.vue';
import Collapse from '../components/Collapse.vue';
import ActionSheet from '../components/ActionSheet.vue';
import Dialog from '../components/Dialog.vue';
import LoadMore from '../components/LoadMore.vue';
import PullRefresh from '../components/PullRefresh.vue';
import Tabs from '../components/Tabs.vue';
import Picker from '../components/Picker.vue';
import AddressPicker from '../components/AddressPicker.vue';
import DatePicker from '../components/DatePicker.vue';
import Search from '../components/Search.vue';
import Rate from '../components/Rate.vue';
import ImagePreview from '../components/ImagePreview.vue';

function createView(id) {
  return (c) => import(/* webpackChunkName: "chunk " */ '../views/createView.js').then((r) => r.default(id, c));
}
Vue.use(VueRouter);
const routers = {
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
    {
      name: 'cell',
      path: '/cell',
      component: () => createView('Cell')(Cell),
    },
    {
      name: 'button',
      path: '/button',
      component: () => createView('Button')(Button),
    },
    {
      name: 'loading',
      path: '/loading',
      component: () => createView('Loading')(Loading),
    },
    {
      name: 'checkbox',
      path: '/checkbox',
      component: () => createView('CheckBox')(CheckBox),
    },
    {
      name: 'radio',
      path: '/radio',
      component: () => createView('Radio')(Radio),
    },
    {
      name: 'cirlce',
      path: '/cirlce',
      component: () => createView('Circles')(Circle),
    },
    {
      name: 'switch',
      path: '/switch',
      component: () => createView('Switches')(Switch),
    },
    {
      name: 'toast',
      path: '/toast',
      component: () => createView('Toast')(Toast),
    },
    {
      name: 'collapse',
      path: '/collapse',
      component: () => createView('Collapse')(Collapse),
    },
    {
      name: 'action-sheet',
      path: '/action-sheet',
      component: () => createView('ActionSheet')(ActionSheet),
    },
    {
      name: 'dialog',
      path: '/dialog',
      component: () => createView('Dialog')(Dialog),
    },
    {
      name: 'loadMore',
      path: '/loadMore',
      component: () => createView('LoadMore')(LoadMore),
    },
    {
      name: 'pullrefresh',
      path: '/pullrefresh',
      component: () => createView('PullRefresh')(PullRefresh),
    },
    {
      name: 'tabs',
      path: '/tabs',
      component: () => createView('Tabs')(Tabs),
    },
    {
      name: 'picker',
      path: '/picker',
      component: () => createView('Picker')(Picker),
    },
    {
      name: 'addressPicker',
      path: '/addressPicker',
      component: () => createView('AddressPicker')(AddressPicker),
    },
    {
      name: 'datePicker',
      path: '/datePicker',
      component: () => createView('DatePicker')(DatePicker),
    },
    {
      name: 'search',
      path: '/search',
      component: () => createView('Search')(Search),
    },
    {
      name: 'rate',
      path: '/rate',
      component: () => createView('Rate')(Rate),
    },
    {
      name: 'imagepreview',
      path: '/imagepreview',
      component: () => createView('ImagePreview')(ImagePreview),
    },
  ],
};
export default new VueRouter(routers);
