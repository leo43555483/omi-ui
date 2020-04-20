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

const components = [
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
  Toast,
  CollapseItem,
];

const install = function (Vue) {
  if (install.installed) return;
  components.forEach((component) => {
    Vue.component(component.name, component);
  });
  if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
  }
  Vue.prototype.$toast = Toast;
};

export default {
  version: '',
  install,
  ...components,
};
