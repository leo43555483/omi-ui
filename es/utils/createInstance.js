import Vue from 'vue';
import { isServer, isObject, isString, isFunction } from './shared.js';
import { removeElement } from './dom.js';

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function createInstance(_ref) {
  var VueComponent = _ref.VueComponent,
      defaultOption = _ref.defaultOption,
      _ref$replacement = _ref.replacement,
      replacement = _ref$replacement === void 0 ? true : _ref$replacement,
      _ref$appendToBody = _ref.appendToBody,
      appendToBody = _ref$appendToBody === void 0 ? false : _ref$appendToBody,
      _ref$banMultiple = _ref.banMultiple,
      banMultiple = _ref$banMultiple === void 0 ? false : _ref$banMultiple;

  if (!VueComponent) {
    throw new Error('[omi ui]: expected VueComponent in createInstance');
  }

  var DEFAULT_OPTION = _extends({}, defaultOption);

  var stack = [];

  var customOptions = _extends({}, DEFAULT_OPTION);

  var typeOtionCache = {};
  var isSingle = true;
  var zIndex = 0;

  function create() {
    var el = document.createElement('div');
    var vueInstance = new (Vue.extend(VueComponent))({
      el: el
    });
    vueInstance.$on('input', function (show) {
      vueInstance.value = show;
    });
    if (appendToBody) document.body.appendChild(vueInstance.$el);
    return vueInstance;
  }

  function getInstance() {
    var instance = stack[stack.length - 1];

    if (instance && isSingle) {
      if (replacement) {
        instance.$destroy();
        removeElement(instance.$el);
        stack[stack.length - 1] = create();
        return stack[stack.length - 1];
      }

      return instance;
    }

    var vueInstance = create();
    stack.push(vueInstance);
    zIndex += 1;
    return vueInstance;
  }

  return function (constructor) {
    var factory = constructor(getInstance, customOptions, typeOtionCache, zIndex);

    factory.removeInstance = function (instance) {
      if (!isSingle && !isServer()) {
        stack = stack.filter(function (item) {
          return item !== instance;
        });
        instance.$destroy();
        removeElement(instance.$el);
      }
    };

    factory.setOptions = function (type, opt) {
      if (isObject(type)) {
        customOptions = _extends({}, customOptions, type);
        typeOtionCache = {};
        return;
      }

      if (isString(type)) {
        typeOtionCache[type] = opt;
        return;
      }

      throw new Error('[omi ui]: Expect valid arguments in setOption');
    };

    factory.single = function (single) {
      if (banMultiple) return;
      isSingle = single;
    };

    factory.close = function () {
      if (stack.length === 0) return;
      var _stack$ = stack[0],
          topInstance = _stack$[0];
      if (isSingle && topInstance && isFunction(topInstance.close)) topInstance.close();else {
        var instance = stack.shift();
        instance.close();
      }
    };

    factory.closeAll = function () {
      stack.forEach(function (instance) {
        return instance.close();
      });
    };

    return factory;
  };
}

export { createInstance as default };
