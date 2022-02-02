import AddressPicker from './src/index.js';
export { default } from './src/index.js';

AddressPicker.install = function (Vue) {
  Vue.component(AddressPicker.name, AddressPicker);
};
