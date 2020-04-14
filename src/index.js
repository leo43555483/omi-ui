import Form from '../package/form';
import FormItem from '../package/form-item';
import Input from '../package/input';
import Cell from '../package/cell';
import Button from '../package/button';
import Loading from '../package/loading';
import Checkbox from '../package/checkbox';
import CheckboxGroup from '../package/checkbox-group';

const components = [
  Form,
  FormItem,
  Input,
  Cell,
  Button,
  Loading,
  Checkbox,
  CheckboxGroup
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
