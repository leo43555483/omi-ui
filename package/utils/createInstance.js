import Vue from 'vue';
import {
  isObject, isString, isServer, isFunction,
} from './shared';
import { removeElement } from './dom';

function createInstance({
  VueComponent,
  defaultOption,
  replacement = true,
  appendToBody = false,
  banMultiple = false,
}) {
  if (!VueComponent) {
    throw new Error('[omi ui]: expected VueComponent in createInstance');
  }
  const DEFAULT_OPTION = { ...defaultOption };
  let stack = [];
  let customOptions = { ...DEFAULT_OPTION };
  let typeOtionCache = {};
  let isSingle = true;
  let zIndex = 0;

  function create() {
    const el = document.createElement('div');
    const vueInstance = new (Vue.extend(VueComponent))({ el });
    vueInstance.$on('input', (show) => { vueInstance.value = show; });
    if (appendToBody) document.body.appendChild(vueInstance.$el);
    return vueInstance;
  }
  function getInstance() {
    const instance = stack[stack.length - 1];
    if (instance && isSingle) {
      if (replacement) {
        instance.$destroy();
        removeElement(instance.$el);
        stack[stack.length - 1] = create();
        return stack[stack.length - 1];
      }
      return instance;
    }
    const vueInstance = create();
    stack.push(vueInstance);
    zIndex += 1;
    return vueInstance;
  }
  return function (constructor) {
    const factory = constructor(getInstance, customOptions, typeOtionCache, zIndex);

    factory.removeInstance = (instance) => {
      if (!isSingle && !isServer()) {
        stack = stack.filter((item) => item !== instance);
        instance.$destroy();
        removeElement(instance.$el);
      }
    };
    factory.setOptions = (type, opt) => {
      if (isObject(type)) {
        customOptions = { ...customOptions, ...type };
        typeOtionCache = {};
        return;
      }
      if (isString(type)) {
        typeOtionCache[type] = opt;
        return;
      }
      throw new Error('[omi ui]: Expect valid arguments in setOption');
    };
    factory.single = (single) => {
      if (banMultiple) return;
      isSingle = single;
    };
    factory.close = () => {
      if (stack.length === 0) return;
      const [topInstance] = stack[0];
      if (isSingle && topInstance && isFunction(topInstance.close)) topInstance.close();
      else {
        const instance = stack.shift();
        instance.close();
      }
    };
    factory.closeAll = () => {
      stack.forEach((instance) => instance.close());
    };
    return factory;
  };
}

export default createInstance;
