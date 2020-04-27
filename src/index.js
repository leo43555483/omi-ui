import Form from '../package/form';
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
import Circle from '../package/cirlce';
import Switch from '../package/switch';
import Toast from '../package/toast';
import Collapse from '../package/collapse';
import CollapseItem from '../package/collapse-item';
import ActionSheet from '../package/action-sheet';
import Dialog from '../package/dialog';
import LoadMore from '../package/load-more';
import PullRefresh from '../package/pull-refresh';

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
};

export default {
  version: '',
  install,
  ...components,
};
