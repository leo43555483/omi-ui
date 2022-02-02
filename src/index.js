import Form from '../package/form';
import NavBar from '../package/nav-bar';
import FormItem from '../package/form-item';
import Input from '../package/input';
import Cell from '../package/cell';
import CellGroup from '../package/cell-group';
import Button from '../package/button';
import Loading from '../package/loading';
import Checkbox from '../package/checkbox';
import CheckboxGroup from '../package/checkbox-group';
import Redio from '../package/radio';
import RadioGroup from '../package/radio-group';
import Icon from '../package/icon';
import Circle from '../package/circle';
import Switch from '../package/switch';
import Toast from '../package/toast';
import Collapse from '../package/collapse';
import CollapseItem from '../package/collapse-item';
import ActionSheet from '../package/action-sheet';
import Dialog from '../package/dialog';
import LoadMore from '../package/load-more';
import PullRefresh from '../package/pull-refresh';
import Tabs from '../package/tabs';
import TabsPane from '../package/tabs-pane';
import Badge from '../package/badge';
import Picker from '../package/picker';
import AddressPicker from '../package/address-picker';
import DatePicker from '../package/date-picker';
import Search from '../package/search';
import Rate from '../package/rate';
import ImagePreview from '../package/image-preview';
import Image from '../package/image';
import TabBar from '../package/tab-bar';
import TabBarItem from '../package/tab-bar-item';
import Skeleton from '../package/skeleton';
import Uploader from '../package/uploader';
import IndexBox from '../package/index-box';
import IndexAnchor from '../package/index-anchor';
import SwipeAction from '../package/swipe-action';

const components = {
  Form,
  FormItem,
  Input,
  Cell,
  CellGroup,
  Button,
  Loading,
  Checkbox,
  CheckboxGroup,
  Redio,
  RadioGroup,
  Icon,
  Circle,
  Switch,
  Collapse,
  CollapseItem,
  ActionSheet,
  Dialog: Dialog.Component,
  LoadMore,
  PullRefresh,
  Tabs,
  TabsPane,
  Badge,
  Picker,
  AddressPicker,
  DatePicker,
  Search,
  Rate,
  ImagePreview: ImagePreview.Component,
  Image,
  TabBar,
  TabBarItem,
  Skeleton,
  Uploader,
  NavBar,
  IndexBox,
  IndexAnchor,
  SwipeAction,
};

const install = function (Vue) {
  if (install.installed) return;
  Object.keys(components).forEach((key) => {
    Vue.component(components[key].name, components[key]);
  });
  if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
  }
  Vue.prototype.$toast = Toast;
  Vue.prototype.$dialog = Dialog;
  Vue.prototype.$imagePreview = ImagePreview;
};

export default {
  version: `${process.env.PACKAGE_VERSION}`,
  install,
  components,
};
