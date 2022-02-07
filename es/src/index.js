import '../form/index.js';
import '../nav-bar/index.js';
import '../form-item/index.js';
import '../input/index.js';
import '../cell/index.js';
import '../cell-group/index.js';
import '../button/index.js';
import '../loading/index.js';
import '../checkbox/index.js';
import '../checkbox-group/index.js';
import '../radio/index.js';
import '../radio-group/index.js';
import '../icon/index.js';
import '../circle/index.js';
import '../switch/index.js';
import '../toast/index.js';
import '../collapse/index.js';
import '../collapse-item/index.js';
import '../action-sheet/index.js';
import '../dialog/index.js';
import '../load-more/index.js';
import '../pull-refresh/index.js';
import '../tabs/index.js';
import '../tabs-pane/index.js';
import '../badge/index.js';
import '../picker/index.js';
import '../address-picker/index.js';
import '../date-picker/index.js';
import '../search/index.js';
import '../rate/index.js';
import '../image-preview/index.js';
import '../image/index.js';
import '../tab-bar/index.js';
import '../tab-bar-item/index.js';
import '../skeleton/index.js';
import '../uploader/index.js';
import '../index-box/index.js';
import '../index-anchor/index.js';
import '../swipe-action/index.js';
import CellGrounp from '../cell-group/src/index.vue.js';
import CheckBox from '../checkbox/src/index.js';
import CheckboxGroup from '../checkbox-group/src/index.vue.js';
import Radio from '../radio/src/index.js';
import RadioGroup from '../radio-group/src/index.vue.js';
import Circle from '../circle/src/index.vue.js';
import Switch from '../switch/src/index.vue.js';
import Collapse from '../collapse/src/index.vue.js';
import CollapseItem from '../collapse-item/src/index.vue.js';
import ActionSheet from '../action-sheet/src/index.js';
import Dialog from '../dialog/src/index.js';
import LoadMore from '../load-more/src/index.vue.js';
import PullFresh from '../pull-refresh/src/index.js';
import Tabs from '../tabs/src/index.vue.js';
import TabsPanel from '../tabs-pane/src/index.vue.js';
import AddressPicker from '../address-picker/src/index.js';
import DatePicker from '../date-picker/src/index.js';
import Search from '../search/src/index.vue.js';
import Rate from '../rate/src/index.vue.js';
import ImagePreview from '../image-preview/src/index.js';
import Tabbar from '../tab-bar/src/index.vue.js';
import Tabbar$1 from '../tab-bar-item/src/index.vue.js';
import Skeleton from '../skeleton/src/index.vue.js';
import Uploader from '../uploader/src/index.js';
import NavBar from '../nav-bar/src/index.vue.js';
import IndexBox from '../index-box/src/index.vue.js';
import IndexAnchor from '../index-anchor/src/index.vue.js';
import SwipeAction from '../swipe-action/src/index.vue.js';
import Toast from '../toast/src/index.js';
import Form from '../form/src/index.vue.js';
import FormItem from '../form-item/src/index.vue.js';
import Input from '../input/src/index.vue.js';
import Cell from '../cell/src/index.vue.js';
import Button from '../button/src/index.vue.js';
import Loading from '../loading/src/index.vue.js';
import Icon from '../icon/src/index.vue.js';
import Badge from '../badge/src/index.vue.js';
import Picker from '../picker/src/index.js';
import Image from '../image/src/index.js';

var components = {
  Form: Form,
  FormItem: FormItem,
  Input: Input,
  Cell: Cell,
  CellGroup: CellGrounp,
  Button: Button,
  Loading: Loading,
  Checkbox: CheckBox,
  CheckboxGroup: CheckboxGroup,
  Redio: Radio,
  RadioGroup: RadioGroup,
  Icon: Icon,
  Circle: Circle,
  Switch: Switch,
  Collapse: Collapse,
  CollapseItem: CollapseItem,
  ActionSheet: ActionSheet,
  Dialog: Dialog.Component,
  LoadMore: LoadMore,
  PullRefresh: PullFresh,
  Tabs: Tabs,
  TabsPane: TabsPanel,
  Badge: Badge,
  Picker: Picker,
  AddressPicker: AddressPicker,
  DatePicker: DatePicker,
  Search: Search,
  Rate: Rate,
  ImagePreview: ImagePreview.Component,
  Image: Image,
  TabBar: Tabbar,
  TabBarItem: Tabbar$1,
  Skeleton: Skeleton,
  Uploader: Uploader,
  NavBar: NavBar,
  IndexBox: IndexBox,
  IndexAnchor: IndexAnchor,
  SwipeAction: SwipeAction
};

var install = function install(Vue) {
  if (install.installed) return;
  Object.keys(components).forEach(function (key) {
    Vue.component(components[key].name, components[key]);
  });

  if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
  }

  Vue.prototype.$toast = Toast;
  Vue.prototype.$dialog = Dialog;
  Vue.prototype.$imagePreview = ImagePreview;
};

var index = {
  version: "" + process.env.PACKAGE_VERSION,
  install: install,
  components: components
};

export { index as default };
