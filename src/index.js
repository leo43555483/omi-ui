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
];

const install = function (Vue) {
  if (install.installed) return;
  components.forEach((component) => {
    Vue.component(component.name, component);
  });
  if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
  }
};

export default {
  version: '',
  install,
  ...components,
};
