(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('vue'), require('vue-runtime-helpers/dist/normalize-component.js'), require('async-validator'), require('@vue/babel-helper-vue-jsx-merge-props')) :
  typeof define === 'function' && define.amd ? define(['vue', 'vue-runtime-helpers/dist/normalize-component.js', 'async-validator', '@vue/babel-helper-vue-jsx-merge-props'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.omi = factory(global.Vue, global.__vue_normalize__, global.AsyncValidator, global._mergeJSXProps));
})(this, (function (Vue, __vue_normalize__, AsyncValidator, _mergeJSXProps) { 'use strict';

  function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

  var Vue__default = /*#__PURE__*/_interopDefaultLegacy(Vue);
  var __vue_normalize____default = /*#__PURE__*/_interopDefaultLegacy(__vue_normalize__);
  var AsyncValidator__default = /*#__PURE__*/_interopDefaultLegacy(AsyncValidator);
  var _mergeJSXProps__default = /*#__PURE__*/_interopDefaultLegacy(_mergeJSXProps);

  function _createForOfIteratorHelperLoose(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (it) return (it = it.call(o)).next.bind(it); if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; return function () { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

  function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

  function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
  function isArray(value) {
    return Array.isArray(value);
  }
  function oneOf(val, expection) {
    if (!isArray(expection)) {
      return val === expection;
    }

    return expection.some(function (item) {
      return val === item;
    });
  }
  function isKorean(text) {
    var reg = /([(\uAC00-\uD7AF)|(\u3130-\u318F)])+/gi;
    return reg.test(text);
  }
  function isFunction(f) {
    return typeof f === 'function';
  }
  function getValueByName(model, name) {
    var keys = name.split('.');
    if (keys.length === 1) return model[name];
    var temp = model;

    for (var _iterator = _createForOfIteratorHelperLoose(keys), _step; !(_step = _iterator()).done;) {
      var key = _step.value;

      if (key in temp) {
        temp = temp[key];
      } else {
        throw new Error('please transfer a valid prop path to form item!');
      }

      break;
    }

    return temp;
  }
  function createClassMap(prefix, classNames) {
    var _ref;

    if (typeof classNames === 'string') return _ref = {}, _ref[classNames] = "" + prefix + classNames, _ref;

    if (isArray(classNames)) {
      return classNames.reduce(function (map, className) {
        // eslint-disable-next-line no-param-reassign
        map[className] = "" + prefix + className;
        return map;
      }, {});
    }

    return null;
  }
  function getSizeString(string) {
    if (string === null) return [];
    return /^\d+/.exec(string);
  }
  function isObject(value) {
    if (value === null) return false;
    return Object.prototype.toString.call(value) === '[object Object]';
  }
  function isString(value) {
    return typeof value === 'string';
  }
  function throttle(fn, delay) {
    if (delay === void 0) {
      delay = 16;
    }

    var pre = 0;
    var timer = null;
    return function () {
      var _this = this;

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      var cur = Date.now();
      var remaining = delay - (cur - pre);

      if (remaining <= 0) {
        fn.apply(this, args);
        pre = Date.now();
      } else {
        timer = setTimeout(function () {
          clearTimeout(timer);
          fn.apply(_this, args);
        }, remaining);
      }
    };
  }
  function isDate(value) {
    return Object.prototype.toString.call(value) === '[object Date]';
  }
  function isPromise(fn) {
    return fn instanceof Promise;
  }
  function isNumber$1(value) {
    return typeof value === 'number';
  }
  function unDef(value) {
    return value === null || value === undefined || value === '';
  }
  function getRange(value, max, min) {
    if (unDef(max) || unDef(min)) return value;
    var floor = Math.max(min, value);
    return Math.min(floor, max);
  }
  function getUid() {
    var uid = 0;
    return function (prex, reset) {
      if (reset) uid = 0;
      uid += 1;
      return prex + "-" + uid;
    };
  }
  function isUnitString(str) {
    if (!isString(str) || unDef(str)) return false;
    return /^\d+(px|rem|%|vw|em|vh|vmin|vmax)$/g.test(str);
  }
  function getCharacter() {
    var list = [];

    var _char = 'A'.charCodeAt(); // eslint-disable-next-line no-plusplus


    for (var i = 0; i < 26; i++) {
      list.push(String.fromCharCode(_char + i));
    }

    return list;
  }
  function noop() {}
  var isServer$1 = Vue__default["default"].prototype.$isServer;

  //
  var script$q = {
    name: 'OmiForm',
    provide: function provide() {
      return {
        omiForm: this
      };
    },
    data: function data() {
      return {
        fields: []
      };
    },
    props: {
      labelAlign: {
        type: String,
        default: null
      },
      labelWith: {
        type: [String, Number],
        default: null
      },
      showStatus: {
        type: Boolean,
        default: true
      },
      firstValidate: {
        type: Boolean,
        default: false
      },
      colon: {
        type: Boolean,
        default: true
      },
      scrollToError: {
        type: Boolean,
        default: false
      },
      showError: {
        type: String,
        default: ''
      },
      models: {
        type: Object
      },
      autocomplete: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      onValidate: function onValidate(error, name) {
        this.$emit('validate', error, name);
      },

      /**
       * @vue2doc-exposed-api:resetValidate
       */
      resetValidate: function resetValidate() {
        this.fields.forEach(function (field) {
          return field.resetValidate();
        });
      },

      /**
       * @vue2doc-exposed-api:validateField
       */
      validateField: function validateField(name) {
        var _this$fields$filter = this.fields.filter(function (field) {
          return field.name === name;
        }),
            target = _this$fields$filter[0];

        if (target) {
          return target.validate(null);
        }

        throw new Error('please pass in valid name from item!');
      },
      scrollToView: function scrollToView(el) {
        el.scrollIntoView();
      },
      validateRace: function validateRace(callback) {
        var _this = this;

        var fields = this.fields;
        var errors = [];
        return fields.reduce(function (promise, field) {
          return promise.then(function () {
            if (!errors.length) {
              return field.validate().then(function (error) {
                if (error) {
                  errors.push(error);
                  if (_this.scrollToError) _this.scrollToView(field.$el);
                }
              });
            }

            return Promise.resolve();
          });
        }, Promise.resolve()).then(function () {
          var error = null;

          if (errors.length) {
            error = errors[0];
          }

          if (isFunction(callback)) callback(error);
          return error;
        });
      },
      validateAll: function validateAll(callback) {
        var _this2 = this;

        return new Promise(function (resolve) {
          var fields = _this2.fields;
          var errors = null;
          var validators = fields.map(function (field) {
            return field.validate();
          });
          Promise.all(validators).then(function (error) {
            errors = error.filter(function (item) {
              return item;
            });

            if (_this2.scrollToError) {
              var name = errors[0].name;

              var _fields$filter = fields.filter(function (field) {
                return field.name === name;
              }),
                  scorllField = _fields$filter[0];

              _this2.scrollToView(scorllField.$el);
            }

            var result = errors.length ? errors : null;
            if (isFunction(callback)) callback(result);
            resolve(result);
          });
        });
      },
      validate: function validate(callback) {
        var firstValidate = this.firstValidate;
        return firstValidate ? this.validateRace(callback) : this.validateAll(callback);
      }
    }
  };

  /* script */
  const __vue_script__$q = script$q;

  /* template */
  var __vue_render__$q = function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c(
      "form",
      { staticClass: "omi-form", attrs: { autocomplete: _vm.autocomplete } },
      [_vm._t("default")],
      2
    )
  };
  var __vue_staticRenderFns__$q = [];
  __vue_render__$q._withStripped = true;

    /* style */
    const __vue_inject_styles__$q = undefined;
    /* scoped */
    const __vue_scope_id__$q = undefined;
    /* module identifier */
    const __vue_module_identifier__$q = undefined;
    /* functional template */
    const __vue_is_functional_template__$q = false;
    /* style inject */
    
    /* style inject SSR */
    

    
    var Form = __vue_normalize____default["default"](
      { render: __vue_render__$q, staticRenderFns: __vue_staticRenderFns__$q },
      __vue_inject_styles__$q,
      __vue_script__$q,
      __vue_scope_id__$q,
      __vue_is_functional_template__$q,
      __vue_module_identifier__$q,
      undefined,
      undefined
    );

  Form.install = function (Vue) {
    Vue.component(Form.name, Form);
  };

  //
  //
  //
  //
  var script$p = {
    name: 'OmiIcon',
    props: {
      type: {
        type: String,
        default: '',
        required: true
      },
      size: {
        type: [String, Number],
        default: null
      }
    },
    computed: {
      iconSize: function iconSize() {
        return "font-size: " + this.size + "px";
      },
      iconClass: function iconClass() {
        return ["omi-" + this.type];
      }
    }
  };

  /* script */
  const __vue_script__$p = script$p;
  /* template */
  var __vue_render__$p = function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c("i", {
      staticClass: "omi-icon-font",
      class: _vm.iconClass,
      style: _vm.iconSize
    })
  };
  var __vue_staticRenderFns__$p = [];
  __vue_render__$p._withStripped = true;

    /* style */
    const __vue_inject_styles__$p = undefined;
    /* scoped */
    const __vue_scope_id__$p = undefined;
    /* module identifier */
    const __vue_module_identifier__$p = undefined;
    /* functional template */
    const __vue_is_functional_template__$p = false;
    /* style inject */
    
    /* style inject SSR */
    

    
    var Icon = __vue_normalize____default["default"](
      { render: __vue_render__$p, staticRenderFns: __vue_staticRenderFns__$p },
      __vue_inject_styles__$p,
      __vue_script__$p,
      __vue_scope_id__$p,
      __vue_is_functional_template__$p,
      __vue_module_identifier__$p,
      undefined,
      undefined
    );

  Icon.install = function (Vue) {
    Vue.component(Icon.name, Icon);
  };

  var _components$1;
  var script$o = {
    name: 'OmiNavBar',
    props: {
      showLeftArrow: {
        type: Boolean,
        default: true
      },
      title: {
        type: String
      },
      right: {
        type: String
      },
      left: {
        type: String
      }
    },
    components: (_components$1 = {}, _components$1[Icon.name] = Icon, _components$1),
    methods: {
      onClick: function onClick(e, type) {
        this.$emit(type, e);
      }
    }
  };

  /* script */
  const __vue_script__$o = script$o;
  /* template */
  var __vue_render__$o = function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c("div", { staticClass: "omi-nav-bar omi-border__bottom" }, [
      _c(
        "div",
        {
          staticClass: "omi-nav-bar__left",
          on: {
            click: function(e) {
              return _vm.onClick(e, "clickLeft")
            }
          }
        },
        [
          _vm._t("left", function() {
            return [
              _vm.showLeftArrow
                ? _c("omi-icon", { attrs: { type: "return" } })
                : _vm._e()
            ]
          }),
          _vm._v(" "),
          _c("span", { staticClass: "omi-nav-bar__left--text" }, [
            _vm._v(_vm._s(_vm.left))
          ])
        ],
        2
      ),
      _vm._v(" "),
      _c("div", { staticClass: "omi-nav-bar__middle" }, [
        _vm._v(_vm._s(_vm.title))
      ]),
      _vm._v(" "),
      _c(
        "div",
        {
          staticClass: "omi-nav-bar__right",
          on: {
            click: function(e) {
              return _vm.onClick(e, "clickRight")
            }
          }
        },
        [
          _vm._t("right", function() {
            return [_vm._v(_vm._s(_vm.right))]
          })
        ],
        2
      )
    ])
  };
  var __vue_staticRenderFns__$o = [];
  __vue_render__$o._withStripped = true;

    /* style */
    const __vue_inject_styles__$o = undefined;
    /* scoped */
    const __vue_scope_id__$o = undefined;
    /* module identifier */
    const __vue_module_identifier__$o = undefined;
    /* functional template */
    const __vue_is_functional_template__$o = false;
    /* style inject */
    
    /* style inject SSR */
    

    
    var NavBar = __vue_normalize____default["default"](
      { render: __vue_render__$o, staticRenderFns: __vue_staticRenderFns__$o },
      __vue_inject_styles__$o,
      __vue_script__$o,
      __vue_scope_id__$o,
      __vue_is_functional_template__$o,
      __vue_module_identifier__$o,
      undefined,
      undefined
    );

  NavBar.install = function (Vue) {
    Vue.component(NavBar.name, NavBar);
  };

  var _routeButtonProps;

  var tagClass = 'omi-cell__inner';
  var VUE_ROUTER_ATTR = ['append', 'tag', 'activeClass', 'exact', 'event', 'exactActiveClass', 'replace', 'to'];
  var APPEND = VUE_ROUTER_ATTR[0],
      TAG = VUE_ROUTER_ATTR[1],
      ACTIVECLASS = VUE_ROUTER_ATTR[2],
      EXACT = VUE_ROUTER_ATTR[3],
      EVENT = VUE_ROUTER_ATTR[4],
      EXACTACTIVECLASS = VUE_ROUTER_ATTR[5],
      REPLACE = VUE_ROUTER_ATTR[6],
      TO = VUE_ROUTER_ATTR[7];
  var routeButtonProps = (_routeButtonProps = {
    href: {
      type: String,
      default: null
    }
  }, _routeButtonProps[APPEND] = {
    type: Boolean,
    default: false
  }, _routeButtonProps[TAG] = {
    type: String,
    default: 'div'
  }, _routeButtonProps[ACTIVECLASS] = {
    type: String,
    default: null
  }, _routeButtonProps[EXACT] = {
    type: Boolean,
    default: false
  }, _routeButtonProps[EVENT] = {
    type: String,
    default: null
  }, _routeButtonProps[EXACTACTIVECLASS] = {
    type: String,
    default: null
  }, _routeButtonProps[TO] = {
    type: String,
    default: null
  }, _routeButtonProps[REPLACE] = {
    type: Boolean,
    default: false
  }, _routeButtonProps);

  var getValidProps = function getValidProps(ctx) {
    var props = {};
    VUE_ROUTER_ATTR.forEach(function (key) {
      if (ctx[key] !== null) props[key] = ctx[key];
    });
    return props;
  };

  var RouteButton = function RouteButton() {
    return {
      props: routeButtonProps,
      methods: {
        createHrefTag: function createHrefTag(child) {
          var h = this.$createElement;
          return h("a", {
            "attrs": {
              "href": this.href
            },
            "class": tagClass
          }, [child]);
        },
        createRouteTag: function createRouteTag(child) {
          var h = this.$createElement;
          var routeAttrs = getValidProps(this);
          var props = {
            props: routeAttrs
          };
          return h("RouterLink", _mergeJSXProps__default["default"]([{}, props, {
            "class": tagClass
          }]), [child]);
        },
        createNormalTag: function createNormalTag(child) {
          var h = this.$createElement;
          return h("div", {
            "class": tagClass
          }, [child]);
        }
      },
      render: function render() {
        var href = this.href,
            to = this.to,
            createHrefTag = this.createHrefTag,
            createRouteTag = this.createRouteTag,
            createNormalTag = this.createNormalTag;
        var slot = this.$slots.default;
        if (href) return createHrefTag(slot);
        if (to) return createRouteTag(slot);
        return createNormalTag(slot);
      }
    };
  };

  var RouteButton$1 = RouteButton();

  //
  var to = routeButtonProps.to,
      append = routeButtonProps.append,
      tag = routeButtonProps.tag,
      replace = routeButtonProps.replace,
      event = routeButtonProps.event;
  var script$n = {
    name: 'OmiCell',
    inheritAttrs: false,
    props: {
      to: to,
      replace: replace,
      tag: tag,
      event: event,
      append: append,
      href: {
        type: String,
        default: null
      },
      rightArrow: {
        type: Boolean,
        default: false
      },
      clickable: {
        type: Boolean,
        default: false
      },
      titleClass: {
        type: String,
        default: ''
      },
      contentClass: {
        type: String,
        default: ''
      },
      titleStyle: {
        type: String,
        default: null
      },
      contentStyle: {
        type: String,
        default: null
      },
      title: {
        type: String,
        default: ''
      },
      label: {
        type: String,
        default: ''
      },
      content: {
        type: String,
        default: ''
      },
      titleAlign: {
        type: String,
        default: null
      },
      titleWidth: {
        type: [String, Number],
        default: null
      },
      contentAlign: {
        type: String,
        default: null
      }
    },
    components: {
      Icon: Icon,
      RouteButton: RouteButton$1
    },
    methods: {
      renderSlot: function renderSlot(name) {
        return this.$slots[name];
      }
    },
    computed: {
      renderTitle: function renderTitle() {
        var title = this.title,
            label = this.label;
        var $slots = this.$slots;
        return title || label || $slots.title || $slots.label;
      },
      clickAbleClass: function clickAbleClass() {
        var clickable = this.clickable;
        return clickable ? 'omi-cell__clickable' : null;
      },
      customTitleStyles: function customTitleStyles() {
        if (this.titleStyle) return this.titleStyle;
        var styles = '';

        if (this.titleWidth) {
          var titleWidth = null;

          if (isUnitString(this.titleWidth)) {
            titleWidth = this.titleWidth;
          } else if (/^\d+/.test(this.titleWidth)) {
            titleWidth = getSizeString(this.titleWidth)[0] + "px";
          }

          styles = "flex: none; width: " + titleWidth + ";";
        }

        return styles + "text-align: " + this.titleAlign;
      },
      customContentStyles: function customContentStyles() {
        if (this.contentStyle) return this.contentStyle;
        return "text-align: " + this.contentAlign;
      }
    }
  };

  /* script */
  const __vue_script__$n = script$n;

  /* template */
  var __vue_render__$n = function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c(
      "div",
      _vm._g(
        { staticClass: "omi-cell", class: _vm.clickAbleClass },
        _vm.$listeners
      ),
      [
        _c(
          "route-button",
          {
            attrs: {
              to: _vm.to,
              replace: _vm.replace,
              append: _vm.append,
              href: _vm.href,
              tag: _vm.tag,
              event: _vm.event
            }
          },
          [
            _vm.renderSlot("left-icon")
              ? _c(
                  "div",
                  { staticClass: "omi-cell__left--icon" },
                  [_vm._t("left-icon")],
                  2
                )
              : _vm._e(),
            _vm._v(" "),
            _vm.renderTitle
              ? _c(
                  "div",
                  {
                    staticClass: "omi-cell__title",
                    class: _vm.titleClass,
                    style: _vm.customTitleStyles
                  },
                  [
                    _vm._t("title", function() {
                      return [
                        _vm.title
                          ? _c("div", [_vm._v(_vm._s(_vm.title))])
                          : _vm._e()
                      ]
                    }),
                    _vm._v(" "),
                    _vm._t("label", function() {
                      return [
                        _vm.label
                          ? _c("div", { staticClass: "omi-cell__label" }, [
                              _vm._v(_vm._s(_vm.label))
                            ])
                          : _vm._e()
                      ]
                    })
                  ],
                  2
                )
              : _vm._e(),
            _vm._v(" "),
            _vm.renderSlot("content") || _vm.content
              ? _c(
                  "div",
                  { staticClass: "omi-cell__content", class: _vm.contentClass },
                  [
                    _c(
                      "div",
                      {
                        staticClass: "omi-cell__content--body",
                        style: _vm.customContentStyles
                      },
                      [
                        _vm._t("content", function() {
                          return [_c("span", [_vm._v(_vm._s(_vm.content))])]
                        })
                      ],
                      2
                    ),
                    _vm._v(" "),
                    _vm._t("description")
                  ],
                  2
                )
              : _vm._e(),
            _vm._v(" "),
            _vm.renderSlot("extra")
              ? _c(
                  "div",
                  { staticClass: "omi-cell__extra" },
                  [_vm._t("extra")],
                  2
                )
              : _vm._e(),
            _vm._v(" "),
            _vm.renderSlot("right-icon") || _vm.rightArrow
              ? _c(
                  "div",
                  { staticClass: "omi-cell__right--icon" },
                  [
                    _vm._t("right-icon", function() {
                      return [_c("icon", { attrs: { type: "enter" } })]
                    })
                  ],
                  2
                )
              : _vm._e()
          ]
        )
      ],
      1
    )
  };
  var __vue_staticRenderFns__$n = [];
  __vue_render__$n._withStripped = true;

    /* style */
    const __vue_inject_styles__$n = undefined;
    /* scoped */
    const __vue_scope_id__$n = undefined;
    /* module identifier */
    const __vue_module_identifier__$n = undefined;
    /* functional template */
    const __vue_is_functional_template__$n = false;
    /* style inject */
    
    /* style inject SSR */
    

    
    var Cell = __vue_normalize____default["default"](
      { render: __vue_render__$n, staticRenderFns: __vue_staticRenderFns__$n },
      __vue_inject_styles__$n,
      __vue_script__$n,
      __vue_scope_id__$n,
      __vue_is_functional_template__$n,
      __vue_module_identifier__$n,
      undefined,
      undefined
    );

  Cell.install = function (Vue) {
    Vue.component(Cell.name, Cell);
  };

  var _components;

  function _extends$g() { _extends$g = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$g.apply(this, arguments); }
  var STATUS_VALIDATING = 'validating';
  var STATUS_FAILED = 'failed';
  var STATUS_SUCCESS = 'success';
  var script$m = {
    name: 'OmiFormItem',
    inheritAttrs: false,
    provide: function provide() {
      return {
        omiFormItem: this
      };
    },
    inject: {
      omiForm: {
        default: null
      }
    },
    data: function data() {
      return {
        status: '',
        validateMessage: ''
      };
    },
    props: {
      labelWith: {
        type: [String, Number],
        default: null
      },
      showStatus: {
        type: Boolean,
        default: true
      },
      showRequired: {
        type: Boolean,
        default: true
      },
      labelFor: {
        type: String,
        default: null
      },
      rules: {
        type: Array,
        default: function _default() {
          return [];
        }
      },
      colon: {
        type: Boolean,
        default: false
      },
      name: {
        type: String,
        default: ''
      },
      label: {
        type: String,
        default: ''
      }
    },
    components: (_components = {}, _components[Cell.name] = Cell, _components),
    methods: {
      validate: function validate(trigger, callback) {
        var _model,
            _this = this;

        if (callback === void 0) {
          callback = function callback() {};
        }

        var rules = this.getRulesByTrigger(trigger);

        if (rules.length === 0) {
          return Promise.resolve().then(function () {
            return callback();
          });
        }

        rules.forEach(function (item) {
          var t = item;
          delete t.trigger;
        });
        var name = this.name,
            filedValue = this.filedValue;
        var descriptor = {};
        descriptor[name] = rules;
        var model = (_model = {}, _model[name] = filedValue, _model);
        var validator = new AsyncValidator__default["default"](descriptor);
        var option = {
          firstFields: true
        };
        this.setValidateStatus(STATUS_VALIDATING);
        return validator.validate(model, option).then(function () {
          _this.setValidateStatus(STATUS_SUCCESS);

          _this.validateMessage = '';

          _this.omiForm.onValidate(null, name);

          callback();
        }).catch(function (_ref) {
          var errors = _ref.errors,
              fields = _ref.fields;

          _this.setValidateStatus(STATUS_FAILED);

          var message = errors[0].message;
          _this.validateMessage = message;
          var ret = {
            name: name,
            message: message,
            fields: fields
          };

          _this.omiForm.onValidate(errors, name);

          callback(ret);
          return ret;
        });
      },
      resetValidate: function resetValidate() {
        this.status = '';
        this.validateMessage = '';
      },
      getRulesByTrigger: function getRulesByTrigger(originTrigger) {
        var rules = this.rules;

        if (!originTrigger) {
          return rules.map(function (rule) {
            return _extends$g({}, rule);
          });
        }

        var re = new RegExp("^" + originTrigger + "$");
        return rules.filter(function (_ref2) {
          var trigger = _ref2.trigger;
          return !trigger || re.test(trigger);
        }).map(function (item) {
          return _extends$g({}, item);
        });
      },
      setValidateStatus: function setValidateStatus(status) {
        this.status = status;
      }
    },
    computed: {
      filedValue: function filedValue() {
        var name = this.name;
        if (!name || !this.omiForm) return '';
        var models = this.omiForm.models;
        return getValueByName(models, name);
      },
      isRequired: function isRequired() {
        return this.rules.some(function (rule) {
          return rule.required;
        });
      },
      titleStyle: function titleStyle() {
        var omiForm = this.omiForm;
        var labelWith = omiForm && omiForm.labelWith || this.labelWith;
        var labelAlign = omiForm && omiForm.labelAlign || this.labelAlign;
        return "width: " + labelWith + "px; text-align: " + labelAlign;
      },
      titleClass: function titleClass() {
        var classes = 'omi-form-item__title';

        if (this.isRequired && this.showRequired) {
          classes += ' omi-form-title__required';
        }

        return classes;
      }
    },
    created: function created() {
      if (this.omiForm) this.omiForm.fields.push(this);
    }
  };

  /* script */
  const __vue_script__$m = script$m;
  /* template */
  var __vue_render__$m = function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c(
      "div",
      {
        staticClass: "omi-form-item",
        class: { "omi-form-item__error": _vm.validateMessage }
      },
      [
        _c(
          "omi-cell",
          _vm._b(
            {
              attrs: {
                "title-class": _vm.titleClass,
                "title-style": _vm.titleStyle
              }
            },
            "omi-cell",
            _vm.$attrs,
            false
          ),
          [
            _c("template", { slot: "icon-left" }, [_vm._t("icon-left")], 2),
            _vm._v(" "),
            _c(
              "template",
              { slot: "title" },
              [
                _vm._t("label", function() {
                  return [
                    _vm.label
                      ? _c("label", { attrs: { for: _vm.labelFor } }, [
                          _vm._v(
                            "\n          " + _vm._s(_vm.label) + "\n          "
                          ),
                          _vm.colon ? _c("span", [_vm._v(":")]) : _vm._e()
                        ])
                      : _vm._e()
                  ]
                })
              ],
              2
            ),
            _vm._v(" "),
            _c("template", { slot: "content" }, [_vm._t("default")], 2),
            _vm._v(" "),
            _c("template", { slot: "extra" }, [_vm._t("extra")], 2),
            _vm._v(" "),
            _c("template", { slot: "icon-right" }, [_vm._t("icon-right")], 2),
            _vm._v(" "),
            _vm.name
              ? _c(
                  "template",
                  { slot: "description" },
                  [
                    _c("transition", { attrs: { name: "fade-in-bottom" } }, [
                      _vm.validateMessage
                        ? _c("div", { staticClass: "omi-form-item__message" }, [
                            _vm._v(_vm._s(_vm.validateMessage))
                          ])
                        : _vm._e()
                    ])
                  ],
                  1
                )
              : _vm._e()
          ],
          2
        )
      ],
      1
    )
  };
  var __vue_staticRenderFns__$m = [];
  __vue_render__$m._withStripped = true;

    /* style */
    const __vue_inject_styles__$m = undefined;
    /* scoped */
    const __vue_scope_id__$m = undefined;
    /* module identifier */
    const __vue_module_identifier__$m = undefined;
    /* functional template */
    const __vue_is_functional_template__$m = false;
    /* style inject */
    
    /* style inject SSR */
    

    
    var FormItem = __vue_normalize____default["default"](
      { render: __vue_render__$m, staticRenderFns: __vue_staticRenderFns__$m },
      __vue_inject_styles__$m,
      __vue_script__$m,
      __vue_scope_id__$m,
      __vue_is_functional_template__$m,
      __vue_module_identifier__$m,
      undefined,
      undefined
    );

  FormItem.install = function (Vue) {
    Vue.component(FormItem.name, FormItem);
  };

  var filedMixin = {
    inject: {
      omiFormItem: {
        default: null
      }
    },
    methods: {
      validateTriggerOn: function validateTriggerOn(trigger) {
        if (this.omiFormItem) {
          this.omiFormItem.validate(trigger);
        }
      }
    }
  };

  function _extends$f() { _extends$f = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$f.apply(this, arguments); }
  var inpuMixin = {
    data: function data() {
      return {
        isComposing: false
      };
    },
    methods: {
      onInput: function onInput(e) {
        if (this.isComposing) return;
        this.$emit('input', e.target.value);
      },
      onKeyPress: function onKeyPress(e) {
        if (this.type === 'search' && e.keyCode === 13) {
          this.blur();
          this.$emit('search', e);
        }
      },
      onFocus: function onFocus(e) {
        this.$emit('focus', e);
      },
      onBlur: function onBlur(e) {
        this.$emit('blur', e);
        if (isFunction(this.validateTriggerOn)) this.validateTriggerOn('blur');
      },
      onCompositionUpdate: function onCompositionUpdate(e) {
        var text = e.target.value;
        var lastCharacter = text[text.length - 1] || '';
        this.isComposing = !isKorean(lastCharacter);
      },
      onCompositionStart: function onCompositionStart() {
        this.isComposing = true;
      },
      onCompositionEnd: function onCompositionEnd(e) {
        if (this.isComposing) {
          this.isComposing = false;
          this.onInput(e);
        }
      }
    },
    computed: {
      listeners: function listeners() {
        return _extends$f({}, this.$listeners, {
          input: this.onInput,
          focus: this.onFocus,
          blur: this.onBlur,
          keypress: this.onKeyPress,
          compositionstart: this.onCompositionStart,
          compositionupdate: this.onCompositionUpdate,
          compositionend: this.onCompositionEnd
        });
      }
    }
  };

  //
  var INPUT_TYPE = ['text', 'password', 'url', 'email', 'date', 'number', 'tel', 'search'];
  var script$l = {
    name: 'OmiInput',
    mixins: [filedMixin, inpuMixin],
    inheritAttrs: false,
    data: function data() {
      return {
        isComposing: false
      };
    },
    methods: {
      focus: function focus() {
        this.$refs.input.focus();
      }
    },
    watch: {
      value: function value() {
        this.validateTriggerOn('change');
      }
    },
    props: {
      type: {
        validator: function validator(value) {
          return oneOf(value, INPUT_TYPE);
        },
        default: 'text'
      },
      value: {
        type: [String, Number],
        default: ''
      }
    }
  };

  /* script */
  const __vue_script__$l = script$l;

  /* template */
  var __vue_render__$l = function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c("div", { staticClass: "omi-input" }, [
      _c(
        "input",
        _vm._g(
          _vm._b(
            {
              ref: "input",
              staticClass: "omi-input__inner",
              attrs: { type: _vm.type },
              domProps: { value: _vm.value }
            },
            "input",
            _vm.$attrs,
            false
          ),
          _vm.listeners
        )
      )
    ])
  };
  var __vue_staticRenderFns__$l = [];
  __vue_render__$l._withStripped = true;

    /* style */
    const __vue_inject_styles__$l = undefined;
    /* scoped */
    const __vue_scope_id__$l = undefined;
    /* module identifier */
    const __vue_module_identifier__$l = undefined;
    /* functional template */
    const __vue_is_functional_template__$l = false;
    /* style inject */
    
    /* style inject SSR */
    

    
    var Input = __vue_normalize____default["default"](
      { render: __vue_render__$l, staticRenderFns: __vue_staticRenderFns__$l },
      __vue_inject_styles__$l,
      __vue_script__$l,
      __vue_scope_id__$l,
      __vue_is_functional_template__$l,
      __vue_module_identifier__$l,
      undefined,
      undefined
    );

  Input.install = function (Vue) {
    Vue.component(Input.name, Input);
  };

  //
  //
  //
  //
  //
  //
  //
  //
  var script$k = {
    name: 'OmiCellGroup',
    props: {
      title: {
        type: String,
        default: ''
      },
      description: {
        type: String,
        default: ''
      }
    }
  };

  /* script */
  const __vue_script__$k = script$k;
  /* template */
  var __vue_render__$k = function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c("div", { staticClass: "omi-cell-group" }, [
      _vm.title
        ? _c("div", { staticClass: "omi-cell-group__title" }, [
            _vm._v(_vm._s(_vm.title))
          ])
        : _vm._e(),
      _vm._v(" "),
      _c("div", [_vm._t("default")], 2),
      _vm._v(" "),
      _vm.description
        ? _c("div", { staticClass: "omi-cell-group__description" }, [
            _vm._v(_vm._s(_vm.description))
          ])
        : _vm._e()
    ])
  };
  var __vue_staticRenderFns__$k = [];
  __vue_render__$k._withStripped = true;

    /* style */
    const __vue_inject_styles__$k = undefined;
    /* scoped */
    const __vue_scope_id__$k = undefined;
    /* module identifier */
    const __vue_module_identifier__$k = undefined;
    /* functional template */
    const __vue_is_functional_template__$k = false;
    /* style inject */
    
    /* style inject SSR */
    

    
    var CellGrounp = __vue_normalize____default["default"](
      { render: __vue_render__$k, staticRenderFns: __vue_staticRenderFns__$k },
      __vue_inject_styles__$k,
      __vue_script__$k,
      __vue_scope_id__$k,
      __vue_is_functional_template__$k,
      __vue_module_identifier__$k,
      undefined,
      undefined
    );

  CellGrounp.install = function (Vue) {
    Vue.component(CellGrounp.name, CellGrounp);
  };

  //
  var script$j = {
    name: 'OmiLoading',
    data: function data() {
      return {
        showIndex: 0
      };
    },
    props: {
      // 内部使用
      lazyShow: {
        type: Boolean,
        default: false
      },
      spinner: {
        type: Boolean,
        default: false
      },
      size: {
        type: [String, Number],
        default: null
      },
      color: {
        type: String,
        default: null
      },
      loadingText: {
        type: String,
        default: null
      }
    },
    methods: {
      show: function show(index) {
        if (!this.spinner) return;
        this.showIndex = index;
      },
      lazyClass: function lazyClass(index) {
        if (this.lazyShow && index > this.showIndex) return 'omi-loading__item--lazy';
        return null;
      }
    },
    computed: {
      wrapperClasses: function wrapperClasses() {
        var loadingText = this.loadingText,
            lazyShow = this.lazyShow;
        return {
          'omi-loading__vertical': loadingText,
          'omi-loading__lazy': lazyShow
        };
      },
      customStyles: function customStyles() {
        if (this.lazyShow && this.spinner) return 'animation-name: none';

        var _getSizeString = getSizeString(this.size),
            size = _getSizeString[0];

        size = size ? "width: " + size + "px; height: " + size + "px;" : null;
        var step = this.spinner ? 'animation-timing-function: steps(12);' : null;
        return size + " " + this.customColor + " " + step;
      },
      customColor: function customColor() {
        return "color:" + this.color + ";";
      }
    }
  };

  /* script */
  const __vue_script__$j = script$j;
  /* template */
  var __vue_render__$j = function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c("div", { staticClass: "omi-loading", class: _vm.wrapperClasses }, [
      _c(
        "div",
        { staticClass: "omi-loading__spinner", style: _vm.customStyles },
        [
          !_vm.spinner
            ? [
                _c(
                  "svg",
                  { staticClass: "circular", attrs: { viewBox: "25 25 50 50" } },
                  [
                    _c("circle", {
                      attrs: { cx: "50", cy: "50", r: "20", fill: "none" }
                    })
                  ]
                )
              ]
            : _vm._l(12, function(item, index) {
                return _c("i", { key: item, class: _vm.lazyClass(index + 1) })
              })
        ],
        2
      ),
      _vm._v(" "),
      _vm.loadingText
        ? _c(
            "div",
            { staticClass: "omi-loading__text", style: _vm.customColor },
            [_vm._v(_vm._s(_vm.loadingText))]
          )
        : _vm._e()
    ])
  };
  var __vue_staticRenderFns__$j = [];
  __vue_render__$j._withStripped = true;

    /* style */
    const __vue_inject_styles__$j = undefined;
    /* scoped */
    const __vue_scope_id__$j = undefined;
    /* module identifier */
    const __vue_module_identifier__$j = undefined;
    /* functional template */
    const __vue_is_functional_template__$j = false;
    /* style inject */
    
    /* style inject SSR */
    

    
    var Loading = __vue_normalize____default["default"](
      { render: __vue_render__$j, staticRenderFns: __vue_staticRenderFns__$j },
      __vue_inject_styles__$j,
      __vue_script__$j,
      __vue_scope_id__$j,
      __vue_is_functional_template__$j,
      __vue_module_identifier__$j,
      undefined,
      undefined
    );

  Loading.install = function (Vue) {
    Vue.component(Loading.name, Loading);
  };

  //
  var BUTTON_SIZE = ['normal', 'small', 'mini'];
  var BUTTON_TYPE = ['default', 'primary', 'danger', 'info', 'warning', 'success'];
  var BUTTON_NATIVE_TYPE = ['submit', 'button', 'reset'];
  var BUTTON_SHAPE = ['square', 'round'];
  var script$i = {
    name: 'OmiButton',
    props: {
      size: {
        type: String,
        validator: function validator(value) {
          return oneOf(value, BUTTON_SIZE);
        },
        default: 'normal'
      },
      nativeType: {
        type: String,
        validator: function validator(value) {
          return oneOf(value, BUTTON_NATIVE_TYPE);
        },
        default: 'button'
      },
      type: {
        type: String,
        validator: function validator(value) {
          return oneOf(value, BUTTON_TYPE);
        },
        default: 'primary'
      },
      block: {
        type: Boolean,
        default: false
      },
      text: {
        type: String,
        default: ''
      },
      loadingText: {
        type: String,
        default: ''
      },
      round: {
        type: Boolean,
        default: false
      },
      disabled: {
        type: Boolean,
        default: false
      },
      loading: {
        type: Boolean,
        default: false
      }
    },
    components: {
      Loading: Loading
    },
    computed: {
      showLoadingText: function showLoadingText() {
        return this.loading && this.loadingText;
      },
      typeClassesMap: function typeClassesMap() {
        return createClassMap('omi-btn__', BUTTON_TYPE);
      },
      sizeClassesMap: function sizeClassesMap() {
        return createClassMap('omi-btn__', BUTTON_SIZE);
      },
      shapeClassesMap: function shapeClassesMap() {
        return createClassMap('omi-btn__', BUTTON_SHAPE);
      },
      buttonClass: function buttonClass() {
        var type = this.type,
            size = this.size,
            typeClassesMap = this.typeClassesMap,
            sizeClassesMap = this.sizeClassesMap,
            shapeClassesMap = this.shapeClassesMap,
            block = this.block,
            disabled = this.disabled;
        var square = BUTTON_SHAPE[0],
            round = BUTTON_SHAPE[1];
        var shape = this.round ? round : square;
        var typeClass = typeClassesMap ? typeClassesMap[type] : null;
        var sizeClass = sizeClassesMap ? sizeClassesMap[size] : null;
        var shapeClass = shapeClassesMap ? shapeClassesMap[shape] : null;
        var blockClass = block ? 'omi-btn__block' : null;
        var disabledClass = disabled ? 'omi-btn__disable' : null;
        return [typeClass, sizeClass, shapeClass, blockClass, disabledClass];
      }
    }
  };

  /* script */
  const __vue_script__$i = script$i;

  /* template */
  var __vue_render__$i = function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c(
      "button",
      _vm._g(
        {
          staticClass: "omi-btn",
          class: _vm.buttonClass,
          attrs: { disabled: _vm.disabled, type: _vm.nativeType }
        },
        _vm.$listeners
      ),
      [
        _c("loading", {
          directives: [
            {
              name: "show",
              rawName: "v-show",
              value: _vm.loading,
              expression: "loading"
            }
          ],
          staticClass: "omi-btn__loading",
          attrs: { size: "20" }
        }),
        _vm._v(" "),
        _vm.showLoadingText
          ? _c("span", { staticClass: "omi-btn__text" }, [
              _vm._v(_vm._s(_vm.loadingText))
            ])
          : _c(
              "span",
              { staticClass: "omi-btn__text" },
              [
                _vm._t("default", function() {
                  return [_vm._v(_vm._s(_vm.text))]
                })
              ],
              2
            )
      ],
      1
    )
  };
  var __vue_staticRenderFns__$i = [];
  __vue_render__$i._withStripped = true;

    /* style */
    const __vue_inject_styles__$i = undefined;
    /* scoped */
    const __vue_scope_id__$i = undefined;
    /* module identifier */
    const __vue_module_identifier__$i = undefined;
    /* functional template */
    const __vue_is_functional_template__$i = false;
    /* style inject */
    
    /* style inject SSR */
    

    
    var Button = __vue_normalize____default["default"](
      { render: __vue_render__$i, staticRenderFns: __vue_staticRenderFns__$i },
      __vue_inject_styles__$i,
      __vue_script__$i,
      __vue_scope_id__$i,
      __vue_is_functional_template__$i,
      __vue_module_identifier__$i,
      undefined,
      undefined
    );

  Button.install = function (Vue) {
    Vue.component(Button.name, Button);
  };

  var inject = function inject(parentKey, unbindParent) {
    var _inject;

    return {
      inject: (_inject = {}, _inject[parentKey] = {
        default: null
      }, _inject),
      computed: {
        parent: function parent() {
          if (unbindParent && this[unbindParent]) return null;
          return this[parentKey];
        }
      },
      mounted: function mounted() {
        if (this.parent) this.parent.addChild(this);
      },
      beforeDestroy: function beforeDestroy() {
        if (this.parent) this.parent.removeChild(this);
      }
    };
  };

  var injectMixin = inject;

  function createMixin(_ref) {
    var type = _ref.type,
        classPrefix = _ref.classPrefix,
        checkParent = _ref.checkParent,
        unbindParent = _ref.unbindParent;
    return {
      mixins: [injectMixin(checkParent, unbindParent)],
      watch: {
        value: function value(_value) {
          this.$emit('change', _value);
        }
      },
      props: {
        activeColor: {
          type: String,
          default: null
        },
        disable: {
          type: Boolean,
          default: false
        },
        prop: {
          type: [String, Number, Boolean],
          default: null
        },
        value: {
          type: Boolean,
          default: false
        },
        text: {
          type: String,
          default: ''
        },
        size: {
          type: [String, Number],
          default: null
        },
        square: {
          type: Boolean,
          default: false
        }
      },
      methods: {
        getSlots: function getSlots(slotName) {
          return this.$slots[slotName];
        },
        createClass: function createClass(name) {
          return "" + classPrefix + name;
        },
        onClick: function onClick(e) {
          e.stopPropagation();
          if (this.isDisabled) return;
          this.check();
        },

        /**
         * @vue2doc-exposed-api:check
         * @param {Boolean}
         */
        check: function check(isChecked) {
          var _this = this;

          if (isChecked === void 0) {
            isChecked = !this.isChecked;
          }

          clearTimeout(this.timer);
          this.timer = setTimeout(function () {
            _this.isChecked = isChecked;
          });
        },
        getCheckIcon: function getCheckIcon() {
          var h = this.$createElement;
          var defaultIcon = h("div", {
            "class": this.innerClasses,
            "style": this.innerStyles
          }, [h(Icon, {
            "attrs": {
              "type": "right"
            }
          })]);
          return this.getSlots('icon') || defaultIcon;
        }
      },
      computed: {
        innerStyles: function innerStyles() {
          var color = this.customColor;
          return "background-color: " + color;
        },
        customColor: function customColor() {
          var isDisabled = this.isDisabled,
              activeColor = this.activeColor,
              isChecked = this.isChecked,
              parent = this.parent;
          var color = activeColor || parent && parent.activeColor;
          if (color && isChecked && !isDisabled) return color;
          return null;
        },
        inputClasses: function inputClasses() {
          var _ref2;

          var square = this.square,
              isChecked = this.isChecked;
          var checkedClass = this.createClass('__checked');
          var squareClass = this.createClass('__square');
          var inputClass = this.createClass('__input');
          return _ref2 = {}, _ref2[inputClass] = true, _ref2[checkedClass] = isChecked, _ref2[squareClass] = square, _ref2;
        },
        innerClasses: function innerClasses() {
          var innerClass = this.createClass('__inner');
          return ['omi-icon__wrapper', innerClass];
        },
        wrapperClasses: function wrapperClasses() {
          var isDisabled = this.isDisabled;
          var disableClass = isDisabled ? 'omi-check__disable' : null;
          return [classPrefix, disableClass];
        },
        inputStyles: function inputStyles() {
          var _getSizeString = getSizeString(this.size),
              size = _getSizeString[0];

          var customColor = this.customColor;
          if (size) return "font-size:" + size + "px; border-color: " + customColor;
          return null;
        },
        tabindex: function tabindex() {
          if (this.isDisabled || type === 'radio' && !this.isChecked) {
            return -1;
          }

          return 0;
        },
        isDisabled: function isDisabled() {
          var disable = this.disable,
              parent = this.parent;
          return disable || parent && parent.disable;
        },
        isChecked: {
          get: function get() {
            if (this.parent) {
              return this.parent.isChecked(this.prop);
            }

            return this.value;
          },
          set: function set(isCheck) {
            var parent = this.parent;
            this.$emit('input', isCheck);

            if (parent) {
              this.parent.toggle(isCheck, this.prop);
            }
          }
        }
      },
      beforeDestroy: function beforeDestroy() {
        if (this.timer) clearTimeout(this.timer);
      },
      render: function render() {
        var h = arguments[0];
        var text = this.text;
        return h("div", {
          "attrs": {
            "role": type,
            "aria-checked": this.isChecked,
            "tabindex": this.tabindex
          },
          "class": this.wrapperClasses,
          "on": {
            "click": this.onClick
          }
        }, [h("div", {
          "class": this.inputClasses,
          "style": this.inputStyles
        }, [this.getCheckIcon()]), h("div", {
          "class": classPrefix + "__text"
        }, [this.getSlots('default') || text && h("span", [text])])]);
      }
    };
  }

  var CheckBox = function CheckBox() {
    return {
      name: 'OmiCheckbox',
      mixins: [createMixin({
        type: 'checkbox',
        classPrefix: 'omi-checkbox',
        checkParent: 'omiCheckGroup',
        unbindParent: 'indeterminate'
      })],
      props: {
        indeterminate: {
          type: Boolean,
          default: false
        }
      }
    };
  };

  var CheckBox$1 = CheckBox();

  CheckBox$1.install = function (Vue) {
    Vue.component(CheckBox$1.name, CheckBox$1);
  };

  var groupMxin = {
    props: {
      disable: {
        type: Boolean,
        default: false
      },
      horizontal: {
        type: Boolean,
        default: false
      },
      value: {
        type: Array,
        default: function _default() {
          return [];
        }
      },
      activeColor: {
        type: String,
        default: null
      }
    }
  };

  var getChildIndex = function getChildIndex(children, child) {
    return children.indexOf(child);
  };

  var provider = function provider(parentKey) {
    return {
      provide: function provide() {
        var _ref;

        return _ref = {}, _ref[parentKey] = this, _ref;
      },
      data: function data() {
        return {
          children: []
        };
      },
      methods: {
        addChild: function addChild(child) {
          if (getChildIndex(this.children, child) === -1) this.children.push(child);
        },
        removeChild: function removeChild(child) {
          var children = this.children;
          var childIndex = getChildIndex(children, child);

          if (childIndex > -1) {
            this.children.splice(childIndex, 1);
          }
        }
      }
    };
  };

  var providerMixin = provider;

  //
  var script$h = {
    name: 'OmiCheckboxGroup',
    mixins: [groupMxin, providerMixin('omiCheckGroup')],
    data: function data() {
      return {
        children: []
      };
    },
    props: {
      max: {
        type: [String, Number],
        default: -1
      }
    },
    watch: {
      value: function value(_value) {
        this.$emit('change', _value);
      }
    },
    methods: {
      toggle: function toggle(isCheck, value) {
        var index = this.getValueIndex(value);
        var model = [].concat(this.value);

        if (isCheck) {
          var max = this.max;
          if (this.value.length >= max && max >= 0) return;
          if (index === -1) model.push(value);
        } else if (isCheck === false) {
          if (index >= 0) model.splice(index, 1);
        }

        this.$emit('input', model);
      },
      getValueIndex: function getValueIndex(value) {
        return this.value.indexOf(value);
      },
      toggleAll: function toggleAll(isCheck) {
        if (isCheck === void 0) {
          isCheck = null;
        }

        if (isCheck === false) {
          this.$emit('input', []);
          return;
        }

        var children = this.children;
        var max = this.max; // toggle

        if (isCheck === null) {
          children = children.filter(function (child) {
            return !child.isChecked;
          });
        }

        if (max >= 0 && children.length > max) {
          children = children.slice(0, max);
        }

        var model = children.map(function (child) {
          return child.prop;
        });
        this.$emit('input', model);
      },
      isChecked: function isChecked(value) {
        return this.getValueIndex(value) >= 0;
      }
    }
  };

  /* script */
  const __vue_script__$h = script$h;

  /* template */
  var __vue_render__$h = function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c(
      "div",
      {
        staticClass: "omi-checkbox-group",
        class: { "omi-checkbox-horizontal": _vm.horizontal }
      },
      [_vm._t("default")],
      2
    )
  };
  var __vue_staticRenderFns__$h = [];
  __vue_render__$h._withStripped = true;

    /* style */
    const __vue_inject_styles__$h = undefined;
    /* scoped */
    const __vue_scope_id__$h = undefined;
    /* module identifier */
    const __vue_module_identifier__$h = undefined;
    /* functional template */
    const __vue_is_functional_template__$h = false;
    /* style inject */
    
    /* style inject SSR */
    

    
    var CheckboxGroup = __vue_normalize____default["default"](
      { render: __vue_render__$h, staticRenderFns: __vue_staticRenderFns__$h },
      __vue_inject_styles__$h,
      __vue_script__$h,
      __vue_scope_id__$h,
      __vue_is_functional_template__$h,
      __vue_module_identifier__$h,
      undefined,
      undefined
    );

  CheckboxGroup.install = function (Vue) {
    Vue.component(CheckboxGroup.name, CheckboxGroup);
  };

  var Radio = function Radio() {
    return {
      name: 'OmiRadio',
      mixins: [createMixin({
        type: 'radio',
        classPrefix: 'omi-radio',
        checkParent: 'omiRadioGroup',
        unbindParent: 'indeterminate'
      })]
    };
  };

  var Radio$1 = Radio();

  Radio$1.install = function (Vue) {
    Vue.component(Radio$1.name, Radio$1);
  };

  //
  var script$g = {
    name: 'OmiRadioGroup',
    mixins: [groupMxin, providerMixin('omiRadioGroup')],
    // provide() {
    //   return {
    //     omiRadioGroup: this,
    //   };
    // },
    props: {
      value: {
        type: [String, Number, Boolean],
        default: null
      }
    },
    watch: {
      value: function value(_value) {
        this.$emit('change', _value);
      }
    },
    methods: {
      isChecked: function isChecked(value) {
        return value === this.value;
      },
      toggle: function toggle(checked, prop) {
        if (checked === false || prop === this.vlue) return;
        this.$emit('input', prop);
      }
    }
  };

  /* script */
  const __vue_script__$g = script$g;

  /* template */
  var __vue_render__$g = function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c(
      "div",
      {
        staticClass: "omi-radio-group",
        class: { "omi-checkbox-horizontal": _vm.horizontal }
      },
      [_vm._t("default")],
      2
    )
  };
  var __vue_staticRenderFns__$g = [];
  __vue_render__$g._withStripped = true;

    /* style */
    const __vue_inject_styles__$g = undefined;
    /* scoped */
    const __vue_scope_id__$g = undefined;
    /* module identifier */
    const __vue_module_identifier__$g = undefined;
    /* functional template */
    const __vue_is_functional_template__$g = false;
    /* style inject */
    
    /* style inject SSR */
    

    
    var RadioGroup = __vue_normalize____default["default"](
      { render: __vue_render__$g, staticRenderFns: __vue_staticRenderFns__$g },
      __vue_inject_styles__$g,
      __vue_script__$g,
      __vue_scope_id__$g,
      __vue_is_functional_template__$g,
      __vue_module_identifier__$g,
      undefined,
      undefined
    );

  RadioGroup.install = function (Vue) {
    Vue.component(RadioGroup.name, RadioGroup);
  };

  //
  var STROKE_LINECAP = ['butt', 'round', 'square'];
  var STROKE_DEFAULT_WIDTH = 40;
  var BASE_SIZE = 800;
  var DEFAULT_RADIUS = 40;
  var DEFAULT_TRANSITION = 'ease';
  var DEFAULT_DURATION$3 = '.3s';
  var MAX_DEFAULT = 100;
  var CX = 400;
  var uid = 0;
  var script$f = {
    name: 'OmiCircle',
    props: {
      circleRadius: {
        type: Number,
        default: DEFAULT_RADIUS
      },
      strokeWidth: {
        type: [Number, String],
        default: STROKE_DEFAULT_WIDTH
      },
      strokeColor: {
        type: [String, Object],
        default: null
      },
      clockwise: {
        type: Boolean,
        default: true
      },
      percentage: {
        type: [String, Number],
        default: 0
      },
      max: {
        type: Number,
        default: MAX_DEFAULT,
        validator: function validator(value) {
          return value <= 100;
        }
      },
      text: {
        type: String,
        default: null
      },
      strokeLinecap: {
        type: String,
        validator: function validator(value) {
          return oneOf(value, STROKE_LINECAP);
        },
        default: null
      },
      transition: {
        type: [Boolean, String],
        default: DEFAULT_TRANSITION
      }
    },
    computed: {
      // 周长
      perimeter: function perimeter() {
        var PI = Math.PI,
            ceil = Math.ceil;
        return ceil(PI * 800);
      },
      // 直径
      diameter: function diameter() {
        return this.circleRadius * 2;
      },
      isGradient: function isGradient() {
        return isObject(this.strokeColor);
      },
      customColor: function customColor() {
        if (!this.isGradient) return this.strokeColor;
        return "url(#" + this.gradientId + ")";
      },
      wrapperStyles: function wrapperStyles() {
        var diameter = this.diameter;
        return "height: " + diameter + "px; width: " + diameter + "px";
      },
      baseStyle: function baseStyle() {
        return "stroke-width: " + this.sizeString + "px;";
      },
      formatPercentage: function formatPercentage() {
        var max = this.max;
        var result = Math.ceil(this.percentage * 1);
        return result > max ? max : result;
      },
      perimeterRate: function perimeterRate() {
        var perimeter = this.perimeter,
            max = this.max;
        var percentage = this.formatPercentage;
        if (percentage > max) return null;
        var ceil = Math.ceil;
        var result = ceil(percentage / 100 * perimeter);
        return result;
      },
      layStyle: function layStyle() {
        var sizeString = this.sizeString,
            customColor = this.customColor,
            perimeter = this.perimeter,
            perimeterRate = this.perimeterRate,
            transition = this.transition,
            strokeLinecap = this.strokeLinecap;
        var animate = transition ? "transition: stroke-dasharray " + DEFAULT_DURATION$3 + " " + transition + ";" : null;
        var dashArray = perimeterRate + "px " + perimeter + "px";
        var linecap = strokeLinecap ? "stroke-linecap: " + strokeLinecap + ";" : null;
        return "\n        stroke-width: " + (sizeString * 1 + 1) + "px;\n        stroke: " + customColor + ";\n        stroke-dasharray: " + dashArray + "; " + animate + ";\n        " + linecap + "\n      ";
      },
      sizeString: function sizeString() {
        var _getSizeString = getSizeString(this.strokeWidth),
            size = _getSizeString[0];

        return size;
      },
      baseSize: function baseSize() {
        var sizeString = this.sizeString;
        var size = BASE_SIZE + sizeString * 1;
        return size;
      },
      viewBox: function viewBox() {
        var baseSize = this.baseSize;
        return "0 0 " + baseSize + " " + baseSize;
      },
      getPath: function getPath() {
        var baseSize = this.baseSize,
            clockwise = this.clockwise;
        var isClockWise = clockwise ? 1 : 0;
        return "M " + baseSize / 2 + " " + baseSize / 2 + " m 0 -" + CX + " a " + CX + " " + CX + " 0 1 " + isClockWise + " 0, " + CX * 2 + " a " + CX + " " + CX + " 0 1 " + isClockWise + " 0, -" + CX * 2;
      }
    },
    created: function created() {
      uid += 1;
      this.gradientId = "omi-circle__gradient-" + uid;
    }
  };

  /* script */
  const __vue_script__$f = script$f;

  /* template */
  var __vue_render__$f = function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c("div", { staticClass: "omi-circle" }, [
      _c(
        "div",
        { staticClass: "omi-circle__wrapper", style: _vm.wrapperStyles },
        [
          _c("svg", { attrs: { viewBox: _vm.viewBox } }, [
            _vm.isGradient
              ? _c(
                  "defs",
                  [
                    _c(
                      "linearGradient",
                      {
                        attrs: {
                          id: _vm.gradientId,
                          x1: "0%",
                          y1: "0%",
                          x2: "100%",
                          y2: "0%"
                        }
                      },
                      _vm._l(_vm.strokeColor, function(color, rate, index) {
                        return _c("stop", {
                          key: index,
                          attrs: { offset: rate, "stop-color": color }
                        })
                      }),
                      1
                    )
                  ],
                  1
                )
              : _vm._e(),
            _vm._v(" "),
            _c("path", {
              staticClass: "omi-circle__base",
              style: _vm.baseStyle,
              attrs: { d: _vm.getPath }
            }),
            _vm._v(" "),
            _c("path", {
              staticClass: "omi-circle__stroke",
              style: _vm.layStyle,
              attrs: { d: _vm.getPath }
            })
          ]),
          _vm._v(" "),
          _vm._t("default", function() {
            return [
              _vm.text
                ? _c("div", { staticClass: "omi-cirecle__text" }, [
                    _vm._v(_vm._s(_vm.text))
                  ])
                : _c("div", { staticClass: "omi-cirecle__text" }, [
                    _vm._v(_vm._s(_vm.formatPercentage) + "%")
                  ])
            ]
          })
        ],
        2
      )
    ])
  };
  var __vue_staticRenderFns__$f = [];
  __vue_render__$f._withStripped = true;

    /* style */
    const __vue_inject_styles__$f = undefined;
    /* scoped */
    const __vue_scope_id__$f = undefined;
    /* module identifier */
    const __vue_module_identifier__$f = undefined;
    /* functional template */
    const __vue_is_functional_template__$f = false;
    /* style inject */
    
    /* style inject SSR */
    

    
    var Circle = __vue_normalize____default["default"](
      { render: __vue_render__$f, staticRenderFns: __vue_staticRenderFns__$f },
      __vue_inject_styles__$f,
      __vue_script__$f,
      __vue_scope_id__$f,
      __vue_is_functional_template__$f,
      __vue_module_identifier__$f,
      undefined,
      undefined
    );

  Circle.install = function (Vue) {
    Vue.component(Circle.name, Circle);
  };

  //
  var LOADING_SIZE = 12;
  var script$e = {
    name: 'OmiSwitch',
    props: {
      size: {
        type: Number,
        default: null
      },
      value: {
        type: Boolean,
        default: false
      },
      activeColor: {
        type: String,
        default: null
      },
      loading: {
        type: Boolean,
        default: false
      },
      loadingSize: {
        type: Number,
        default: LOADING_SIZE
      },
      disable: {
        type: Boolean,
        default: false
      }
    },
    components: {
      Loading: Loading
    },
    methods: {
      onClick: function onClick() {
        var disable = this.disable,
            value = this.value;
        if (disable) return;
        this.$emit('input', !value);
      }
    },
    computed: {
      swithClasses: function swithClasses() {
        var value = this.value,
            disable = this.disable;
        return {
          'omi-switch__checked': value,
          'omi-switch__disable': disable
        };
      },
      switchStyle: function switchStyle() {
        var value = this.value;
        var translateX = value ? '100%' : '0';
        return "transform: translateX(" + translateX + ")";
      },
      wrapperStyles: function wrapperStyles() {
        var value = this.value,
            activeColor = this.activeColor,
            size = this.size;
        var styles = {
          fontSize: size + "px"
        };
        if (value && activeColor) styles.backgroundColor = activeColor;
        return styles;
      }
    }
  };

  /* script */
  const __vue_script__$e = script$e;
  /* template */
  var __vue_render__$e = function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c(
      "div",
      {
        staticClass: "omi-switch",
        class: _vm.swithClasses,
        style: _vm.wrapperStyles,
        attrs: { role: "switch", "aria-checked": _vm.value },
        on: { click: _vm.onClick }
      },
      [
        _c(
          "div",
          { staticClass: "omi-switch__node", style: _vm.switchStyle },
          [
            _c("loading", {
              directives: [
                {
                  name: "show",
                  rawName: "v-show",
                  value: _vm.loading,
                  expression: "loading"
                }
              ],
              attrs: { size: _vm.loadingSize }
            })
          ],
          1
        )
      ]
    )
  };
  var __vue_staticRenderFns__$e = [];
  __vue_render__$e._withStripped = true;

    /* style */
    const __vue_inject_styles__$e = undefined;
    /* scoped */
    const __vue_scope_id__$e = undefined;
    /* module identifier */
    const __vue_module_identifier__$e = undefined;
    /* functional template */
    const __vue_is_functional_template__$e = false;
    /* style inject */
    
    /* style inject SSR */
    

    
    var Switch = __vue_normalize____default["default"](
      { render: __vue_render__$e, staticRenderFns: __vue_staticRenderFns__$e },
      __vue_inject_styles__$e,
      __vue_script__$e,
      __vue_scope_id__$e,
      __vue_is_functional_template__$e,
      __vue_module_identifier__$e,
      undefined,
      undefined
    );

  Switch.install = function (Vue) {
    Vue.component(Switch.name, Switch);
  };

  var toastType = ['success', 'loading', 'error', 'text', 'html'];

  var TOAST_ZINDEX_BASE = 2000;
  var TOAST_DEFUALT_TYPE = 'text';

  var Toast$2 = function Toast() {
    return {
      name: 'OmiToast',
      data: function data() {
        return {
          zIndex: 0
        };
      },
      watch: {
        noScroll: {
          handler: 'preventScroll',
          immediate: true
        },
        value: {
          handler: 'preventScroll',
          immediate: true
        }
      },
      props: {
        clickClose: {
          type: Boolean,
          default: false
        },
        noScroll: {
          type: Boolean,
          default: true
        },
        icon: {
          type: String,
          default: null
        },
        content: {
          type: String,
          default: ''
        },
        value: {
          type: Boolean,
          default: false
        },
        baseZindex: {
          type: Number,
          default: TOAST_ZINDEX_BASE
        },
        type: {
          type: String,
          default: TOAST_DEFUALT_TYPE,
          validator: function validator(value) {
            return oneOf(value, toastType);
          }
        }
      },
      methods: {
        preventScroll: function preventScroll() {
          var noScroll = this.noScroll,
              value = this.value;
          this.$nextTick(function () {
            if (noScroll && value) {
              document.body.classList.add('omi-toast__noscroll');
            } else {
              document.body.classList.remove('omi-toast__noscroll');
            }
          });
        },
        setZindex: function setZindex(value) {
          if (value === void 0) {
            value = 0;
          }

          this.zIndex = value + this.baseZindex;
        },
        getIcon: function getIcon() {
          var h = this.$createElement;
          var type = this.type,
              icon = this.icon;

          if (type === 'loading') {
            return h(Loading, {
              "attrs": {
                "size": 24,
                "spinner": true
              }
            });
          }

          if (icon) return h(Icon, {
            "attrs": {
              "type": icon
            }
          });
          var iconType = null;
          if (type === 'error') iconType = 'close';
          if (type === 'success') iconType = 'right';
          if (iconType) return h(Icon, {
            "attrs": {
              "type": iconType
            }
          });
          return null;
        },
        getText: function getText() {
          var h = this.$createElement;
          var content = this.content,
              type = this.type;

          if (type === 'html') {
            return h("div", {
              "class": "omi-toast__text",
              "domProps": {
                "innerHTML": content
              }
            });
          }

          if (content) {
            return h("span", {
              "class": "omi-toast__text"
            }, [this.content]);
          }

          return null;
        },
        onAfterEnter: function onAfterEnter() {
          if (isFunction(this.onOpen)) this.onOpen();
        },
        onAfterLeave: function onAfterLeave() {
          this.onClose();
        },
        onClick: function onClick() {
          if (this.clickClose) this.$emit('input', false);
        }
      },
      computed: {
        getZindex: function getZindex() {
          return "z-index: " + this.zIndex;
        },
        wrapperClasses: function wrapperClasses() {
          var type = this.type;
          if (type === 'text' || type === 'html') return 'omi-toast_custom';
          return null;
        }
      },
      render: function render() {
        var h = arguments[0];
        return h("transition", {
          "attrs": {
            "name": "fade-in",
            "appear": true
          },
          "on": {
            "afterEnter": this.onAfterEnter,
            "afterLeave": this.onAfterLeave
          }
        }, [h("div", {
          "class": ['omi-toast', this.wrapperClasses],
          "directives": [{
            name: "show",
            value: this.value
          }],
          "style": this.getZindex,
          "on": {
            "click": this.onClick
          }
        }, [this.getIcon(), this.getText()])]);
      }
    };
  };

  var VueToast = Toast$2();

  /**
   * requestAnimationFrame polyfill
   */
  var pre = Date.now();

  function fallback(fn) {
    var cur = Date.now();
    var remeaining = Math.max(0, 16 - (cur - pre));
    var timer = setTimeout(fn, remeaining);
    pre = cur + remeaining;
    return timer;
  }

  var root = {};

  if (typeof window !== 'undefined') {
    root = window;
  }

  var raf = root.requestAnimationFrame || fallback;
  var cancel = root.cancelAnimationFrame || root.clearTimeout;
  function requestAnimation(fn) {
    return raf.call(root, fn);
  }
  function cancelAnimation(id) {
    return cancel.call(root, id);
  }
  function doubleAnimation(fn) {
    requestAnimation(function () {
      requestAnimation(fn);
    });
  }

  var isServer = typeof window === 'undefined';
  var supportsPassive = false;

  if (!isServer) {
    try {
      var opts = {};
      Object.defineProperty(opts, 'passive', {
        // eslint-disable-next-line getter-return
        get: function get() {
          /* istanbul ignore next */
          supportsPassive = true;
        }
      });
      window.addEventListener('test-passive', null, opts); // eslint-disable-next-line no-empty
    } catch (e) {}
  }

  var animateId;
  function scrollLeft(el, distance, duration) {
    cancelAnimation(animateId);
    var frames = duration ? Math.round(duration / 1000 * 1000 / 16) : 1;
    var n = 0;

    var run = function run() {
      el.scrollLeft += distance / frames;

      if (n < frames) {
        n += 1;
        animateId = requestAnimation(run);
      }
    };

    run();
  }
  function removeElement(ele) {
    if (!ele) return;
    ele.remove();
  }
  function on(target, event, handler, passive) {
    if (passive === void 0) {
      passive = true;
    }

    var option = false;

    if (supportsPassive) {
      option = {
        capture: false,
        passive: passive
      };
    }

    target.addEventListener(event, handler, option);
  }
  function off(target, event, handler) {
    if (isServer) return;
    target.removeEventListener(event, handler);
  }
  function preventDefault(e) {
    if (typeof e.cancelable !== 'boolean' || e.cancelable) e.preventDefault();
    e.stopPropagation();
  }
  function getScroller(el, root) {
    if (root === void 0) {
      root = window;
    }

    var scollRe = /scroll|auto/i;
    var node = el;

    while (node && node !== root && node.tagName !== 'HTML' && node.nodeType === 1) {
      var _window$getComputedSt = window.getComputedStyle(node),
          overflowY = _window$getComputedSt.overflowY;

      if (scollRe.test(overflowY)) {
        if (node.tagName !== 'BODY') return node;

        var _window$getComputedSt2 = window.getComputedStyle(node.parentNode),
            htmlEleFlowY = _window$getComputedSt2.overflowY;

        if (scollRe.test(htmlEleFlowY)) return node;
      }

      node = node.parent;
    }

    return root;
  }
  function getScrollTop(el) {
    return 'scrollTop' in el ? el.scrollTop : el.pageYOffset;
  }
  function getBoundingClientRect(el) {
    var rect = null;
    if (!el) return rect;

    if (el.getBoundingClientRect) {
      rect = el.getBoundingClientRect();
    } else {
      rect = {
        top: 0,
        bottom: el.innerHeight
      };
    }

    return rect;
  }
  function getRootPageYOffset() {
    return window.pageYOffset || document.body.scrollTop || document.documentElement.scrollTop || 0;
  }

  function _extends$e() { _extends$e = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$e.apply(this, arguments); }

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

    var DEFAULT_OPTION = _extends$e({}, defaultOption);

    var stack = [];

    var customOptions = _extends$e({}, DEFAULT_OPTION);

    var typeOtionCache = {};
    var isSingle = true;
    var zIndex = 0;

    function create() {
      var el = document.createElement('div');
      var vueInstance = new (Vue__default["default"].extend(VueComponent))({
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
        if (!isSingle && !isServer$1()) {
          stack = stack.filter(function (item) {
            return item !== instance;
          });
          instance.$destroy();
          removeElement(instance.$el);
        }
      };

      factory.setOptions = function (type, opt) {
        if (isObject(type)) {
          customOptions = _extends$e({}, customOptions, type);
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

  function _extends$d() { _extends$d = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$d.apply(this, arguments); }
  var DEFAULT_OPTION$2 = {
    type: 'text',
    icon: '',
    content: '',
    durations: 2000,
    clickClose: false,
    noScroll: true,
    onClose: function onClose() {},
    onOpen: function onOpen() {}
  };

  function getOption$1(opt) {
    if (isObject(opt)) return opt;
    if (isString(opt)) return {
      content: opt
    };
    return {
      contente: ''
    };
  }

  var creator$2 = createInstance({
    VueComponent: VueToast,
    defaultOption: DEFAULT_OPTION$2,
    replacement: false,
    appendToBody: true
  });
  var Toast = creator$2(function (getInstance, customOptions, typeOtionCache, zIndex) {
    return function (opt) {
      if (isServer$1) return {};
      var toast = getInstance();
      var type = opt.type || customOptions.type;

      var option = _extends$d({}, customOptions, typeOtionCache[type], getOption$1(opt));

      Object.assign(toast, option);

      if (!isFunction(toast.close)) {
        toast.close = function () {
          Object.assign(toast, {
            value: false
          });
        };
      }

      if (!isFunction(toast.onClose)) {
        toast.onClose = function () {
          clearTimeout(toast.timer);
          Toast.removeInstance(toast);
        };
      }

      Object.assign(toast, {
        value: true
      });
      toast.setZindex(zIndex);
      if (toast.timer) clearTimeout(toast.timer);
      var durations = option.durations;

      if (durations > 0) {
        toast.timer = setTimeout(function () {
          clearTimeout(toast.timer);
          toast.close();
        }, durations);
      }

      return toast;
    };
  });
  toastType.forEach(function (method) {
    Toast[method] = function (opt) {
      var option = _extends$d({
        type: method
      }, getOption$1(opt));

      return Toast(option);
    };
  });
  Toast.Component = VueToast;
  var Toast$1 = Toast;

  Toast$1.install = function (Vue) {
    Vue.prototype.$toast = Toast$1;
    Vue.component(Toast$1.Component.name, Toast$1);
  };

  //
  //
  //
  //
  //
  //
  var script$d = {
    name: 'OmiCollapse',
    data: function data() {
      return {
        children: []
      };
    },
    provide: function provide() {
      return {
        parent: this
      };
    },
    props: {
      value: {
        type: Array,
        default: function _default() {
          return [];
        }
      },
      accordion: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      hasName: function hasName(name) {
        return this.value.indexOf(name) > -1;
      },
      open: function open(isOpen, name) {
        var value = this.value,
            accordion = this.accordion;
        var list = [].concat(value);

        if (isOpen) {
          if (!this.hasName(name)) list.push(name);
          if (accordion) list = list.filter(function (item) {
            return item === name;
          });
        } else {
          list = value.filter(function (item) {
            return item !== name;
          });
        }

        this.$emit('input', list);
      }
    }
  };

  /* script */
  const __vue_script__$d = script$d;

  /* template */
  var __vue_render__$d = function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c("div", { staticClass: "omi-collapse" }, [_vm._t("default")], 2)
  };
  var __vue_staticRenderFns__$d = [];
  __vue_render__$d._withStripped = true;

    /* style */
    const __vue_inject_styles__$d = undefined;
    /* scoped */
    const __vue_scope_id__$d = undefined;
    /* module identifier */
    const __vue_module_identifier__$d = undefined;
    /* functional template */
    const __vue_is_functional_template__$d = false;
    /* style inject */
    
    /* style inject SSR */
    

    
    var Collapse = __vue_normalize____default["default"](
      { render: __vue_render__$d, staticRenderFns: __vue_staticRenderFns__$d },
      __vue_inject_styles__$d,
      __vue_script__$d,
      __vue_scope_id__$d,
      __vue_is_functional_template__$d,
      __vue_module_identifier__$d,
      undefined,
      undefined
    );

  Collapse.install = function (Vue) {
    Vue.component(Collapse.name, Collapse);
  };

  //
  var script$c = {
    name: 'OmiCollapseItem',
    inject: {
      parent: {
        default: null
      }
    },
    data: function data() {
      return {
        height: 0
      };
    },
    props: {
      disable: {
        type: Boolean,
        default: false
      },
      title: {
        type: String,
        default: null
      },
      name: {
        type: [String, Number],
        default: null,
        required: true
      }
    },
    components: {
      Cell: Cell
    },
    methods: {
      fold: function fold(el) {
        el.style.height = '0';
      },
      unfold: function unfold(el) {
        el.style.height = this.getHeight() + "px";
      },
      getHeight: function getHeight() {
        var inner = this.$refs.inner;
        return inner.offsetHeight;
      },
      onBeforeEnter: function onBeforeEnter(el) {
        this.fold(el);
      },
      onEnter: function onEnter(el) {
        this.unfold(el);
      },
      onAfterEnter: function onAfterEnter(el) {
        el.style.height = '';
      },
      onBeforeLeave: function onBeforeLeave(el) {
        this.unfold(el);
      },
      onLeave: function onLeave(el) {
        var _this = this;

        doubleAnimation(function () {
          _this.fold(el);
        });
      },
      onClick: throttle(function () {
        var opened = this.opened,
            disable = this.disable;
        if (disable) return;
        this.opened = !opened;
      })
    },
    computed: {
      wrapperHeight: function wrapperHeight() {
        var inner = this.$refs.inner;
        return inner.offsetHeight;
      },
      wrapperClasses: function wrapperClasses() {
        var opened = this.opened,
            disable = this.disable;
        return {
          'omi-collapse-item__open': opened,
          'omi-collapse-item__disable': disable
        };
      },
      opened: {
        get: function get() {
          if (this.parent) {
            return this.parent.hasName(this.name);
          }

          throw new Error('[omi ui]: Cannot find parent in collapse item');
        },
        set: function set(isOpen) {
          this.parent.open(isOpen, this.name);
        }
      }
    },
    created: function created() {
      if (this.parent && this.parent.children) {
        this.parent.children.push(this);
      }
    }
  };

  /* script */
  const __vue_script__$c = script$c;
  /* template */
  var __vue_render__$c = function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c(
      "div",
      {
        staticClass: "omi-collapse-item omi-border__bottom",
        class: _vm.wrapperClasses,
        attrs: { "aria-expanded": String(_vm.opened), tabindex: "0" }
      },
      [
        _c(
          "cell",
          {
            attrs: {
              clickable: !_vm.disable,
              rightArrow: "",
              titleClass: "omi-collapse-item__title"
            },
            on: { click: _vm.onClick }
          },
          [
            _vm._t("title", function() {
              return [
                _c("span", { attrs: { slot: "title" }, slot: "title" }, [
                  _vm._v(_vm._s(_vm.title))
                ])
              ]
            })
          ],
          2
        ),
        _vm._v(" "),
        _c(
          "transition",
          {
            attrs: { name: "collapse" },
            on: {
              beforeEnter: _vm.onBeforeEnter,
              enter: _vm.onEnter,
              afterEnter: _vm.onAfterEnter,
              beforeLeave: _vm.onBeforeLeave,
              leave: _vm.onLeave
            }
          },
          [
            _c(
              "div",
              {
                directives: [
                  {
                    name: "show",
                    rawName: "v-show",
                    value: _vm.opened,
                    expression: "opened"
                  }
                ],
                staticClass: "omi-collapse-item__wrapper"
              },
              [
                _c(
                  "div",
                  { ref: "inner", staticClass: "omi-collapse-item__inner" },
                  [_vm._t("default")],
                  2
                )
              ]
            )
          ]
        )
      ],
      1
    )
  };
  var __vue_staticRenderFns__$c = [];
  __vue_render__$c._withStripped = true;

    /* style */
    const __vue_inject_styles__$c = undefined;
    /* scoped */
    const __vue_scope_id__$c = undefined;
    /* module identifier */
    const __vue_module_identifier__$c = undefined;
    /* functional template */
    const __vue_is_functional_template__$c = false;
    /* style inject */
    
    /* style inject SSR */
    

    
    var CollapseItem = __vue_normalize____default["default"](
      { render: __vue_render__$c, staticRenderFns: __vue_staticRenderFns__$c },
      __vue_inject_styles__$c,
      __vue_script__$c,
      __vue_scope_id__$c,
      __vue_is_functional_template__$c,
      __vue_module_identifier__$c,
      undefined,
      undefined
    );

  CollapseItem.install = function (Vue) {
    Vue.component(CollapseItem.name, CollapseItem);
  };

  var getElement = function getElement(selector) {
    return document.querySelector(selector);
  };

  function portal () {
    return {
      methods: {
        portal: function portal(el, domNode) {
          if (!el) return;
          var container = document.body;
          if (isString(domNode)) container = getElement(domNode);
          container.appendChild(el);
        }
      }
    };
  }

  var overLayProps = {
    show: {
      type: Boolean,
      default: false
    },
    overlayClassName: {
      type: String,
      default: ''
    }
  };
  var overLayProps$1 = overLayProps;

  function _extends$c() { _extends$c = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$c.apply(this, arguments); }

  var OverLay = function OverLay() {
    return {
      name: 'OmiOverlay',
      props: _extends$c({}, overLayProps$1),
      data: function data() {
        return {
          zIndex: 0
        };
      },
      methods: {
        setZindex: function setZindex(zIndex) {
          this.zIndex = zIndex;
        },
        onClick: function onClick() {
          this.$emit('clickOverlay');
        }
      },
      computed: {
        styles: function styles() {
          var zIndex = this.zIndex;
          return {
            zIndex: zIndex
          };
        }
      },
      render: function render() {
        var h = arguments[0];
        if (!this.show) return null;
        return h("transition", {
          "attrs": {
            "name": "fade-in",
            "appear": true
          }
        }, [h("div", {
          "class": ['omi-overlay', this.overlayClassName],
          "style": this.styles,
          "on": {
            "click": this.onClick
          }
        })]);
      }
    };
  };

  var OverLay$1 = OverLay;

  OverLay$1.install = function (Vue) {
    Vue.component(OverLay$1.name, OverLay$1);
  };

  var MINI_DEGREE = 10;

  var getDirection = function getDirection(x, y, degreeThreshold) {
    if (degreeThreshold === void 0) {
      degreeThreshold = MINI_DEGREE;
    }

    var atan = Math.atan,
        PI = Math.PI;
    var degree = atan(y / x) * 180 / PI;
    if (degree > degreeThreshold) return 'vertical';
    if (degree <= degreeThreshold) return 'horizontal';
    return '';
  };

  var abs$1 = Math.abs;
  var touchMixin = {
    data: function data() {
      return {
        startX: 0,
        startY: 0,
        offsetY: 0,
        offsetX: 0,
        moveX: 0,
        // 移动距离带符号
        moveY: 0,
        direction: ''
      };
    },
    methods: {
      touchStart: function touchStart(e) {
        this.resetTouch();
        var _e$touches$ = e.touches[0],
            clientX = _e$touches$.clientX,
            clientY = _e$touches$.clientY;
        this.startX = clientX;
        this.startY = clientY;
      },
      touchMove: function touchMove(e, degree) {
        var _e$touches$2 = e.touches[0],
            clientX = _e$touches$2.clientX,
            clientY = _e$touches$2.clientY;
        this.moveX = clientX - this.startX;
        this.moveY = clientY - this.startY;
        this.offsetX = abs$1(this.moveX);
        this.offsetY = abs$1(this.moveY);
        this.direction = getDirection(this.offsetX, this.offsetY, degree);
      },
      resetTouch: function resetTouch() {
        Object.assign(this, {
          startX: 0,
          startY: 0,
          offsetY: 0,
          offsetX: 0,
          moveX: 0,
          // 移动距离带符号
          moveY: 0,
          direction: ''
        });
      }
    }
  };

  function _extends$b() { _extends$b = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$b.apply(this, arguments); }
  var lockCount = 0;

  var getProps = function getProps(model, props) {
    var result = {};

    for (var key in model) {
      if (Object.prototype.hasOwnProperty.call(props, key)) {
        result[key] = props[key];
      }
    }

    return result;
  };

  var overLayMixin = {
    mixins: [touchMixin],
    props: _extends$b({}, overLayProps$1),
    methods: {
      ontouchMove: function ontouchMove(e) {
        this.touchMove(e);
        var direction = this.direction;
        if (!direction) return;
        var moveY = this.moveY,
            moveX = this.moveX;
        var _this$$el = this.$el,
            scrollHeight = _this$$el.scrollHeight,
            scrollTop = _this$$el.scrollTop,
            offsetHeight = _this$$el.offsetHeight,
            scrollWidth = _this$$el.scrollWidth,
            scrollLeft = _this$$el.scrollLeft,
            offsetWidth = _this$$el.offsetWidth;
        var isVertical = direction === 'vertical';
        var reachTop = false;
        var reachBottom = false;
        var reachLeft = false;
        var reachRight = false;
        if (scrollTop <= 0) reachTop = true;
        if (scrollLeft <= 0) reachLeft = true;
        if (scrollTop + offsetHeight >= scrollHeight) reachBottom = true;
        if (scrollLeft + offsetWidth >= scrollWidth) reachRight = true;

        if (isVertical && (reachTop && moveY > 0 || reachBottom && moveY < 0)) {
          preventDefault(e);
        } else if (!isVertical && (reachLeft && moveX > 0 || reachRight && moveX < 0)) {
          preventDefault(e);
        }
      },
      mountOverlay: function mountOverlay() {
        var _this = this;

        var OverlayConstructor = Vue__default["default"].extend(OverLay$1());
        var el = document.createElement('div');
        var Overlay = new OverlayConstructor({
          el: el
        });
        Object.assign(Overlay, getProps(overLayProps$1, this.$props));
        this.portal(Overlay.$el);
        Overlay.setZindex(this.getZindex);
        Overlay.$on('clickOverlay', function () {
          if (_this.clickClose) {
            _this.close();
          }
        });

        if (this.lockScroll) {
          on(document, 'touchstart', this.touchStart, false);
          on(document, 'touchmove', this.ontouchMove, false);

          if (!lockCount) {
            document.body.classList.add('omi-no-scroll');
          }

          lockCount += 1;
        }

        return Overlay;
      },
      unlockScroll: function unlockScroll() {
        if (this.lockScroll) {
          off(document, 'touchstart', this.onTouchstart);
          off(document, 'touchmove', this.ontouchMove);
          if (lockCount > 0) lockCount -= 1;
          document.body.classList.remove('omi-no-scroll');
        }
      },
      destroyOverlay: function destroyOverlay(overlay, cb) {
        var _this2 = this;

        if (overlay && overlay.$el) {
          overlay.show = false;
          this.$nextTick(function () {
            _this2.unLoadImmediately(overlay);

            cb();
          });
        }

        this.unlockScroll();
      }
    }
  };

  var overlay = null;
  var baseZindex = 1000;
  var popProps = {
    popClose: {
      type: Boolean,
      default: true
    },
    value: {
      type: Boolean,
      default: false
    },
    clickClose: {
      type: Boolean,
      default: true
    },
    lockScroll: {
      type: Boolean,
      default: true
    }
  };
  var seed = 0;
  function popMixin () {
    return {
      mixins: [portal(), overLayMixin],
      props: popProps,
      data: function data() {
        return {
          onBindPopState: false,
          hasRendered: false
        };
      },
      watch: {
        value: function value(open) {
          if (open) {
            this.open();
          } else {
            this.close();
          }
        }
      },
      methods: {
        open: function open() {
          if (!overlay) {
            this.renderOverLay();
          }

          this.portalTo();

          if (!this.onBindPopState && this.popClose) {
            on(window, 'popstate', this.bindPopState);
            this.onBindPopState = true;
          }

          this.hasRendered = true;
        },
        close: function close() {
          if (!this.hasRendered) return;

          if (overlay) {
            this.destroyOverlay(overlay, function () {
              overlay = null;
            });
          }

          this.unbindPopState();
          this.hasRendered = false;
          this.$emit('input', false);
        },
        unLoadImmediately: function unLoadImmediately(target) {
          target.$destroy();
          removeElement(target.$el);
          this.unlockScroll();
        },
        renderOverLay: function renderOverLay() {
          if (this.$isServer) return;

          if (!overlay) {
            overlay = this.mountOverlay();
            seed += 1;
          }

          overlay.show = true;
        },
        portalTo: function portalTo() {
          var _this = this;

          if (this.$isServer) return;
          this.$nextTick(function () {
            _this.portal(_this.$el);
          });
        },
        bindPopState: function bindPopState() {
          if (!this.onBindPopState) return;
          this.unLoadImmediately(this);
          this.unLoadImmediately(overlay);
          overlay = null;
          this.unbindPopState();
        },
        unbindPopState: function unbindPopState() {
          var _this2 = this;

          var $isServer = this.$isServer,
              onBindPopState = this.onBindPopState;
          if ($isServer || !onBindPopState) return;
          this.$nextTick(function () {
            off(window, 'popstate', _this2.bindPopState);
            _this2.onBindPopState = false;
          });
        }
      },
      computed: {
        shouldRender: function shouldRender() {
          return this.value;
        },
        getZindex: function getZindex() {
          return baseZindex + seed;
        }
      },
      mounted: function mounted() {
        if (this.shouldRender) {
          this.open();
        }
      }
    };
  }

  var ActionSheet = function ActionSheet() {
    return {
      name: 'OmiActionSheet',
      mixins: [popMixin()],
      props: {
        className: {
          type: String,
          default: null
        },
        subtitle: {
          type: String,
          default: ''
        },
        safeAreaInsetBottom: {
          type: Boolean,
          default: true
        },
        round: {
          type: Boolean,
          default: false
        },
        title: {
          type: String,
          default: ''
        },
        closeIcon: {
          type: Boolean,
          default: false
        },
        data: {
          type: Array,
          default: function _default() {
            return [];
          }
        },
        closeText: {
          type: String,
          default: ''
        },
        onCancel: {
          type: Function,
          default: null
        },
        loading: {
          type: Boolean,
          default: false
        },
        // loading type
        spinner: {
          type: Boolean,
          default: false
        },
        titleAlign: {
          type: String,
          default: null
        },
        contentAlign: {
          type: String,
          default: null
        }
      },
      methods: {
        handleCancel: function handleCancel(e) {
          var onCancel = this.onCancel;
          if (isFunction(onCancel)) onCancel(e);else this.$emit('input', false);
        },
        onSelect: function onSelect(payload) {
          var _this = this;

          return function () {
            if (payload.disable) return;

            _this.$emit('select', payload);
          };
        },
        getLoadingContent: function getLoadingContent() {
          var h = this.$createElement;
          if (!this.loading) return null;
          return h("div", {
            "class": "omi-action-sheet__loading omi-icon__wrapper"
          }, [h(Loading, {
            "attrs": {
              "spinner": this.spinner
            }
          })]);
        },
        getContent: function getContent() {
          var Slot = this.$slots.default;
          var getDataList = this.getDataList;

          if (Slot) {
            return Slot;
          }

          return getDataList();
        },
        getDataList: function getDataList() {
          var _this2 = this;

          var h = this.$createElement;
          var data = this.data;
          return h("transition", {
            "attrs": {
              "name": "fade-in"
            }
          }, [h("ul", {
            "directives": [{
              name: "show",
              value: !this.loading
            }],
            "class": "omi-action-sheet__list"
          }, [data.map(function (item) {
            var className = item.className,
                content = item.content,
                disable = item.disable;
            var disableClass = disable ? 'omi-action-sheet__item--disable' : null;
            var originClass = ['omi-action-sheet__item', 'omi-border__top'];
            return h("li", {
              "class": [].concat(originClass, [className, disableClass]),
              "style": _this2.contentStyles,
              "on": {
                "click": _this2.onSelect(item)
              }
            }, [content]);
          })])]);
        },
        getCloseButton: function getCloseButton() {
          var h = this.$createElement;
          var closeText = this.closeText;
          if (closeText === '') return null;
          return h("div", {
            "class": "omi-action-sheet__cancel"
          }, [h("div", {
            "class": "omi-action-sheet__cancel--button",
            "on": {
              "click": this.handleCancel
            }
          }, [closeText])]);
        },
        getHeader: function getHeader() {
          var h = this.$createElement;
          if (this.$slots.header) return this.$slots.header;
          var title = null;

          if (this.title) {
            title = h("div", {
              "class": "omi-action-sheet__title--wrapper",
              "style": this.titleStyles
            }, [h("div", {
              "class": "omi-action-sheet__title"
            }, [this.title]), this.subtitle && h("div", {
              "class": "omi-action-sheet__subtitle"
            }, [this.subtitle])]);
          }

          return title;
        },
        getCloseIcon: function getCloseIcon() {
          var h = this.$createElement;
          if (!this.closeIcon) return null;
          return h("div", {
            "class": "omi-action-sheet__close omi-icon__wrapper",
            "on": {
              "click": this.close
            }
          }, [h(Icon, {
            "attrs": {
              "type": "close"
            }
          })]);
        },
        onOpen: function onOpen(e) {
          this.$emit('open', e);
        },
        onclose: function onclose(e) {
          this.$emit('close', e);
        },
        getTextALign: function getTextALign(prop) {
          if (!prop) return null;
          return "text-align: " + prop;
        }
      },
      computed: {
        shouldRenderHeader: function shouldRenderHeader() {
          return this.$slots.header || this.title || this.subtitle || this.$slots['left-icon'];
        },
        contentStyles: function contentStyles() {
          return this.getTextALign(this.contentAlign);
        },
        titleStyles: function titleStyles() {
          return this.getTextALign(this.titleAlign);
        },
        actionStyles: function actionStyles() {
          return "z-index: " + this.getZindex;
        },
        wapperClasses: function wapperClasses() {
          var _ref;

          var safeAreaInsetBottom = this.safeAreaInsetBottom,
              round = this.round,
              className = this.className;
          return _ref = {
            'omi-action-sheet': true,
            'omi-action-sheet__round': round,
            'omi-save-area-inset-bottom': safeAreaInsetBottom
          }, _ref[className] = className, _ref;
        }
      },
      render: function render() {
        var h = arguments[0];
        if (!this.shouldRender) return null;
        return h("transition", {
          "attrs": {
            "name": "slide-in-bottom"
          },
          "on": {
            "afterEnter": this.onOpen,
            "afterLeave": this.onclose
          }
        }, [h("div", {
          "class": this.wapperClasses,
          "style": this.actionStyles
        }, [this.shouldRenderHeader && h("div", {
          "class": "omi-action-sheet__header"
        }, [this.$slots['left-icon'] && h("div", {
          "class": "omi-action-sheet__header--icon"
        }, [this.$slots['left-icon']]), this.getHeader(), this.getCloseIcon()]), h("div", {
          "class": "omi-action-sheet__content"
        }, [this.getLoadingContent(), this.getContent(), this.getCloseButton()])])]);
      }
    };
  };

  var ActionSheet$1 = ActionSheet();

  ActionSheet$1.install = function (Vue) {
    Vue.component(ActionSheet$1.name, ActionSheet$1);
  };

  var dialogType = ['alert', 'confirm', 'prompt'];

  var Dialog$2 = function Dialog() {
    return {
      name: 'OmiDialog',
      mixins: [popMixin()],
      data: function data() {
        return {
          promptField: {
            value: ''
          }
        };
      },
      props: {
        type: {
          type: String,
          defualt: 'alert',
          validator: function validator(value) {
            return oneOf(value, dialogType);
          }
        },
        clickClose: {
          type: Boolean,
          default: false
        },
        title: {
          type: String,
          default: ''
        },
        content: {
          type: String,
          default: ''
        },
        showCancel: {
          type: Boolean,
          default: true
        },
        showConfirm: {
          type: Boolean,
          default: false
        },
        cancelText: {
          type: String,
          default: ''
        },
        confirmText: {
          type: String,
          default: ''
        },
        prompt: {
          type: Object,
          default: function _default() {
            return {
              value: '',
              rules: [],
              placeholder: ''
            };
          }
        }
      },
      watch: {
        prompt: function prompt(fresh, old) {
          if (fresh.value !== old.value) {
            this.promptField.value = fresh.value;
          }
        }
      },
      methods: {
        generateWrapper: function generateWrapper(cls) {
          var h = this.$createElement;

          for (var _len = arguments.length, child = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
            child[_key - 1] = arguments[_key];
          }

          return h("div", {
            "class": cls
          }, [].concat(child));
        },
        getTitle: function getTitle() {
          if (!this.title && !this.$slots.title) return null;
          if (this.$slots.title) this.generateWrapper('omi-dialog__header', this.title);
          return this.generateWrapper('omi-dialog__header', this.title);
        },
        getForm: function getForm() {
          var _this = this;

          var h = this.$createElement;
          return h(Form, {
            "ref": "form",
            "attrs": {
              "models": this.promptField
            }
          }, [h(FormItem, {
            "attrs": {
              "name": "value",
              "rules": this.prompt.rules
            }
          }, [h(Input, {
            "ref": "input",
            "attrs": {
              "value": this.promptField.vaule,
              "placeholder": this.prompt.placeholder
            },
            "on": {
              "input": function input(value) {
                _this.promptField.value = value;
              }
            }
          })])]);
        },
        getContent: function getContent() {
          if (this.$slots.default) return this.generateWrapper('omi-dialog__body', this.$slots.default);
          var contents = [];

          if (this.content) {
            var text = this.generateWrapper('omi-dialog__body--content', this.content);
            contents.push(text);
          }

          if (this.type === 'prompt') {
            var form = this.getForm();
            contents.push(form);
          }

          if (contents.length) return this.generateWrapper('omi-dialog__body', contents);
          return null;
        },
        handleCancel: function handleCancel(e) {
          this.close();
          this.onCancel(e);
        },
        beforeConfirm: function beforeConfirm() {
          var _this2 = this;

          var onConfirm = this.onConfirm;
          var promise = onConfirm.apply(void 0, arguments);

          if (isPromise(promise)) {
            promise.then(function () {
              return _this2.close();
            });
          } else {
            this.close();
          }
        },
        handleConfirm: function handleConfirm(e) {
          var _this3 = this;

          if (this.type === 'prompt') {
            this.$refs.form.validate().then(function (err) {
              var arg = _this3.promptField.value;

              _this3.beforeConfirm(err, arg);
            });
          } else {
            this.beforeConfirm(e);
          }
        },
        getFooter: function getFooter() {
          var h = this.$createElement;
          var showCancel = this.showCancel,
              showConfirm = this.showConfirm;
          if (!showCancel && !showConfirm) return null;
          return h("div", {
            "class": "omi-dialog__footer omi-border__top"
          }, [showCancel && h(Button, {
            "attrs": {
              "block": true,
              "type": "default",
              "text": this.cancelText
            },
            "class": this.buttonClasses,
            "on": {
              "click": this.handleCancel
            }
          }), showConfirm && h(Button, {
            "attrs": {
              "block": true,
              "type": "default",
              "text": this.confirmText
            },
            "on": {
              "click": this.handleConfirm
            }
          })]);
        }
      },
      computed: {
        buttonClasses: function buttonClasses() {
          var showCancel = this.showCancel,
              showConfirm = this.showConfirm;
          return {
            'omi-border__right': showCancel && showConfirm
          };
        },
        wrapperStyles: function wrapperStyles() {
          return {
            zIndex: this.getZindex
          };
        }
      },
      mounted: function mounted() {
        var _this4 = this;

        this.$nextTick(function () {
          if (_this4.type === 'prompt') {
            setTimeout(function () {
              _this4.$refs.input.focus();
            }, 50);
          }
        });
      },
      render: function render() {
        var h = arguments[0];
        if (!this.shouldRender) return null;
        return h("transition", {
          "attrs": {
            "name": "pop-in",
            "appear": true
          }
        }, [h("div", {
          "class": "omi-dialog__wrapper",
          "style": this.wrapperStyles
        }, [h("div", {
          "class": "omi-dialog"
        }, [this.getTitle(), this.getContent(), this.getFooter()])])]);
      }
    };
  };

  var VueDialog = Dialog$2();

  function _extends$a() { _extends$a = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$a.apply(this, arguments); }
  var alert = dialogType[0];
  var DEFAULT_OPTION$1 = {
    type: alert,
    value: false,
    title: '',
    content: '',
    cancelText: '',
    confirmText: '',
    showCancel: false,
    showConfirm: true,
    onConfirm: function onConfirm() {},
    onCancel: function onCancel() {}
  };
  var typeDefaultOption = {
    alert: {},
    confirm: {
      type: 'confirm',
      showCancel: true
    },
    prompt: {
      type: 'prompt',
      showCancel: true
    }
  };

  var getOption = function getOption(title, content) {
    var opt = {};
    if (isString(title)) opt.title = title;
    if (isString(content)) opt.content = content;
    return opt;
  };

  var creator$1 = createInstance({
    VueComponent: VueDialog,
    defaultOption: DEFAULT_OPTION$1,
    banMultiple: true
  });
  var Dialog = creator$1(function (getInstance, customOptions, typeOtionCache) {
    return function (opt) {
      if (isServer$1) return {};
      var dialog = getInstance();
      var type = opt && opt.type || customOptions.type;

      var option = _extends$a({}, customOptions, typeDefaultOption[type], typeOtionCache[type], opt);

      Object.assign(dialog, option);
      dialog.value = true;
      return dialog;
    };
  });

  Dialog.alert = function (title, content) {
    if (isObject(title)) {
      Dialog(title);
    } else {
      Dialog(_extends$a({}, getOption(title, content)));
    }
  };

  Dialog.prompt = function (title, content) {
    if (isObject(title)) {
      Dialog(_extends$a({}, typeDefaultOption.prompt, title));
    } else {
      Dialog(_extends$a({}, typeDefaultOption.prompt, getOption(title, content)));
    }
  };

  Dialog.confirm = function (title, content) {
    if (isObject(title)) {
      Dialog(_extends$a({}, typeDefaultOption.confirm, title));
    } else {
      Dialog(_extends$a({}, typeDefaultOption.confirm, getOption(title, content)));
    }
  };

  Dialog.Component = VueDialog;
  var Dialog$1 = Dialog;

  Dialog$1.install = function (Vue) {
    Vue.prototype.$dialog = Dialog$1;
    Vue.component(Dialog$1.Component.name, Dialog$1);
  };

  var context = '~~omiScroll';

  function unbind(el) {
    if (!el[context]) return;
    var _el$context = el[context],
        handler = _el$context.handler,
        scroller = _el$context.scroller;
    if (!scroller) return;
    scroller.removeEventListener('scroll', handler);
  }

  function bindScroll(el, binding) {
    var value = binding.value;
    var callback = null;
    if (isFunction(value)) callback = value;else if (isObject(value) && value.callback) callback = value.callback;
    if (!callback) return;
    var immediate = binding.arg;
    var scroller = getScroller(el);

    if (scroller) {
      var handler = throttle(function (e) {
        callback(e, scroller);
      });
      if (el[context] && el[context].scroller !== scroller) unbind(el);
      if (immediate) handler();
      scroller.addEventListener('scroll', handler, {
        passive: true
      });
      el[context] = {
        handler: handler,
        scroller: scroller
      };
    }
  }

  var scroll = {
    name: 'scroll',
    inserted: bindScroll,
    update: bindScroll,
    unbind: unbind
  };

  //
  var DEFAULT_OFFSET = 10;
  var DEFAULT_LOADING_SIZE = 18;
  var script$b = {
    name: 'OmiLoadMore',
    props: {
      handleError: {
        type: Function,
        default: null
      },
      error: {
        type: Boolean,
        default: false
      },
      errorText: {
        type: String,
        default: ''
      },
      immediate: {
        type: Boolean,
        default: false
      },
      finishedText: {
        type: String,
        default: ''
      },
      loadingSize: {
        type: [String, Number],
        default: DEFAULT_LOADING_SIZE
      },
      finished: {
        type: Boolean,
        default: false
      },
      loading: {
        type: Boolean,
        default: false
      },
      offset: {
        type: Number,
        default: DEFAULT_OFFSET
      },
      loadingText: {
        type: String,
        default: ''
      }
    },
    components: {
      Loading: Loading
    },
    directives: {
      scroll: scroll
    },
    methods: {
      errorCallback: function errorCallback() {
        var handleError = this.handleError;
        if (isFunction(handleError)) handleError();else {
          this.$emit('update:error', false);
          this.$emit('load');
        }
      },
      onScroll: function onScroll(e, scroller) {
        if (!scroller) return;
        var loading = this.loading,
            offset = this.offset,
            finished = this.finished;
        if (loading || finished) return;
        var footer = this.$refs.footer;
        var scrollerRect = getBoundingClientRect(scroller);
        var footerRect = getBoundingClientRect(footer);

        if (scrollerRect.bottom + offset >= footerRect.top) {
          this.$emit('load');
        }
      }
    },
    computed: {
      showLoading: function showLoading() {
        var loading = this.loading,
            finished = this.finished,
            error = this.error;
        return loading && !finished && !error;
      }
    }
  };

  /* script */
  const __vue_script__$b = script$b;

  /* template */
  var __vue_render__$b = function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c(
      "div",
      {
        directives: [
          {
            name: "scroll",
            rawName: "v-scroll:[immediate]",
            value: _vm.onScroll,
            expression: "onScroll",
            arg: _vm.immediate
          }
        ],
        staticClass: "omi-load-more"
      },
      [
        _c("div", { staticClass: "omi-list" }, [_vm._t("default")], 2),
        _vm._v(" "),
        _c(
          "div",
          { ref: "footer", staticClass: "omi-list__footer" },
          [
            _vm._t("load-more", function() {
              return [
                _vm.finished
                  ? _c(
                      "div",
                      {
                        staticClass: "omi-list__footer--status omi-list__finished"
                      },
                      [
                        _c("span", { staticClass: "omi-list__load--text" }, [
                          _vm._v(_vm._s(_vm.finishedText))
                        ])
                      ]
                    )
                  : _vm._e(),
                _vm._v(" "),
                _vm.error
                  ? _c(
                      "div",
                      {
                        staticClass: "omi-list__footer--status omi-list__error",
                        on: { click: _vm.errorCallback }
                      },
                      [
                        _c("span", { staticClass: "omi-list__load--text" }, [
                          _vm._v(_vm._s(_vm.errorText))
                        ])
                      ]
                    )
                  : _vm._e(),
                _vm._v(" "),
                _c(
                  "div",
                  {
                    directives: [
                      {
                        name: "show",
                        rawName: "v-show",
                        value: _vm.showLoading,
                        expression: "showLoading"
                      }
                    ],
                    staticClass: "omi-list__footer--status omi-list__loading"
                  },
                  [
                    _c("Loading", { attrs: { size: _vm.loadingSize } }),
                    _vm._v(" "),
                    _c("span", { staticClass: "omi-list__load--text" }, [
                      _vm._v(_vm._s(_vm.loadingText))
                    ])
                  ],
                  1
                )
              ]
            })
          ],
          2
        )
      ]
    )
  };
  var __vue_staticRenderFns__$b = [];
  __vue_render__$b._withStripped = true;

    /* style */
    const __vue_inject_styles__$b = undefined;
    /* scoped */
    const __vue_scope_id__$b = undefined;
    /* module identifier */
    const __vue_module_identifier__$b = undefined;
    /* functional template */
    const __vue_is_functional_template__$b = false;
    /* style inject */
    
    /* style inject SSR */
    

    
    var LoadMore = __vue_normalize____default["default"](
      { render: __vue_render__$b, staticRenderFns: __vue_staticRenderFns__$b },
      __vue_inject_styles__$b,
      __vue_script__$b,
      __vue_scope_id__$b,
      __vue_is_functional_template__$b,
      __vue_module_identifier__$b,
      undefined,
      undefined
    );

  LoadMore.install = function (Vue) {
    Vue.component(LoadMore.name, LoadMore);
  };

  var Pulling = function Pulling() {
    return {
      props: {
        threshold: {
          type: Number,
          default: 0
        },
        distance: {
          type: Number,
          default: 0
        }
      },
      watch: {
        showIndex: {
          handler: function handler(index) {
            if (this.$refs.loading) this.$refs.loading.show(index);
          },
          immediate: true
        }
      },
      computed: {
        showIndex: function showIndex() {
          var threshold = this.threshold,
              distance = this.distance;
          return parseInt((distance + 1) / Math.round(threshold / 12), 10);
        }
      },
      render: function render() {
        var h = arguments[0];
        return h("div", {
          "class": "omi-pull-refresh__spinner"
        }, [h(Loading, {
          "ref": "loading",
          "attrs": {
            "lazyShow": true,
            "spinner": true
          }
        })]);
      }
    };
  };

  var Pulling$1 = Pulling();

  var _methods;

  var STATUS_RESET$1 = 'reset';
  var STATUS_PULLING = 'pulling';
  var STATUS_OVER_THRESHOLD = 'overThreshold';
  var STATUS_LOSING = 'losing';
  var STATUS_REFRESHING = 'refresh';
  var STATUS_DONE = 'done';
  var statusMixin = {
    data: function data() {
      return {
        status: STATUS_RESET$1
      };
    },
    methods: (_methods = {}, _methods[STATUS_RESET$1] = function () {
      var status = this.status,
          isHolding = this.isHolding,
          distance = this.distance;
      if (STATUS_RESET$1 !== status) this.status = STATUS_RESET$1;
      if (!isHolding && distance > 0) this.restPostion(0);
    }, _methods[STATUS_PULLING] = function (touchEnd) {
      var status = this.status;

      if (status !== STATUS_PULLING) {
        this.status = STATUS_PULLING;
      }

      if (touchEnd) {
        this[STATUS_RESET$1]();
      }
    }, _methods[STATUS_OVER_THRESHOLD] = function () {
      this.status = STATUS_OVER_THRESHOLD;
    }, _methods[STATUS_LOSING] = function (touchEnd, losed) {
      var status = this.status,
          threshold = this.threshold;
      if (status === STATUS_RESET$1 || status === STATUS_DONE) return;

      if (status !== STATUS_LOSING) {
        this.status = STATUS_LOSING;
        this.restPostion(threshold);
      }

      if (losed) {
        this.$emit('input', true);
      }
    }, _methods[STATUS_REFRESHING] = function () {
      if (this.isReset) {
        this.restPostion(this.threshold);
      }

      this.$emit('refresh');
      this.status = STATUS_DONE;
    }, _methods[STATUS_DONE] = function () {
      var _this = this;

      this.showSuccess().then(function () {
        _this[STATUS_PULLING](true);
      });
    }, _methods),
    computed: {
      isReset: function isReset() {
        return this.status === STATUS_RESET$1;
      },
      isPulling: function isPulling() {
        return this.status === STATUS_PULLING;
      },
      isOverThreshold: function isOverThreshold() {
        return this.status === STATUS_OVER_THRESHOLD;
      },
      isLosing: function isLosing() {
        return this.status === STATUS_LOSING;
      },
      isDone: function isDone() {
        return this.status === STATUS_DONE;
      },
      isRefreshing: function isRefreshing() {
        return this.refreshing;
      }
    }
  };

  var round = Math.round;
  var DEFAULT_HEADER_HEIGHT = 84;
  var DEFAULT_DURATION$2 = 400;

  var PullFresh = function PullFresh() {
    return {
      name: 'OmiPullRefresh',
      mixins: [touchMixin, statusMixin],
      data: function data() {
        return {
          distance: 0,
          scroller: null,
          reachTop: false,
          showSuccessTip: false,
          animateDuration: this.duration
        };
      },
      model: {
        prop: 'refreshing'
      },
      props: {
        headerPosition: {
          type: String,
          default: '',
          validator: function validator(cls) {
            return cls === 'top' || cls === '';
          }
        },
        headerHeight: {
          type: Number,
          default: DEFAULT_HEADER_HEIGHT
        },
        disable: {
          type: Boolean,
          default: false
        },
        refreshing: {
          type: Boolean,
          default: false
        },
        threshold: {
          type: Number,
          default: DEFAULT_HEADER_HEIGHT
        },
        duration: {
          type: Number,
          default: DEFAULT_DURATION$2
        },
        overThresholdText: {
          type: String,
          default: ''
        },
        successText: {
          type: String,
          default: ''
        },
        refreshingText: {
          type: String,
          default: ''
        },
        losingText: {
          type: String,
          default: ''
        },
        pullingText: {
          type: String,
          default: ''
        },
        successDuration: {
          type: Number,
          default: DEFAULT_DURATION$2
        }
      },
      watch: {
        refreshing: function refreshing(_refreshing) {
          if (_refreshing) {
            this.invokeStatus(true);
          } else {
            var status = this.status;
            this[status]();
          }
        }
      },
      methods: {
        getDefaultTip: function getDefaultTip(text) {
          var h = this.$createElement;
          return h("div", {
            "class": "omi-pull-refresh__loading"
          }, [h(Loading, {
            "attrs": {
              "spinner": true
            }
          }), text]);
        },
        showSuccess: function showSuccess() {
          var _this = this;

          var resolve;
          var promise = new Promise(function (r) {
            resolve = r;
          }); // Use nexttick otherwise can't get slot in #slot usage？

          this.$nextTick(function () {
            var successText = _this.successText,
                successDuration = _this.successDuration;

            if (successText || _this.$slots.success) {
              _this.showSuccessTip = true;
              setTimeout(function () {
                resolve();
              }, successDuration);
            } else {
              resolve();
            }
          });
          return promise;
        },
        getPullingTip: function getPullingTip() {
          var h = this.$createElement;
          var isPulling = this.isPulling;
          var pullingSlot = this.$scopedSlots.pulling;

          if (isPulling) {
            return h("div", {
              "class": "omi-pull-refresh__pulling"
            }, [pullingSlot && pullingSlot({
              distance: this.distance
            }) || h(Pulling$1, {
              "attrs": {
                "distance": this.distance,
                "threshold": this.threshold
              }
            }), this.pullingText]);
          }

          return null;
        },
        getOverThresholdTip: function getOverThresholdTip() {
          var h = this.$createElement;
          if (!this.isOverThreshold) return null;
          return h("div", {
            "class": "omi-pull-refresh__over-threshold"
          }, [this.$slots['over-threshold'] || this.getDefaultTip(this.overThresholdText)]);
        },
        getRefreshTip: function getRefreshTip() {
          var h = this.$createElement;
          var refreshing = this.refreshing,
              isLosing = this.isLosing;

          if (refreshing || isLosing) {
            return h("div", {
              "class": "refresh__refreshing"
            }, [this.$slots.refreshing || this.getDefaultTip(this.refreshingText)]);
          }

          return null;
        },
        getSuccessTip: function getSuccessTip() {
          var h = this.$createElement;
          if (!this.showSuccessTip) return null;
          return h("div", {
            "class": "omi-pull-refresh__success"
          }, [this.$slots.success || this.getDefaultTip(this.successText)]);
        },
        getTips: function getTips() {
          var h = this.$createElement;
          return h("div", {
            "class": "omi-pull-refresh__tip"
          }, [this.getPullingTip(), this.getOverThresholdTip(), this.getRefreshTip(), this.getSuccessTip()]);
        },
        getDistance: function getDistance(moveY) {
          var threshold = this.threshold;
          if (moveY < threshold) return round(moveY);
          var isOverDistance = moveY / threshold >= 2;
          var resistance = isOverDistance ? 0.25 : 0.4;
          var r = isOverDistance ? 1.4 : 1;
          var s = isOverDistance ? 2 : 1;
          var distance = threshold * r + (moveY - threshold * s) * resistance;
          return round(distance);
        },
        getStatus: function getStatus(touchEnd) {
          var distance = this.distance,
              threshold = this.threshold,
              refreshing = this.refreshing;
          if (refreshing && touchEnd) return STATUS_REFRESHING;
          if (distance === 0) return STATUS_RESET$1;
          if (distance < threshold) return STATUS_PULLING;
          if (touchEnd) return STATUS_LOSING;
          return STATUS_OVER_THRESHOLD;
        },
        invokeStatus: function invokeStatus(touchEnd) {
          var status = this.getStatus(touchEnd);
          if (status) this[status](touchEnd);
        },
        onTouchMove: function onTouchMove(e) {
          if (!this.reachTop || this.unClickable) return;
          this.touchMove(e);
          var direction = this.direction,
              moveY = this.moveY;
          if (direction !== 'vertical' || moveY < 0 && this.distance <= 0) return;
          preventDefault(e);
          this.distance = Math.max(this.getDistance(moveY), 0);
          this.invokeStatus(false);
        },
        onTouchStart: function onTouchStart(e) {
          if (this.unClickable) return;
          this.reachTop = getScrollTop(this.scroller) === 0;
          if (!this.reachTop) return;
          this.touchStart(e);
          this.animateDuration = 0;
          this.isHolding = true;
        },
        onTouchEnd: function onTouchEnd() {
          if (this.unClickable) return;
          this.isHolding = false;
          if (this.reachTop) this.invokeStatus(true);
        },
        onTransitionEnd: function onTransitionEnd() {
          var _this2 = this;

          this[STATUS_LOSING](true, true);
          this.$nextTick(function () {
            if (_this2.showSuccessTip) _this2.showSuccessTip = false;
          });
        },
        restPostion: function restPostion(position) {
          this.animateDuration = this.duration;
          this.distance = position;
        },
        getHeader: function getHeader() {
          var h = this.$createElement;
          return h("div", {
            "class": this.headerClasses,
            "style": this.headerStyle
          }, [this.getTips()]);
        }
      },
      computed: {
        headerClasses: function headerClasses() {
          var headerPosition = this.headerPosition;
          var cls = ['omi-pull-refresh__header'];

          if (headerPosition === 'top') {
            cls.push('omi-pull-refresh__header--top');
          }

          return cls;
        },
        bodyStyles: function bodyStyles() {
          var distance = this.distance,
              animateDuration = this.animateDuration;
          var transform = distance ? "translate3d(0, " + distance + "px, 0)" : null;
          return {
            'transition-duration': animateDuration + "ms",
            transform: transform,
            'will-change': transform ? 'transform' : null
          };
        },
        headerStyle: function headerStyle() {
          var headerHeight = this.headerHeight;
          return "height: " + headerHeight + "px";
        },
        unClickable: function unClickable() {
          var isRefreshing = this.isRefreshing,
              showSuccessTip = this.showSuccessTip,
              disable = this.disable,
              isDone = this.isDone;
          return isRefreshing || showSuccessTip || disable || isDone;
        }
      },
      mounted: function mounted() {
        if (!this.scroller) {
          this.scroller = getScroller(this.$el);
          var pullBody = this.$refs.body;
          on(this.$el, 'touchstart', this.onTouchStart, false);
          on(this.$el, 'touchmove', this.onTouchMove, false);
          on(this.$el, 'touchend', this.onTouchEnd);
          on(pullBody, 'transitionend', this.onTransitionEnd);
          if (this.refreshing) this.invokeStatus(true);
        }
      },
      beforeDestroy: function beforeDestroy() {
        var pullBody = this.$refs.body;
        off(this.$el, 'touchstart', this.touchStart);
        off(this.$el, 'touchmove', this.onTouchMove);
        off(this.$el, 'touchend', this.onTouchEnd);
        off(pullBody, 'transitionend', this.onTransitionEnd);
      },
      render: function render() {
        var h = arguments[0];
        var headerOnTop = this.headerPosition === 'top';
        return h("div", {
          "class": "omi-pull-refresh"
        }, [!headerOnTop && this.getHeader(), h("div", {
          "ref": "body",
          "class": "omi-pull-refresh__body",
          "style": this.bodyStyles
        }, [headerOnTop && this.getHeader(), this.$slots.default])]);
      }
    };
  };

  var PullFresh$1 = PullFresh();

  PullFresh$1.install = function (Vue) {
    Vue.component(PullFresh$1.name, PullFresh$1);
  };

  //
  //
  //
  //
  //
  //
  //
  //
  // default max
  var DEFAULT_MAX = 99;
  var script$a = {
    name: 'OmiBadge',
    props: {
      text: {
        type: [String, Number],
        default: ''
      },
      dot: {
        type: Boolean,
        default: false
      },
      maxNumber: {
        type: Number,
        default: DEFAULT_MAX
      }
    },
    methods: {
      overFlow: function overFlow(value) {
        if (/^\d*$/.test(value) && value * 1 >= this.maxNumber) {
          return '99+';
        }

        return value;
      }
    }
  };

  /* script */
  const __vue_script__$a = script$a;

  /* template */
  var __vue_render__$a = function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c(
      "div",
      { staticClass: "omi-badge" },
      [
        _vm.dot
          ? _c("sup", { staticClass: "omi-badge__dot" })
          : _vm.text
          ? _c("sup", { staticClass: "omi-badge__text" }, [
              _vm._v(_vm._s(_vm.overFlow(_vm.text)))
            ])
          : _vm._e(),
        _vm._v(" "),
        _vm._t("default")
      ],
      2
    )
  };
  var __vue_staticRenderFns__$a = [];
  __vue_render__$a._withStripped = true;

    /* style */
    const __vue_inject_styles__$a = undefined;
    /* scoped */
    const __vue_scope_id__$a = undefined;
    /* module identifier */
    const __vue_module_identifier__$a = undefined;
    /* functional template */
    const __vue_is_functional_template__$a = false;
    /* style inject */
    
    /* style inject SSR */
    

    
    var Badge = __vue_normalize____default["default"](
      { render: __vue_render__$a, staticRenderFns: __vue_staticRenderFns__$a },
      __vue_inject_styles__$a,
      __vue_script__$a,
      __vue_scope_id__$a,
      __vue_is_functional_template__$a,
      __vue_module_identifier__$a,
      undefined,
      undefined
    );

  Badge.install = function (Vue) {
    Vue.component(Badge.name, Badge);
  };

  var THRESH_HOLD = 0.2;
  var TOUCH_DIRECTION_DEGREE = 5;
  var panelMixin = {
    data: function data() {
      return {
        isMoving: false,
        scoller: null,
        transformX: 0,
        distance: 0,
        isSwiping: false
      };
    },
    watch: {
      shouldRender: function shouldRender(_shouldRender) {
        if (_shouldRender) this.bindTouchEvent();else this.unBindTouchEvent();
      }
    },
    methods: {
      findValidChild: function findValidChild(index, isIncrease) {
        var child = this.children[index];
        if (!child.disabled) return index;

        if (index > 0 && index < this.children.length - 1) {
          var nextIndex = isIncrease ? index + 1 : index - 1;
          return this.findValidChild(nextIndex, isIncrease);
        }

        return -1;
      },
      setTransform: function setTransform(moveX) {
        var activeIndex = this.activeIndex,
            children = this.children;
        if (activeIndex <= 0 && moveX >= 0 || activeIndex >= children.length - 1 && moveX <= 0) return;
        if (!this.isMoving) this.isMoving = true;
        this.distance = this.transformX + moveX;
      },
      findNextActive: function findNextActive(moveX, offsetX) {
        var _this = this;

        this.$nextTick(function () {
          var activeIndex = _this.activeIndex,
              children = _this.children,
              findValidChild = _this.findValidChild;

          var paneWidth = _this.getPaneWidth();

          var thresholdWidth = paneWidth * THRESH_HOLD;
          var currentIndex = activeIndex;

          if (offsetX >= thresholdWidth) {
            if (moveX < 0 && activeIndex < children.length - 1) {
              currentIndex = findValidChild(activeIndex + 1);
            } else if (moveX > 0 && activeIndex > 0) {
              currentIndex = findValidChild(activeIndex - 1);
            }

            if (currentIndex !== activeIndex && currentIndex >= 0) {
              _this.updateIndex(currentIndex);
            }
          }
        });
      },
      onTouchStart: function onTouchStart(e) {
        if (!this.swipleable) return;
        this.touchStart(e);
      },
      onTouchMove: function onTouchMove(e) {
        if (!this.swipleable) return;
        this.touchMove(e, TOUCH_DIRECTION_DEGREE);
        if (!this.inited) this.inited = true;
        this.isSwiping = true;
        var direction = this.direction;
        var isHorizontal = direction === 'horizontal';

        if (!isHorizontal) {
          preventDefault(e);
        }

        this.setTransform(this.moveX);
      },
      onTouchEnd: function onTouchEnd() {
        var moveX = this.moveX,
            offsetX = this.offsetX;

        if (this.isMoving) {
          this.findNextActive(moveX, offsetX);
          this.isMoving = false;
        }

        this.isSwiping = false;
        this.resetTouch();
      },
      bindTouchEvent: function bindTouchEvent() {
        var _this2 = this;

        this.$nextTick(function () {
          if (!_this2.swipleable || _this2.scoller) return;
          _this2.scoller = _this2.$refs.pane;
          if (!_this2.scoller) return;
          on(_this2.scoller, 'touchstart', _this2.onTouchStart);
          on(_this2.scoller, 'touchmove', _this2.onTouchMove, false);
          on(_this2.scoller, 'touchend', _this2.onTouchEnd);
        });
      },
      unBindTouchEvent: function unBindTouchEvent() {
        var scoller = this.scoller;

        if (scoller) {
          off(scoller, 'touchstart', this.onTouchStart);
          off(scoller, 'touchmove', this.onTouchMove);
          off(scoller, 'touchstart', this.onTouchEnd);
          this.scoller = null;
        }
      },
      getTransformString: function getTransformString(transformX, property) {
        var willChange = this.isSwiping ? 'transform' : null;
        var styles = "\n        transform: translate3d(" + transformX + "px, 0, 0);\n        transition-property: " + property + ";\n      ";
        if (this.isSwiping) styles += "will-change: " + willChange + ";";
        return styles;
      },
      scrollPane: function scrollPane() {
        var _this3 = this;

        if (!this.animated) return;
        this.$nextTick(function () {
          var activeIndex = _this3.activeIndex;

          var paneWidth = _this3.getPaneWidth();

          _this3.transformX = -(activeIndex * paneWidth);
        });
      },
      getPaneWidth: function getPaneWidth() {
        if (this.$refs.pane) return this.$refs.pane.offsetWidth;
        return this.$el.offsetWidth;
      }
    },
    computed: {
      animatedClass: function animatedClass() {
        var animated = this.animated,
            inited = this.inited;
        return {
          'omi-tabs__animated': animated && inited
        };
      },
      paneStyles: function paneStyles() {
        var isMoving = this.isMoving,
            distance = this.distance,
            getTransformString = this.getTransformString,
            transformX = this.transformX,
            swipleable = this.swipleable,
            animated = this.animated;
        if (isMoving && swipleable) return getTransformString(distance, 'none');
        if (animated) return getTransformString(transformX, 'transform');
        return null;
      }
    },
    mounted: function mounted() {
      this.bindTouchEvent();
    },
    beforeDestroy: function beforeDestroy() {
      this.unBindTouchEvent();
    }
  };

  var toFixed = function toFixed(num) {
    return num.toFixed(5);
  };

  var MAX_TITLE_NUMBER = 4;
  var barMixin = {
    data: function data() {
      return {
        lineOffset: 0
      };
    },
    methods: {
      scrollBarToView: function scrollBarToView(animated) {
        var scrollAble = this.scrollAble,
            activeIndex = this.activeIndex;
        var labels = this.$refs.label;
        var labelItem = labels[activeIndex];
        if (!scrollAble || !labels.length || !labelItem) return;
        var bar = this.$refs.bar;
        var offsetLeft = labelItem.offsetLeft,
            offsetWidth = labelItem.offsetWidth;
        var from = bar.scrollLeft;
        var to = offsetLeft - (bar.offsetWidth - offsetWidth) / 2;
        var distance = to - from;
        var duration = animated ? this.titleScrollDuration : 0;
        scrollLeft(bar, distance, duration);
      },
      scrollLine: function scrollLine() {
        var activeIndex = this.activeIndex,
            labels = this.labels;
        var label = this.$refs.label[activeIndex];
        if (!label || !labels.length || label.disalbed) return;
        this.lineOffset = activeIndex * 100;
      }
    },
    computed: {
      lineClass: function lineClass() {
        var inited = this.inited;
        return {
          'omi-tabs_bar--animated': inited
        };
      },
      labelRateWidth: function labelRateWidth() {
        return toFixed(1 / MAX_TITLE_NUMBER * 100);
      },
      labelStyle: function labelStyle() {
        if (this.labels.length <= MAX_TITLE_NUMBER) return null;
        var labelRateWidth = this.labelRateWidth;
        return "flex-basis: " + labelRateWidth + "%;";
      },
      lineStyle: function lineStyle() {
        return "\n        width:" + this.labelRateWidth + "%;\n        transform: translateX(" + this.lineOffset + "%) translateZ(0)\n      ";
      },
      scrollAble: function scrollAble() {
        return this.labels.length > MAX_TITLE_NUMBER;
      },
      labels: function labels() {
        return this.children.filter(function (_ref) {
          var label = _ref.label;
          return label !== null;
        });
      }
    }
  };

  //
  var DEFAULT_ACTIVE_INDEX$1 = 0;
  var DEFAULT_TITLE_SCROLL_DURATION = 300;
  var script$9 = {
    name: 'OmiTabs',
    provide: function provide() {
      return {
        tabsParent: this
      };
    },
    mixins: [touchMixin, panelMixin, barMixin, providerMixin('tabsParent')],
    data: function data() {
      return {
        activeKey: DEFAULT_ACTIVE_INDEX$1,
        activeIndex: DEFAULT_ACTIVE_INDEX$1,
        inited: false
      };
    },
    components: {
      Badge: Badge
    },
    props: {
      titleScrollDuration: {
        type: Number,
        default: DEFAULT_TITLE_SCROLL_DURATION
      },
      swipleable: {
        type: Boolean,
        default: false
      },
      animated: {
        type: Boolean,
        default: false
      },
      value: {
        type: [String, Number],
        default: 0
      }
    },
    watch: {
      swipleable: function swipleable(_swipleable) {
        var _this = this;

        if (_swipleable) {
          this.$nextTick(function () {
            _this.bindTouchEvent();
          });
        }
      },
      value: function value(_value) {
        var _this2 = this;

        if (!unDef(_value)) {
          if (!this.inited) this.inited = true;
          this.show(this.animated, function () {
            var activeKey = _this2.activeKey,
                activeIndex = _this2.activeIndex,
                labels = _this2.labels;

            _this2.$emit('change', activeKey, labels[activeIndex].label);
          });
        }
      }
    },
    methods: {
      updateIndex: function updateIndex(currentIndex) {
        var _this$getActiveChild = this.getActiveChild(currentIndex),
            activeKey = _this$getActiveChild.activeKey;

        this.$emit('input', activeKey);
      },
      getActiveChild: function getActiveChild(index) {
        var child = this.children[index];
        return this.getActiveChildInfo(child);
      },
      isActive: function isActive(_ref) {
        var tabName = _ref.tabName;
        var activeKey = this.activeKey;
        return {
          'omi-tabs__bar--active': tabName === activeKey
        };
      },
      onClick: function onClick(_ref2) {
        var tabName = _ref2.tabName,
            disalbed = _ref2.disalbed,
            label = _ref2.label;
        if (disalbed) return;
        this.$emit('input', tabName);
        this.$emit('clickTab', tabName, label);
      },
      getChildIndex: function getChildIndex(child) {
        return this.children.indexOf(child);
      },
      setActive: function setActive(_ref3) {
        var activeKey = _ref3.activeKey,
            activeIndex = _ref3.activeIndex;
        if (unDef(activeKey) || unDef(activeIndex)) return;
        this.activeKey = activeKey;
        this.activeIndex = activeIndex;
      },
      getActiveChildInfo: function getActiveChildInfo(child) {
        if (!child) return {};
        return {
          activeIndex: child.getIndex,
          activeKey: child.tabName
        };
      },
      getActive: function getActive() {
        var _this3 = this;

        var _this$children$filter = this.children.filter(function (item) {
          return item.tabName === _this3.value;
        }),
            child = _this$children$filter[0];

        return this.getActiveChildInfo(child);
      },
      show: function show(animated, cb) {
        var _this4 = this;

        if (cb === void 0) {
          cb = function cb() {};
        }

        this.$nextTick(function () {
          _this4.setActive(_this4.getActive());

          _this4.scrollBarToView(animated);

          _this4.scrollPane();

          _this4.scrollLine();

          cb();
        });
      }
    },
    mounted: function mounted() {
      this.show(false);
    }
  };

  /* script */
  const __vue_script__$9 = script$9;

  /* template */
  var __vue_render__$9 = function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c("div", { staticClass: "omi-tabs" }, [
      _c("div", { staticClass: "omi-tabs__bar omi-border__bottom" }, [
        _c(
          "div",
          {
            ref: "bar",
            staticClass: "omi-tabs__bar--list",
            attrs: { role: "tablist" }
          },
          [
            _vm._l(_vm.labels, function(item) {
              return _c(
                "div",
                {
                  key: item.name,
                  ref: "label",
                  refInFor: true,
                  staticClass: "omi-tabs__bar--item",
                  class: _vm.isActive(item),
                  style: _vm.labelStyle,
                  attrs: { role: "tab" },
                  on: {
                    click: function() {
                      return _vm.onClick(item)
                    }
                  }
                },
                [
                  _c(
                    "badge",
                    {
                      attrs: {
                        dot: item.dot,
                        text: item.badgeText,
                        maxNumber: item.badgeMaxNumber
                      }
                    },
                    [_c("span", [_vm._v(_vm._s(item.label))])]
                  )
                ],
                1
              )
            }),
            _vm._v(" "),
            _c("div", {
              staticClass: "omi-tabs__bar--line",
              class: _vm.lineClass,
              style: _vm.lineStyle
            })
          ],
          2
        )
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "omi-tabs__list" }, [
        _c(
          "div",
          {
            ref: "pane",
            staticClass: "omi-tabs__list--inner",
            class: _vm.animatedClass,
            style: _vm.paneStyles
          },
          [_vm._t("default")],
          2
        )
      ])
    ])
  };
  var __vue_staticRenderFns__$9 = [];
  __vue_render__$9._withStripped = true;

    /* style */
    const __vue_inject_styles__$9 = undefined;
    /* scoped */
    const __vue_scope_id__$9 = undefined;
    /* module identifier */
    const __vue_module_identifier__$9 = undefined;
    /* functional template */
    const __vue_is_functional_template__$9 = false;
    /* style inject */
    
    /* style inject SSR */
    

    
    var Tabs = __vue_normalize____default["default"](
      { render: __vue_render__$9, staticRenderFns: __vue_staticRenderFns__$9 },
      __vue_inject_styles__$9,
      __vue_script__$9,
      __vue_scope_id__$9,
      __vue_is_functional_template__$9,
      __vue_module_identifier__$9,
      undefined,
      undefined
    );

  Tabs.install = function (Vue) {
    Vue.component(Tabs.name, Tabs);
  };

  //
  var script$8 = {
    name: 'OmiTabsPane',
    mixins: [injectMixin('tabsParent')],
    props: {
      dot: {
        type: Boolean,
        default: false
      },
      badgeText: {
        type: [String, Number],
        default: ''
      },
      badgeMaxNumber: {
        type: Number,
        default: null
      },
      label: {
        type: String,
        default: ''
      },
      name: {
        type: [String, Number],
        default: null
      },
      disabled: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      show: function show() {
        var parent = this.parent,
            tabName = this.tabName;
        if (!parent) return false;
        return parent.activeKey === tabName;
      },
      panelStyle: function panelStyle() {
        var parent = this.parent;
        if (!parent || parent.swipleable || parent.animated) return null;
        var show = this.show ? null : 'display: none';
        return show;
      },
      getIndex: function getIndex() {
        if (!this.parent) return -1;
        return this.parent.children.indexOf(this);
      },
      tabName: function tabName() {
        var name = this.name,
            getIndex = this.getIndex;
        return name !== null ? name : getIndex;
      }
    }
  };

  /* script */
  const __vue_script__$8 = script$8;

  /* template */
  var __vue_render__$8 = function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c(
      "div",
      {
        staticClass: "omi-tabs-panel",
        style: _vm.panelStyle,
        attrs: { role: "tabpanel" }
      },
      [_vm._t("default")],
      2
    )
  };
  var __vue_staticRenderFns__$8 = [];
  __vue_render__$8._withStripped = true;

    /* style */
    const __vue_inject_styles__$8 = undefined;
    /* scoped */
    const __vue_scope_id__$8 = undefined;
    /* module identifier */
    const __vue_module_identifier__$8 = undefined;
    /* functional template */
    const __vue_is_functional_template__$8 = false;
    /* style inject */
    
    /* style inject SSR */
    

    
    var TabsPanel = __vue_normalize____default["default"](
      { render: __vue_render__$8, staticRenderFns: __vue_staticRenderFns__$8 },
      __vue_inject_styles__$8,
      __vue_script__$8,
      __vue_scope_id__$8,
      __vue_is_functional_template__$8,
      __vue_module_identifier__$8,
      undefined,
      undefined
    );

  TabsPanel.install = function (Vue) {
    Vue.component(TabsPanel.name, TabsPanel);
  };

  var TRIGGER_MINI_DISTANCE = 15; // Minimum time difference to trigger scrolling

  var TRIGGER_MINI_TIME = 300;
  var ROTATEX = 25;
  var SPEED_COEFFICIENT = 0.3;
  var MAX_VISIBLE_ITEM = 5;
  var DEFAULT_ITEM_HEIGHT = 42;
  var DEFAULT_DURATION$1 = 800;

  var getTransformFromDom = function getTransformFromDom(el) {
    var matrix = window.getComputedStyle(el, null).getPropertyValue('transform');
    matrix = /[\S\s]*\((.+?)\)/.exec(matrix)[1].split(',');
    var transformY = matrix[matrix.length - 1];
    return transformY * 1;
  };

  var PickerColums = function PickerColums() {
    return {
      name: 'OmiPickColums',
      mixins: [injectMixin('omiPicker'), touchMixin],
      data: function data() {
        return {
          currentIndex: 0,
          currentDuration: 0,
          startDate: 0,
          startTransformY: 0,
          transformY: 0,
          fingerStartY: 0,
          bindedEvent: false,
          isMoving: false,
          afterTransition: [],
          transitionPayload: {
            duration: 0,
            property: 'none'
          },
          inited: false
        };
      },
      props: {
        // ms
        duration: {
          type: Number,
          default: DEFAULT_DURATION$1
        },
        itemHeight: {
          type: Number,
          default: DEFAULT_ITEM_HEIGHT
        },
        defaultIndex: {
          type: Number,
          default: 0
        },
        data: {
          type: Array,
          default: function _default() {
            return [];
          }
        }
      },
      watch: {
        data: function data() {
          var defaultIndex = this.defaultIndex;
          this.scrollTo(null, this.getValidDefaultIndex(defaultIndex));
        },
        defaultIndex: function defaultIndex(index) {
          if (this.isMoving) return;
          this.scrollTo(null, this.getValidDefaultIndex(index));
        }
      },
      methods: {
        // @exposed-api
        getActiveValue: function getActiveValue() {
          var data = this.data,
              currentIndex = this.currentIndex;
          var payload = data[currentIndex];

          if (payload) {
            return {
              label: data[currentIndex].label,
              value: data[currentIndex].value
            };
          }

          return {};
        },
        // @exposed-api
        setActiveValue: function setActiveValue(value) {
          var _this = this;

          return new Promise(function (resolve) {
            _this.$nextTick(function () {
              var activeIndex = -1; // eslint-disable-next-line no-plusplus

              for (var i = 0; i < _this.dataLength; i++) {
                if (_this.data[i].value === value) {
                  activeIndex = i;
                  break;
                }
              }

              if (activeIndex !== -1) {
                _this.scrollTo(null, activeIndex, resolve);
              } else {
                resolve();
              }
            });
          });
        },
        setActiveIndex: function setActiveIndex(index) {
          this.currentIndex = index;
        },
        onClickItem: function onClickItem(index) {
          this.scrollTo(null, index);
        },
        getItemClasses: function getItemClasses(index) {
          var cls = ['omi-picker-colum__list--item'];

          if (index === this.currentIndex) {
            cls.push('omi-picker-colum__list--active');
          }

          return cls;
        },
        getItemStyle: function getItemStyle(index) {
          var itemHeight = this.itemHeight,
              transformY = this.transformY,
              isMoving = this.isMoving;
          var abs = Math.abs;
          var rotateX = (abs(transformY) - index * itemHeight) / itemHeight * ROTATEX;
          return {
            height: itemHeight + "px",
            transform: "rotateX(" + rotateX + "deg)",
            'will-change': isMoving ? 'transform' : null
          };
        },
        getValidDefaultIndex: function getValidDefaultIndex(index) {
          return unDef(this.data[index]) ? 0 : index;
        },
        getListItem: function getListItem() {
          var h = this.$createElement;
          var getItemClasses = this.getItemClasses,
              getItemStyle = this.getItemStyle,
              onClickItem = this.onClickItem;
          return this.data.map(function (item, index) {
            return h("li", {
              "on": {
                "click": function click() {
                  return onClickItem(index);
                }
              },
              "style": getItemStyle(index),
              "attrs": {
                "role": "button"
              },
              "class": getItemClasses(index),
              "key": item.uid
            }, [item.label]);
          });
        },
        onTouchStart: function onTouchStart(e) {
          this.touchStart(e);

          if (!this.isMoving) {
            this.startTransformY = this.transformY;
          } else {
            var domTransformY = getTransformFromDom(this.$refs.list);
            this.startTransformY = domTransformY - this.basePosition;
          }

          this.startDate = Date.now();
          this.fingerStartY = this.startTransformY;
          this.resetStatus();
        },
        onTouchMove: function onTouchMove(e) {
          this.touchMove(e);
          var direction = this.direction,
              moveY = this.moveY;

          if (direction === 'vertical') {
            preventDefault(e);
            this.isMoving = true;
          }

          this.setTransform(moveY);
          var cur = Date.now();

          if (cur - this.startDate > TRIGGER_MINI_TIME) {
            this.startDate = cur;
            this.fingerStartY = this.transformY;
          }
        },
        onTouchEnd: function onTouchEnd() {
          var timeDiff = Date.now() - this.startDate;
          var distance = this.transformY - this.fingerStartY;
          var needScroll = timeDiff < TRIGGER_MINI_TIME && Math.abs(distance) >= TRIGGER_MINI_DISTANCE;

          if (needScroll) {
            var duration = this.duration;
            var offset = distance / timeDiff * SPEED_COEFFICIENT * duration;
            var destination = this.transformY + offset;
            this.scrollTo(-destination);
          } else if (this.isMoving) {
            this.scrollTo(-this.transformY);
          }
        },
        setTransform: function setTransform(moveY) {
          var startTransformY = this.startTransformY,
              itemHeight = this.itemHeight,
              dataLength = this.dataLength;
          var offset = startTransformY + moveY;
          this.transformY = getRange(offset, itemHeight, -(dataLength * itemHeight));
        },
        resetStatus: function resetStatus() {
          this.isMoving = false;
          if (!this.inited) this.inited = true;
          this.afterTransition = [];
          this.setTransition();
        },
        onTransitionEnd: function onTransitionEnd() {
          this.flushCallBack();
          this.resetStatus();
        },
        flushCallBack: function flushCallBack() {
          while (this.afterTransition.length) {
            var afterTransition = this.afterTransition.pop();
            if (afterTransition) afterTransition();
          }
        },
        setTransition: function setTransition(duration, property) {
          if (duration === void 0) {
            duration = 0;
          }

          if (property === void 0) {
            property = 'none';
          }

          this.transitionPayload = {
            duration: duration,
            property: property
          };
        },
        scrollCallBack: function scrollCallBack(index) {
          if (this.currentIndex !== index) this.setActiveIndex(index);
          this.$emit('change');
        },
        scrollTo: function scrollTo(offset, currentIndex, cb) {
          var _this2 = this;

          if (currentIndex === void 0) {
            currentIndex = null;
          }

          if (cb === void 0) {
            cb = null;
          }

          var itemHeight = this.itemHeight,
              getValidIndex = this.getValidIndex,
              isMoving = this.isMoving;
          var index = currentIndex;

          if (currentIndex === null) {
            index = getValidIndex(offset / itemHeight);
          }

          var transformY = index * itemHeight;

          if (this.inited) {
            this.setTransition(this.duration, 'all');
            if (!this.isMoving) this.isMoving = true;
          }

          this.transformY = -transformY;

          var scrollCallBack = function scrollCallBack() {
            _this2.scrollCallBack(index);

            if (isFunction(cb)) cb();
          };

          if (!this.inited || isFunction(cb)) {
            this.onTransitionEnd();
            this.setActiveIndex(index);
            scrollCallBack();
            return;
          }

          if (isMoving || index !== this.currentIndex) {
            if (this.afterTransition.length) {
              this.flushCallBack();
            }

            this.afterTransition.push(scrollCallBack);
          } else {
            this.onTransitionEnd();
            this.setActiveIndex(index);
          }
        },
        getValidIndex: function getValidIndex(index) {
          return getRange(Math.round(index), this.dataLength - 1, 0);
        },
        bindTouchEvent: function bindTouchEvent(fn, binded) {
          var list = this.$refs.list;
          var wrapper = this.$el;
          fn(wrapper, 'touchstart', this.onTouchStart);
          fn(wrapper, 'touchmove', this.onTouchMove, false);
          fn(wrapper, 'touchend', this.onTouchEnd);
          fn(list, 'transitionend', this.onTransitionEnd);
          this.bindedEvent = binded;
        }
      },
      computed: {
        dataLength: function dataLength() {
          return this.data.length;
        },
        wrapperStyles: function wrapperStyles() {
          var itemHeight = this.itemHeight;
          return "height: " + itemHeight * MAX_VISIBLE_ITEM + "px";
        },
        basePosition: function basePosition() {
          var itemHeight = this.itemHeight;
          return itemHeight * (MAX_VISIBLE_ITEM - 1) / 2;
        },
        ListStyles: function ListStyles() {
          var basePosition = this.basePosition,
              transformY = this.transformY,
              transitionPayload = this.transitionPayload,
              isMoving = this.isMoving;
          var offsetY = basePosition + transformY;
          return {
            transform: "translate3d(0, " + offsetY + "px, 0)",
            'transition-duration': transitionPayload.duration + "ms",
            'transition-property': "" + transitionPayload.property,
            'will-change': isMoving ? 'transform' : null
          };
        }
      },
      mounted: function mounted() {
        var _this3 = this;

        this.$nextTick(function () {
          if (!_this3.bindedEvent) {
            _this3.bindTouchEvent(on, true);
          }

          var defaultIndex = _this3.getValidDefaultIndex(_this3.defaultIndex);

          if (defaultIndex !== _this3.currentIndex) {
            _this3.scrollTo(null, defaultIndex);
          } else {
            _this3.inited = true;
          }
        });
      },
      beforeUpdate: function beforeUpdate() {
        if (!this.inited) {
          this.inited = true;
        }
      },
      beforeDestroy: function beforeDestroy() {
        if (this.bindedEvent) this.bindTouchEvent(off, false);
      },
      render: function render() {
        var h = arguments[0];
        return h("div", {
          "class": "omi-picker-colum",
          "ref": "wrapper",
          "style": this.wrapperStyles
        }, [h("ul", {
          "class": "omi-picker-colum__list",
          "style": this.ListStyles,
          "ref": "list"
        }, [this.getListItem()])]);
      }
    };
  };

  var Colums = PickerColums();

  var _excluded = ["uid"];

  function _extends$9() { _extends$9 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$9.apply(this, arguments); }

  function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
  var genUid = getUid();
  var DEFAULT_INDEX$1 = 0;

  var Picker = function Picker() {
    return {
      name: 'OmiPicker',
      mixins: [providerMixin('omiPicker')],
      data: function data() {
        return {
          colums: [],
          isSetting: false
        };
      },
      props: {
        title: {
          type: String,
          default: ''
        },
        confirmText: {
          type: String,
          default: ''
        },
        cancelText: {
          type: String,
          default: ''
        },
        itemHeight: {
          type: Number,
          default: DEFAULT_ITEM_HEIGHT
        },
        duration: {
          type: Number,
          default: DEFAULT_DURATION$1
        },
        cascade: {
          type: Boolean,
          default: false
        },
        data: {
          type: Array,
          default: function _default() {
            return [];
          }
        },
        valueKey: {
          type: String,
          default: ''
        },
        labelKey: {
          type: String,
          default: ''
        },
        defaultIndex: {
          type: [Array, Number],
          default: function _default() {
            return [DEFAULT_INDEX$1];
          },
          validator: function validator(values) {
            if (!isArray(values)) return true;
            return values.every(function (value) {
              return isNumber$1(value * 1);
            });
          }
        },
        onConfirm: {
          type: Function,
          default: function _default() {}
        },
        onCancel: {
          type: Function,
          default: function _default() {}
        }
      },
      watch: {
        data: {
          handler: function handler(data) {
            this.flattenData(data);
          },
          immediate: true
        }
      },
      methods: {
        formateColumPayload: function formateColumPayload(node, columIndex) {
          var valueKey = this.valueKey,
              labelKey = this.labelKey;
          var data = node.children.map(function (item) {
            return {
              label: item[labelKey] || item.label || null,
              value: item[valueKey] || item.value || null,
              uid: item.key || genUid("colum-" + columIndex)
            };
          });
          var defaultIndex = this.getDefaultIndex(node, columIndex);
          return {
            data: data,
            defaultIndex: defaultIndex,
            uid: "colum-" + columIndex
          };
        },
        getActiveIndexs: function getActiveIndexs() {
          return this.children.map(function (child) {
            return child.currentIndex;
          });
        },
        getDefaultIndex: function getDefaultIndex(parent, colum) {
          var defaultIndex = this.defaultIndex;
          var index = isArray(defaultIndex) ? defaultIndex[colum] : defaultIndex;
          return parent.defaultIndex || index || DEFAULT_INDEX$1;
        },
        formatCascade: function formatCascade() {
          var formateColumPayload = this.formateColumPayload;
          var i = 0;
          var colums = [];
          var parent = {
            children: this.data
          };

          while (parent && isArray(parent.children)) {
            var columNode = formateColumPayload(parent, i);
            colums.push(columNode);
            var _parent = parent,
                children = _parent.children;
            var defaultIndex = columNode.defaultIndex;
            parent = !unDef(children[defaultIndex]) ? children[defaultIndex] : children[DEFAULT_INDEX$1];
            i += 1;
          }

          return colums;
        },
        formatColum: function formatColum() {
          var data = this.data,
              formateColumPayload = this.formateColumPayload;
          return data.map(function (colum, columIndex) {
            var node = {
              children: colum
            };
            return formateColumPayload(node, columIndex);
          });
        },
        flattenData: function flattenData() {
          if (this.cascade) {
            this.colums = this.formatCascade();
            return;
          }

          this.colums = this.formatColum();
        },
        updateCascade: function updateCascade(columIndex) {
          var data = this.data,
              getActiveIndexs = this.getActiveIndexs;
          var activeIndexs = getActiveIndexs();
          var i = 0;
          var parent = {
            children: data
          };

          while (i <= columIndex && isArray(parent.children)) {
            parent = parent.children[activeIndexs[i]];
            i += 1;
          }

          while (parent && isArray(parent.children)) {
            var defaultIndex = this.getDefaultIndex(parent, i);
            this.updateData(parent, i);
            parent = parent.children[defaultIndex];
            i += 1;
          }
        },
        onChange: function onChange(columIndex) {
          var _this = this;

          if (this.cascade) this.updateCascade(columIndex);
          this.$nextTick(function () {
            _this.$nextTick(function () {
              if (_this.isSetting) return;

              var values = _this.getValues().map(function (_ref) {
                _ref.uid;
                    var rest = _objectWithoutPropertiesLoose(_ref, _excluded);

                return _extends$9({}, rest);
              });

              _this.$emit('change', values, columIndex);
            });
          });
        },
        getColums: function getColums() {
          var _this2 = this;

          var h = this.$createElement;
          return this.colums.map(function (colum, index) {
            var _attrs;

            return h(Colums, {
              "attrs": (_attrs = {
                "data": colum.data,
                "defaultIndex": colum.defaultIndex,
                "className": colum.className,
                "duration": _this2.duration
              }, _attrs["duration"] = _this2.duration, _attrs["itemHeight"] = _this2.itemHeight, _attrs),
              "key": colum.uid,
              "on": {
                "change": function change() {
                  return _this2.onChange(index);
                }
              }
            });
          });
        },
        updateData: function updateData(colum, columIndex) {
          var _this3 = this;

          this.$nextTick(function () {
            var columNode = _this3.formateColumPayload(colum, columIndex);

            _this3.colums.splice(columIndex, 1, columNode);
          });
        },

        /**
         * @vue2doc-exposed-api:updateColum
         * @param {Array} colum
         * @param {Number} columIndex
         */
        updateColum: function updateColum(colum, columIndex) {
          var _this4 = this;

          if (columIndex === void 0) {
            columIndex = 0;
          }

          if (!isArray(colum)) {
            throw new Error('[omi]:colum should be an array');
          }

          var node = {
            children: colum
          };
          this.updateData(node, columIndex);
          this.$nextTick(function () {
            if (_this4.cascade) _this4.updateCascade(columIndex);
          });
        },

        /**
         * @vue2doc-exposed-api:getValues
         * @return {Array} values
         */
        getValues: function getValues() {
          return this.children.map(function (child) {
            return child.getActiveValue();
          });
        },

        /**
         * @vue2doc-exposed-api:setValues
         * @param {Array|Any} values
         * @param {Number} columIndex
         */
        setValues: function setValues(values, columIndex) {
          var _this5 = this;

          this.$nextTick(function () {
            var children = _this5.children;

            if (isArray(values)) {
              values.reduce(function (pre, value, index) {
                return pre.then(function () {
                  if (!_this5.isSetting) _this5.isSetting = true;
                  return children[index].setActiveValue(value);
                });
              }, Promise.resolve()).then(function () {
                _this5.isSetting = false;
              });
            } else if (isNumber$1(columIndex)) {
              children[columIndex].setActiveValue(values);
            }
          });
        },

        /**
         * @vue2doc-exposed-api:isScrolling
         * @return {Boolean}
         */
        isScrolling: function isScrolling() {
          return this.isMoving;
        },
        getHeader: function getHeader() {
          var h = this.$createElement;
          var confirmText = this.confirmText,
              cancelText = this.cancelText,
              title = this.title;
          if (unDef(confirmText) && unDef(cancelText) && unDef(title)) return null;
          return h("div", {
            "class": "omi-picker__header"
          }, [cancelText && h("div", {
            "class": "omi-picker__cancel",
            "on": {
              "click": this.handleCancel
            }
          }, [this.cancelText]), title && h("div", {
            "class": "omi-picker__title"
          }, [title]), confirmText && h("div", {
            "class": "omi-picker__confirm",
            "on": {
              "click": this.handleConfirm
            }
          }, [this.confirmText])]);
        },
        handleConfirm: function handleConfirm() {
          this.onConfirm();
        },
        handleCancel: function handleCancel() {
          this.onCancel();
        }
      },
      computed: {
        maskStyles: function maskStyles() {
          var itemHeight = this.itemHeight;
          var columHeight = itemHeight * MAX_VISIBLE_ITEM;
          return "background-size: 100% " + (columHeight - itemHeight) / 2 + "px";
        },
        cursorStyles: function cursorStyles() {
          return "height: " + this.itemHeight + "px";
        },
        isMoving: function isMoving() {
          return this.children.some(function (child) {
            return child.isMoving;
          });
        }
      },
      render: function render() {
        var h = arguments[0];
        return h("div", {
          "class": "omi-picker"
        }, [this.getHeader(), h("div", {
          "class": "omi-picker-colums__wrapper"
        }, [this.getColums(), h("div", {
          "class": "omi-picker-colums__mask",
          "style": this.maskStyles
        }), h("div", {
          "class": "omi-picker-colums__cursor omi-picker-border__top-bottom",
          "style": this.cursorStyles
        })])]);
      }
    };
  };

  var Picker$1 = Picker();

  Picker$1.install = function (Vue) {
    Vue.component(Picker$1.name, Picker$1);
  };

  var PROVINCE = 'province';
  var CTIY = 'city';
  var AREA = 'area';
  var hasOwnProperty = Object.prototype.hasOwnProperty;

  var getAddressCode = function getAddressCode(code) {
    var _ref;

    var codeString = "" + code;
    var re = /^(\d{2})(\d{2})(\d{2})$/;

    if (codeString.length < 6) {
      var index = 6 - codeString.length - 1; // eslint-disable-next-line no-plusplus

      for (var i = 0; i <= index; i++) {
        codeString += '0';
      }
    }

    var _re$exec = re.exec(codeString),
        originCode = _re$exec[0],
        address = _re$exec.slice(1);

    var province = address[0],
        city = address[1],
        area = address[2];
    return _ref = {}, _ref[PROVINCE] = province, _ref[CTIY] = city, _ref[AREA] = area, _ref.originCode = originCode, _ref;
  };
  function formateAddres(list, type, map, parentKey, cb, isLeaf) {
    if (isLeaf === void 0) {
      isLeaf = false;
    }

    if (unDef(list)) return [];
    return Object.keys(list).map(function (code, index) {
      var label = list[code];
      var addressCode = getAddressCode(code);

      if (map && !hasOwnProperty.call(map, addressCode[type])) {
        var mapKey = parentKey ? "" + addressCode[parentKey] + addressCode[type] : "" + addressCode[type];
        map[mapKey] = index;
      }

      var payload = {
        label: label,
        value: code,
        parentCode: addressCode[parentKey],
        selfCode: addressCode[type],
        originCode: addressCode.originCode
      };
      if (!isLeaf) payload.children = [];
      if (isFunction(cb)) return cb(payload, addressCode);
      return payload;
    });
  }

  function _extends$8() { _extends$8 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$8.apply(this, arguments); }
  var DEFAULT_INDEX = 0;

  var AddressPicker = function AddressPicker() {
    return {
      name: 'OmiAddressPicker',
      data: function data() {
        return {
          address: []
        };
      },
      props: {
        defaultIndex: {
          type: Number,
          default: DEFAULT_INDEX
        },
        data: {
          type: Object,
          default: null
        },
        title: {
          type: String,
          default: ''
        },
        confirmText: {
          type: String,
          default: ''
        },
        cancelText: {
          type: String,
          default: ''
        },
        onConfirm: {
          type: Function,
          default: function _default() {}
        },
        onCancel: {
          type: Function,
          default: function _default() {}
        }
      },
      watch: {
        data: {
          handler: function handler() {
            this.formateData();
          },
          immediate: true
        }
      },
      methods: {
        onChange: function onChange() {
          for (var _len = arguments.length, params = new Array(_len), _key = 0; _key < _len; _key++) {
            params[_key] = arguments[_key];
          }

          this.$emit.apply(this, ['change'].concat(params));
        },
        formateData: function formateData() {
          if (!this.data) return;
          var provinceMap = {};
          var cityMap = {};
          var _this$data = this.data,
              provinceList = _this$data.provinceList,
              cityList = _this$data.cityList,
              areaList = _this$data.areaList;
          var provinces = formateAddres(provinceList, PROVINCE, provinceMap, null, null, unDef(cityList));
          var cities = formateAddres(cityList, CTIY, cityMap, PROVINCE, null, unDef(areaList));
          formateAddres(areaList, AREA, null, CTIY, function (node, code) {
            var provinceCode = code.province,
                cityCode = code.city,
                areaCode = code.area;
            var parentKey = "" + provinceCode + cityCode;
            var cityIndex = cityMap[parentKey];

            if (!unDef(cityIndex)) {
              cities[cityIndex].children.push(node);
            } else {
              cities.push(node);
              cityMap[areaCode] = cities.length - 1;
            }
          }, true);
          cities.forEach(function (city) {
            var parentCode = city.parentCode,
                selfCode = city.selfCode;
            var index = provinceMap[parentCode];

            if (!unDef(index) && !unDef(provinces[index]) && !unDef(provinces[index].children)) {
              provinces[index].children.push(city);
            } else {
              var isOverSea = parentCode * 1 >= 90;

              if (isOverSea) {
                var overSeaIndex = provinceMap['90'];
                provinces[overSeaIndex].children.push(city);
              } else {
                provinces.push(city);
                provinceMap[selfCode] = provinces.length - 1;
              }
            }
          });
          this.address = provinces;
        },

        /**
         * @vue2doc-exposed-api:getValues
         * @return {Array} values
         */
        getValues: function getValues() {
          return this.$refs.picker.getValues().map(function (_ref) {
            var label = _ref.label,
                value = _ref.value;
            return {
              label: label,
              value: value
            };
          });
        },

        /**
         * @vue2doc-exposed-api:isScrolling
         * @return {Boolean}
         */
        isScrolling: function isScrolling() {
          return this.$refs.picker.isScrolling();
        }
      },
      render: function render() {
        var _this = this;

        var h = arguments[0];
        return h(Picker$1, {
          "attrs": {
            "cascade": true,
            "data": this.address,
            "title": this.title,
            "confirmText": this.confirmText,
            "cancelText": this.cancelText,
            "defaultIndex": this.defaultIndex
          },
          "ref": "picker",
          "on": {
            "change": this.onChange
          },
          "props": _extends$8({}, {
            onConfirm: function onConfirm() {
              return _this.onConfirm();
            },
            onCancel: function onCancel() {
              return _this.onCancel();
            }
          })
        });
      }
    };
  };

  var AddressPicker$1 = AddressPicker();

  AddressPicker$1.install = function (Vue) {
    Vue.component(AddressPicker$1.name, AddressPicker$1);
  };

  var DATE = 'date';
  var YEAR = 'year';
  var MONTH = 'month';
  var TIME = 'time';
  var DATE_TIME = 'datetime';
  var DEFAULT_TYPE = DATE;
  var DEFAULT_CURRENT_DATE = new Date();
  var MAX_YEAR = DEFAULT_CURRENT_DATE.getFullYear() + 10;
  var MIN_YEAR = DEFAULT_CURRENT_DATE.getFullYear() - 10;
  var pickerProps = {
    type: {
      type: String,
      default: DEFAULT_TYPE,
      validator: function validator(value) {
        return oneOf(value, [DATE, YEAR, MONTH, TIME, DATE_TIME]);
      }
    },
    currentDate: {
      type: Date,
      default: function _default() {
        return DEFAULT_CURRENT_DATE;
      },
      validator: function validator(value) {
        return isDate(value);
      }
    },
    max: {
      type: Date,
      default: function _default() {
        return new Date(MAX_YEAR, 11, 31, 23, 59);
      },
      validator: function validator(value) {
        return isDate(value);
      }
    },
    min: {
      type: Date,
      default: function _default() {
        return new Date(MIN_YEAR, 0, 1, 0, 0);
      },
      validator: function validator(value) {
        return isDate(value);
      }
    },
    filter: {
      type: Function,
      default: function _default(type, values) {
        return values;
      }
    },
    formatter: {
      type: Function,
      default: function _default(type, values) {
        return values;
      }
    }
  };

  function getDate(range) {
    var max = range[0],
        min = range[1];
    var values = []; // eslint-disable-next-line no-plusplus

    for (var i = min; i <= max; i++) {
      var value = "" + i;

      if (i < 10) {
        value = "0" + i;
      }

      values.push(value);
    }

    return values;
  }
  function getMonthLastDate(year, month) {
    return 32 - new Date(year, month, 32).getDate();
  }
  function formatDate(date) {
    if (!isDate(date)) return date;
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var hour = date.getHours();
    var minute = date.getMinutes();
    return {
      year: year,
      month: month,
      date: day,
      hour: hour,
      minute: minute
    };
  }

  function _extends$7() { _extends$7 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$7.apply(this, arguments); }

  var pcikerRender = function pcikerRender() {
    return {
      inheritAttrs: false,
      data: function data() {
        return {
          pickerDate: this.getValidateDate(this.currentDate)
        };
      },
      props: _extends$7({}, pickerProps),
      watch: {
        currentDate: function currentDate(date) {
          this.pickerDate = this.getValidateDate(date);
        },
        pickerDate: function pickerDate() {
          this.setActiveValue();
        }
      },
      methods: {
        getPicker: function getPicker() {
          return this.$refs.datePicker;
        },
        getValues: function getValues() {
          return this.$refs.datePicker.getValues();
        },
        setActiveValue: function setActiveValue(originValues, columIndex) {
          if (originValues === void 0) {
            originValues = null;
          }

          var values = originValues;

          if (unDef(originValues)) {
            var pickerDate = this.pickerDate,
                pickerType = this.pickerType;
            var date = formatDate(pickerDate);
            values = pickerType.map(function (type) {
              var value = "" + date[type];
              value = value < 10 ? "0" + value : value;
              return value;
            });
          }

          this.$refs.datePicker.setValues(values, columIndex); // this.$nextTick(() => {
          //   this.$nextTick(() => {});
          // });
        },
        onChange: function onChange(values, columIndex) {
          var _this = this;

          if (this.needUpdate) this.updateColums(values);
          this.$nextTick(function () {
            _this.$emit('change', values, columIndex);
          });
        },
        getValidateDate: function getValidateDate(date) {
          var type = this.type,
              min = this.min,
              max = this.max;

          if (type === TIME) {
            var _formatDate = formatDate(date),
                year = _formatDate.year,
                month = _formatDate.month,
                currentDate = _formatDate.date,
                currentHour = _formatDate.hour,
                currentMinute = _formatDate.minute;

            var _formatDate2 = formatDate(max),
                maxHour = _formatDate2.hour,
                maxMinute = _formatDate2.minute;

            var _formatDate3 = formatDate(min),
                minHour = _formatDate3.hour,
                minMinute = _formatDate3.minute;

            var hour = getRange(currentHour, maxHour, minHour);
            var minute = currentMinute;

            if (currentHour === maxHour) {
              minute = currentMinute > maxMinute ? maxMinute : currentMinute;
            }

            if (currentHour === minHour) {
              minute = currentMinute < minMinute ? minMinute : currentMinute;
            }

            return new Date(year, month, currentDate, hour, minute);
          }

          return new Date(getRange(date, max, min));
        }
      },
      computed: {
        needUpdate: function needUpdate() {
          var updateColums = this.updateColums,
              type = this.type;
          return isFunction(updateColums) && type !== MONTH && type !== YEAR;
        },
        colums: function colums() {
          var _this2 = this;

          var pickerType = this.pickerType,
              rangMap = this.rangMap;
          return pickerType.map(function (type) {
            var values = getDate(rangMap[type]);

            var filter = _this2.filter(type, values);

            values = filter || values;
            values = values.map(function (date) {
              var label = _this2.formatter(type, date);

              return {
                label: label,
                value: date,
                key: date
              };
            });
            return values;
          });
        },
        listeners: function listeners() {
          var onChange = this.onChange;
          return _extends$7({}, this.$listeners, {
            change: onChange
          });
        }
      },
      mounted: function mounted() {
        this.setActiveValue();
      },
      render: function render() {
        var h = arguments[0];
        var props = {
          props: this.$attrs,
          on: this.listeners
        };
        return h(Picker$1, _mergeJSXProps__default["default"]([{
          "ref": "datePicker",
          "attrs": {
            "data": this.colums
          }
        }, props]));
      }
    };
  };

  var renderMixin = pcikerRender();

  var _PICKER_TYPE_MAP;

  function _construct$1(Parent, args, Class) { if (_isNativeReflectConstruct$1()) { _construct$1 = Reflect.construct; } else { _construct$1 = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf$1(instance, Class.prototype); return instance; }; } return _construct$1.apply(null, arguments); }

  function _isNativeReflectConstruct$1() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

  function _setPrototypeOf$1(o, p) { _setPrototypeOf$1 = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf$1(o, p); }
  var maxDateMap = {
    month: 12,
    hour: 23,
    minute: 59,
    date: null
  };
  var minDateMap = {
    month: 1,
    hour: 0,
    minute: 0,
    date: 1
  };
  var PICKER_TYPE_MAP = (_PICKER_TYPE_MAP = {}, _PICKER_TYPE_MAP[YEAR] = ['year'], _PICKER_TYPE_MAP[MONTH] = ['month'], _PICKER_TYPE_MAP[DATE] = ['year', 'month', 'date'], _PICKER_TYPE_MAP[DATE_TIME] = ['year', 'month', 'date', 'hour', 'minute'], _PICKER_TYPE_MAP);

  var DateTimePicker = function DateTimePicker() {
    return {
      name: 'OmiDateTimePicker',
      mixins: [renderMixin],
      methods: {
        getDateRange: function getDateRange(type, currentDate) {
          var _ref;

          var date = this[type];
          var rangeMap = type === 'max' ? maxDateMap : minDateMap;
          var currentYear = currentDate.getFullYear();
          var currentMont = currentDate.getMonth();
          var year = date.getFullYear();
          var month = rangeMap.month;
          var hour = rangeMap.hour;
          var minute = rangeMap.minute;
          var day = rangeMap.date ? rangeMap.date : getMonthLastDate(currentYear, currentMont);

          if (currentYear === year) {
            month = date.getMonth() + 1;

            if (currentMont === month - 1) {
              day = date.getDate();

              if (currentDate.getDate() === day) {
                hour = date.getHours();

                if (currentDate.getHours() === hour) {
                  minute = date.getMinutes();
                }
              }
            }
          }

          return _ref = {}, _ref[type + "Year"] = year, _ref[type + "Month"] = month, _ref[type + "Date"] = day, _ref[type + "Hour"] = hour, _ref[type + "Minute"] = minute, _ref;
        },
        updateColums: function updateColums(values) {
          var pickerType = this.pickerType;
          var index = 0;
          var date = [];
          var year;
          var month;

          while (index < pickerType.length) {
            var value = values[index].value;
            if (pickerType[index] === 'year') year = value;

            if (pickerType[index] === 'month') {
              value -= 1;
              month = value;
            }

            if (pickerType[index] === 'date') {
              var max = year && month ? getMonthLastDate(year, month) : value;
              value = value > max ? max : value;
            }

            date.push(parseInt(value, 10));
            index += 1;
          }

          this.pickerDate = this.getValidateDate(_construct$1(Date, date));
        }
      },
      computed: {
        pickerType: function pickerType() {
          var type = this.type;
          return PICKER_TYPE_MAP[type];
        },
        rangMap: function rangMap() {
          var getDateRange = this.getDateRange,
              pickerDate = this.pickerDate;

          var _getDateRange = getDateRange('max', pickerDate),
              maxYear = _getDateRange.maxYear,
              maxMonth = _getDateRange.maxMonth,
              maxDate = _getDateRange.maxDate,
              maxHour = _getDateRange.maxHour,
              maxMinute = _getDateRange.maxMinute;

          var _getDateRange2 = getDateRange('min', pickerDate),
              minYear = _getDateRange2.minYear,
              minMonth = _getDateRange2.minMonth,
              minDate = _getDateRange2.minDate,
              minHour = _getDateRange2.minHour,
              minMinute = _getDateRange2.minMinute;

          return {
            year: [maxYear, minYear],
            month: [maxMonth, minMonth],
            hour: [maxHour, minHour],
            date: [maxDate, minDate],
            minute: [maxMinute, minMinute]
          };
        }
      }
    };
  };

  var DateTimePicker$1 = DateTimePicker();

  function _construct(Parent, args, Class) { if (_isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

  function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  var TimePicker = function TimePicker() {
    return {
      name: 'OmiTimePicker',
      mixins: [renderMixin],
      methods: {
        updateColums: function updateColums(values) {
          var pickerType = this.pickerType,
              pickerDate = this.pickerDate;
          var index = 0;
          var time = [];

          while (index < pickerType.length) {
            var value = values[index].value;
            time.push(parseInt(value, 10));
            index += 1;
          }

          var _formatDate = formatDate(pickerDate),
              year = _formatDate.year,
              month = _formatDate.month,
              date = _formatDate.date;

          this.pickerDate = this.getValidateDate(_construct(Date, [year, month, date].concat(time)));
        },
        getDateRange: function getDateRange(type, pickerDate) {
          var _ref;

          var date = this[type];

          var _formatDate2 = formatDate(pickerDate),
              currentHour = _formatDate2.hour;

          var hour = date.getHours();
          var minute = type === 'max' ? 59 : 0;

          if (date.getHours() === currentHour) {
            minute = date.getMinutes();
          }

          return _ref = {}, _ref[type + "Hour"] = hour, _ref[type + "Minute"] = minute, _ref;
        }
      },
      computed: {
        pickerType: function pickerType() {
          return ['hour', 'minute'];
        },
        rangMap: function rangMap() {
          var getDateRange = this.getDateRange,
              pickerDate = this.pickerDate;

          var _getDateRange = getDateRange('max', pickerDate),
              maxHour = _getDateRange.maxHour,
              maxMinute = _getDateRange.maxMinute;

          var _getDateRange2 = getDateRange('min', pickerDate),
              minHour = _getDateRange2.minHour,
              minMinute = _getDateRange2.minMinute;

          return {
            hour: [maxHour, minHour],
            minute: [maxMinute, minMinute]
          };
        }
      }
    };
  };

  var TimePicker$1 = TimePicker();

  function _extends$6() { _extends$6 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$6.apply(this, arguments); }

  var DatePicker = function DatePicker() {
    return {
      name: 'OmiDatePicker',
      inheritAttrs: false,
      props: _extends$6({}, pickerProps),
      methods: {
        /**
         * @vue2doc-exposed-api:getValues
         * @return {Array} values
        */
        getValues: function getValues() {
          return this.$refs.picker.getPicker().getValues();
        },

        /**
         * @vue2doc-exposed-api:setValues
         * @return {Array} values
        */
        setValues: function setValues(values, columIndex) {
          if (values === void 0) {
            values = null;
          }

          return this.$refs.picker.setActiveValue(values, columIndex);
        },

        /**
         * @vue2doc-exposed-api:isScrolling
         * @return {Boolean} values
        */
        isScrolling: function isScrolling() {
          return this.$refs.picker.getPicker().isScrolling();
        }
      },
      render: function render() {
        var h = arguments[0];
        var Picker = this.type !== TIME ? DateTimePicker$1 : TimePicker$1;
        var props = {
          props: this.$props,
          attrs: this.$attrs,
          on: this.$listeners
        };
        return h(Picker, _mergeJSXProps__default["default"]([{
          "ref": "picker"
        }, props]));
      }
    };
  };

  var DatePicker$1 = DatePicker();

  DatePicker$1.install = function (Vue) {
    Vue.component(DatePicker$1.name, DatePicker$1);
  };

  function _extends$5() { _extends$5 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$5.apply(this, arguments); }
  var script$7 = {
    name: 'OmiSearch',
    components: {
      Icon: Icon
    },
    data: function data() {
      return {
        inited: false,
        focused: false,
        cancelStyles: {
          margin: '-999px'
        },
        placeholderStyles: {},
        cancelWidth: 0
      };
    },
    mixins: [inpuMixin],
    props: {
      disabled: {
        type: Boolean,
        default: false
      },
      value: {
        type: String,
        default: ''
      },
      cancelText: {
        type: String,
        default: 'cancel'
      },
      placeholder: {
        type: String,
        default: ''
      },
      fixedCancel: {
        type: Boolean,
        default: false
      }
    },
    watch: {
      showCancel: {
        handler: function handler() {
          this.setFocusStyle();
        },
        immediate: true
      }
    },
    methods: {
      setFocusStyle: function setFocusStyle() {
        var _this = this;

        this.$nextTick(function () {
          _this.setCancelStyle();

          var offset = 0;

          if (_this.showCancel) {
            var offsetWidth = _this.$el.offsetWidth;
            var placeholder = _this.$refs.placeholder;
            var cancelWidth = _this.cancelWidth ? _this.cancelWidth : _this.getCancelWidth();
            var floor = Math.floor;
            offset = -floor(offsetWidth / 2 - placeholder.offsetWidth / 2 - cancelWidth / 2);
          }

          _this.placeholderStyles = {
            transform: "translate3d(" + offset + "px,0,0)"
          };
          setTimeout(function () {
            _this.inited = true;
          }, 16);
        });
      },
      onCancel: function onCancel() {
        this.$emit('input', '');
        this.$emit('cancel');
        this.$refs.input.blur();
      },
      onClear: function onClear() {
        this.$emit('input', '');
        this.$emit('clear');
        this.$refs.input.focus();
      },
      onFocus: function onFocus(e) {
        this.focused = true;
        this.$emit('focus', e);
      },
      onInputBlur: function onInputBlur(e) {
        this.focused = false;
        this.onBlur(e);
      },
      getCancelWidth: function getCancelWidth() {
        return this.$refs.cancel.offsetWidth;
      },
      setCancelStyle: function setCancelStyle() {
        var _this2 = this;

        this.$nextTick(function () {
          if (!_this2.showCancel && !_this2.fixedCancel) {
            var cancelWidth = _this2.getCancelWidth();

            _this2.cancelWidth = cancelWidth;
            _this2.cancelStyles = {
              margin: "-" + cancelWidth + "px"
            };
          } else {
            _this2.cancelStyles = {
              margin: 0
            };
          }
        });
      },
      initial: function initial() {
        var fixedCancel = this.fixedCancel;
        var cancelMargin = fixedCancel ? 0 : '-999px';
        this.cancelStyles = {
          margin: cancelMargin
        };
      }
    },
    computed: {
      showCancel: function showCancel() {
        return this.focused || this.showClear || this.fixedCancel;
      },
      showClear: function showClear() {
        return this.value !== '';
      },
      showPlaceholder: function showPlaceholder() {
        return !this.showClear && !this.isComposing;
      },
      innerClasses: function innerClasses() {
        return {
          'omi-search__focused': this.showCancel,
          'omi-search__animation': this.inited
        };
      },
      cancelClasses: function cancelClasses() {
        return {
          'omi-search__cancel--show': this.showCancel
        };
      },
      inputListeners: function inputListeners() {
        return _extends$5({}, this.listeners, {
          blur: this.onInputBlur
        });
      },
      placeholderTextStyle: function placeholderTextStyle() {
        return {
          opacity: this.showPlaceholder ? 1 : 0
        };
      },
      inputStyle: function inputStyle() {
        return {
          width: this.focused ? null : '100%'
        };
      }
    },
    beforeMount: function beforeMount() {},
    mounted: function mounted() {
      this.setCancelStyle();
    }
  };

  /* script */
  const __vue_script__$7 = script$7;

  /* template */
  var __vue_render__$7 = function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c("div", { staticClass: "omi-search omi-search__wrapper" }, [
      _c("div", { staticClass: "omi-search__inner", class: _vm.innerClasses }, [
        _c("div", { staticClass: "omi-search__input--wrapper" }, [
          _c(
            "div",
            {
              staticClass: "omi-search__placeholder",
              style: _vm.placeholderStyles
            },
            [
              _c(
                "div",
                {
                  ref: "placeholder",
                  staticClass: "omi-search__placeholder--wrapper"
                },
                [
                  _c(
                    "div",
                    { staticClass: "omi-search__search--icon" },
                    [
                      _vm._t("search-icon", function() {
                        return [_c("Icon", { attrs: { type: "search" } })]
                      })
                    ],
                    2
                  ),
                  _vm._v(" "),
                  _c(
                    "div",
                    {
                      staticClass: "omi-search__placeholder--text",
                      style: _vm.placeholderTextStyle
                    },
                    [_c("span", [_vm._v(_vm._s(_vm.placeholder))])]
                  )
                ]
              )
            ]
          ),
          _vm._v(" "),
          _c("div", { staticClass: "omi-search__content" }, [
            _c(
              "input",
              _vm._g(
                _vm._b(
                  {
                    ref: "input",
                    staticClass: "omi-input__inner omi-search__input",
                    attrs: { type: "search", disabled: _vm.disabled },
                    domProps: { value: _vm.value }
                  },
                  "input",
                  _vm.$attrs,
                  false
                ),
                _vm.inputListeners
              )
            )
          ]),
          _vm._v(" "),
          _c(
            "div",
            {
              directives: [
                {
                  name: "show",
                  rawName: "v-show",
                  value: _vm.showClear,
                  expression: "showClear"
                }
              ],
              staticClass: "omi-search__clear",
              on: { click: _vm.onClear }
            },
            [
              _c(
                "div",
                { staticClass: "omi-search__clear--btn" },
                [
                  _vm._t("clear-icon", function() {
                    return [_c("Icon", { attrs: { type: "close", size: 13 } })]
                  })
                ],
                2
              )
            ]
          )
        ]),
        _vm._v(" "),
        _c(
          "div",
          {
            ref: "cancel",
            staticClass: "omi-search__cancel",
            class: _vm.cancelClasses,
            style: _vm.cancelStyles,
            on: { click: _vm.onCancel }
          },
          [_c("div", [_vm._v(_vm._s(_vm.cancelText))])]
        )
      ])
    ])
  };
  var __vue_staticRenderFns__$7 = [];
  __vue_render__$7._withStripped = true;

    /* style */
    const __vue_inject_styles__$7 = undefined;
    /* scoped */
    const __vue_scope_id__$7 = undefined;
    /* module identifier */
    const __vue_module_identifier__$7 = undefined;
    /* functional template */
    const __vue_is_functional_template__$7 = false;
    /* style inject */
    
    /* style inject SSR */
    

    
    var Search = __vue_normalize____default["default"](
      { render: __vue_render__$7, staticRenderFns: __vue_staticRenderFns__$7 },
      __vue_inject_styles__$7,
      __vue_script__$7,
      __vue_scope_id__$7,
      __vue_is_functional_template__$7,
      __vue_module_identifier__$7,
      undefined,
      undefined
    );

  Search.install = function (Vue) {
    Vue.component(Search.name, Search);
  };

  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  var DEFAULT_SIZE = 24;
  var DEFAULT_FILL_COLOR = '#ffbb2a';
  var DEFAULT_VOID_COLOR = '#ddd';
  var script$6 = {
    name: 'OmiRate',
    model: {
      prop: 'score'
    },
    props: {
      voidColor: {
        type: String,
        default: DEFAULT_VOID_COLOR
      },
      fillColor: {
        type: String,
        default: DEFAULT_FILL_COLOR
      },
      size: {
        type: Number,
        default: DEFAULT_SIZE
      },
      total: {
        type: Number,
        default: 5
      },
      score: {
        type: Number,
        default: 0
      },
      readonly: {
        type: Boolean,
        default: false
      },
      halfRate: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      onClick: function onClick(i, e) {
        if (this.readonly) return;
        var score = i;

        if (this.halfRate) {
          score = this.isOverHald(e) ? i : i - 0.5;
        }

        this.$emit('input', score);

        if (score !== this.score) {
          this.$emit('change', score);
        }
      },
      isOverHald: function isOverHald(e) {
        var clientWidth = e.target.clientWidth;
        return e.offsetX >= clientWidth / 2;
      },
      getKey: function getKey(index) {
        return Date.now() + "_" + index;
      },
      getWidth: function getWidth(i) {
        var score = this.score;
        var ceil = Math.ceil(score);
        var width;

        if (i < score) {
          width = '100%';
        }

        if (i === ceil) {
          width = this.figureHalf(score);
        }

        return width;
      },
      figureHalf: function figureHalf(number) {
        var floor = Math.floor(number);
        var ceil = Math.ceil(number);

        if (ceil === number) {
          return '100%';
        }

        var digit = (number - floor) * 100;
        return digit + "%";
      },
      innerStyles: function innerStyles(index) {
        var width = 0;

        if (Math.ceil(this.score) >= index) {
          width = this.getWidth(index);
        }

        return {
          'font-size': this.size + "px",
          color: this.fillColor,
          width: "" + width
        };
      }
    },
    computed: {
      itemStyles: function itemStyles() {
        return {
          'font-size': this.size + "px",
          color: this.voidColor
        };
      },
      getInnerClass: function getInnerClass() {
        return ['omi-rate__item--inner', 'omi-icon-font', 'omi-collection_fill'];
      }
    }
  };

  /* script */
  const __vue_script__$6 = script$6;

  /* template */
  var __vue_render__$6 = function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c(
      "div",
      { staticClass: "omi-rate" },
      _vm._l(parseInt(_vm.total), function(i) {
        return _c(
          "span",
          { key: _vm.getKey(i), staticClass: "omi-rate__wrapper" },
          [
            _c(
              "i",
              {
                staticClass:
                  "omi-rate__item--wrapper omi-icon-font omi-collection_fill",
                style: _vm.itemStyles,
                on: {
                  click: function($event) {
                    $event.stopPropagation();
                    return _vm.onClick(i, $event)
                  }
                }
              },
              [_c("i", { class: _vm.getInnerClass, style: _vm.innerStyles(i) })]
            )
          ]
        )
      }),
      0
    )
  };
  var __vue_staticRenderFns__$6 = [];
  __vue_render__$6._withStripped = true;

    /* style */
    const __vue_inject_styles__$6 = undefined;
    /* scoped */
    const __vue_scope_id__$6 = undefined;
    /* module identifier */
    const __vue_module_identifier__$6 = undefined;
    /* functional template */
    const __vue_is_functional_template__$6 = false;
    /* style inject */
    
    /* style inject SSR */
    

    
    var Rate = __vue_normalize____default["default"](
      { render: __vue_render__$6, staticRenderFns: __vue_staticRenderFns__$6 },
      __vue_inject_styles__$6,
      __vue_script__$6,
      __vue_scope_id__$6,
      __vue_is_functional_template__$6,
      __vue_module_identifier__$6,
      undefined,
      undefined
    );

  Rate.install = function (Vue) {
    Vue.component(Rate.name, Rate);
  };

  var isTrue = function isTrue(value) {
    return value === true;
  };

  var DEFAULT_ACTIVE_INDEX = 0;

  var swipeMixin = function swipeMixin(listKey) {
    return {
      mixins: [panelMixin],
      data: function data() {
        return {
          activeIndex: DEFAULT_ACTIVE_INDEX,
          swiperWidth: 0,
          children: [],
          inited: false
        };
      },
      watch: {
        activeIndex: function activeIndex() {
          this.scrollPane();
        },
        shouldRender: function shouldRender(_shouldRender) {
          if (_shouldRender) this.initializeSwipe();
        }
      },
      props: {
        swipleable: {
          type: Boolean,
          default: true,
          validator: isTrue
        },
        animated: {
          type: Boolean,
          default: true,
          validator: isTrue
        },
        initialIndex: {
          type: Number,
          default: DEFAULT_ACTIVE_INDEX
        }
      },
      methods: {
        initializeSwipe: function initializeSwipe() {
          this.setSwiperWidth();
          this.activeIndex = this.initialIndex;
          this.inited = false;
          this.scrollPane();
        },
        getPaneWidth: function getPaneWidth() {
          return this.swiperWidth || this.$el.offsetWidth;
        },
        updateIndex: function updateIndex(currentIndex) {
          if (this.activeIndex !== currentIndex) {
            this.activeIndex = currentIndex;
            this.$emit('change', currentIndex);
          }
        },
        getScrollerClasses: function getScrollerClasses(className) {
          var _ref;

          return _ref = {
            'omi-swipe__content--wrapper': true
          }, _ref[className + "--wrapper"] = !unDef(className), _ref['omi-swipe__animated'] = this.inited, _ref;
        },
        getSwipeBody: function getSwipeBody(className) {
          var _this = this;

          var h = this.$createElement;
          return function (getList) {
            return h("div", {
              "class": ['omi-swipe__body', className],
              "ref": "pane"
            }, [h("div", {
              "class": _this.getScrollerClasses(className),
              "style": _this.swipeBodyStyles
            }, [getList('omi-swipe__item', _this.itemStyle)])]);
          };
        },
        setSwiperWidth: function setSwiperWidth() {
          var _this2 = this;

          this.$nextTick(function () {
            _this2.swiperWidth = _this2.$el.offsetWidth;
          });
        }
      },
      computed: {
        listLength: function listLength() {
          if (!isArray(this[listKey])) return 0;
          return this[listKey].length;
        },
        itemStyle: function itemStyle() {
          var swiperWidth = this.swiperWidth;
          return "width: " + swiperWidth + "px";
        },
        swipeBodyStyles: function swipeBodyStyles() {
          var paneStyles = this.paneStyles,
              swiperWidth = this.swiperWidth,
              listLength = this.listLength;
          var width = swiperWidth * listLength;
          return "width: " + width + "px; " + paneStyles;
        }
      },
      mounted: function mounted() {
        this.initializeSwipe();
      }
    };
  };

  var swipeMixin$1 = swipeMixin;

  function _extends$4() { _extends$4 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$4.apply(this, arguments); }

  var isNumber = function isNumber(value) {
    return /^\d*$/.test(value);
  };

  var formatSize = function formatSize(value) {
    if (unDef(value)) return null;
    var size = String(value);
    size = isNumber(size) ? size + "px" : size;
    return size;
  };

  var DEFAULT_PLACEHOLER_WIDTH = '100%';
  var DEFAULT_PLACEHOLER_HEIGHT$1 = '50px';
  var DEFAULT_ICON_SIZE = 24;

  var Image = function Image() {
    return {
      name: 'OmiImage',
      data: function data() {
        return {
          binded: false,
          loaded: false,
          error: false
        };
      },
      props: {
        placeholderWidth: {
          type: [String, Number],
          default: DEFAULT_PLACEHOLER_WIDTH
        },
        placeholderHeight: {
          type: [String, Number],
          default: DEFAULT_PLACEHOLER_HEIGHT$1
        },
        height: {
          type: [String, Number],
          default: null
        },
        width: {
          type: [String, Number],
          default: null
        },
        lazyLoad: {
          type: Boolean,
          default: false
        },
        src: {
          type: String,
          default: ''
        },
        iconSize: {
          type: Number,
          default: DEFAULT_ICON_SIZE
        }
      },
      methods: {
        isSameNode: function isSameNode(el) {
          return el === this.$refs.img;
        },
        onLoad: function onLoad() {
          this.loaded = true;
          this.$emit('loaded', this.$refs.img);
        },
        onError: function onError() {
          this.loaded = true;
          this.error = true;
          this.$emit('error', this.$refs.img);
        },
        getImage: function getImage() {
          var h = this.$createElement;
          var src = this.src;
          var props = {
            attrs: this.$attrs
          };

          if (this.lazyLoad) {
            return h("img", _mergeJSXProps__default["default"]([{
              "class": "omi-image__img",
              "ref": "img",
              "directives": [{
                name: "lazy",
                value: src
              }]
            }, props]));
          }

          return h("img", _mergeJSXProps__default["default"]([{
            "class": "omi-image__img",
            "attrs": {
              "src": src
            },
            "ref": "img",
            "on": {
              "load": this.onLoad,
              "error": this.onError
            }
          }, props]));
        },
        getPlaceholder: function getPlaceholder() {
          var h = this.$createElement;

          if (!this.loaded) {
            return h("div", {
              "class": "omi-image__placeholder",
              "key": "omiImagePlaceholder"
            }, [this.$slots.loading || h("div", {
              "class": "omi-image__loading omi-icon__wrapper"
            }, [h(Loading, {
              "attrs": {
                "size": this.iconSize,
                "spinner": true
              }
            })])]);
          }

          if (this.error) {
            return h("div", {
              "class": "omi-image__placeholder",
              "key": "omiImagePlaceholder"
            }, [this.$slots.error || h("div", {
              "class": "omi-image__error omi-icon__wrapper"
            }, [h(Icon, {
              "attrs": {
                "size": this.iconSize,
                "type": "prompt"
              }
            })])]);
          }

          return null;
        },
        onLazyLoaded: function onLazyLoaded(_ref) {
          var el = _ref.el;
          if (this.isSameNode(el) && !this.loaded) this.loaded = true;
        },
        onLazyError: function onLazyError(_ref2) {
          var el = _ref2.el;
          if (this.isSameNode(el) && !this.error) this.error = true;
        },
        bindLazyLoad: function bindLazyLoad() {
          var $Lazyload = this.$Lazyload;

          if ($Lazyload && !this.binded) {
            $Lazyload.$on('loaded', this.onLazyLoaded);
            $Lazyload.$on('error', this.onLazyError);
            this.binded = true;
          }
        },
        unbindLazyLoad: function unbindLazyLoad() {
          var $Lazyload = this.$Lazyload;

          if ($Lazyload && this.binded) {
            $Lazyload.$off('loaded', this.onLazyLoaded);
            $Lazyload.$off('error', this.onLazyError);
            this.binded = false;
          }
        }
      },
      computed: {
        showPlaceholder: function showPlaceholder() {
          return this.error || !this.loaded;
        },
        wrapperStyles: function wrapperStyles() {
          var width = formatSize(this.width);
          var height = formatSize(this.height);
          var placeholderHeight = formatSize(this.placeholderHeight);
          var placeholderWidth = formatSize(this.placeholderWidth);
          return {
            width: this.showPlaceholder ? placeholderWidth : width,
            height: this.showPlaceholder ? placeholderHeight : height
          };
        }
      },
      mounted: function mounted() {
        this.bindLazyLoad();
      },
      beforeDestroy: function beforeDestroy() {
        this.unbindLazyLoad();
      },
      render: function render() {
        var h = arguments[0];
        return h("div", {
          "class": "omi-image",
          "style": this.wrapperStyles,
          "on": _extends$4({}, this.$listeners)
        }, [this.getImage(), this.getPlaceholder()]);
      }
    };
  };

  var Image$1 = Image();

  Image$1.install = function (Vue) {
    Vue.component(Image$1.name, Image$1);
  };

  var DEFAULT_INITIAL_INDEX = 0;
  var OVERLAY_CLASSNAME = 'omi-image-preview__overlay';
  var DEFAULT_PLACEHOLER_HEIGHT = '150px';
  var props = {
    images: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    value: {
      type: Boolean,
      default: false
    },
    onClose: {
      type: Function,
      default: noop
    },
    initialIndex: {
      type: Number,
      default: DEFAULT_INITIAL_INDEX
    },
    overlayClassName: {
      type: String,
      default: OVERLAY_CLASSNAME
    },
    showClose: {
      type: Boolean,
      default: false
    },
    placeholderHeight: {
      type: [String, Number],
      default: DEFAULT_PLACEHOLER_HEIGHT
    }
  };
  var props$1 = props;

  function _extends$3() { _extends$3 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$3.apply(this, arguments); }

  var ImagePreview$2 = function ImagePreview() {
    return {
      name: 'OmiImagePreview',
      inheritAttrs: false,
      mixins: [popMixin(), swipeMixin$1('images')],
      props: _extends$3({}, props$1),
      methods: {
        beforeClose: function beforeClose() {
          var _this = this;

          var onClose = this.onClose;
          var promise = onClose.apply(void 0, arguments);

          if (isPromise(promise)) {
            promise.then(function () {
              return _this.close();
            });
          } else {
            // close is triggered by popMixin
            this.close();
          }
        },
        onClick: function onClick(target) {
          if (target !== 'close' && this.showClose) return;
          var activeIndex = this.activeIndex;
          this.beforeClose(activeIndex);
        },
        getSlot: function getSlot(slotName) {
          if (!unDef(this.$scopedSlots) && !unDef(this.$scopedSlots[slotName])) {
            return this.$scopedSlots[slotName];
          }

          return null;
        },
        getHeader: function getHeader() {
          var _this2 = this;

          var h = this.$createElement;
          var customHeader = this.getSlot('header');

          if (!unDef(customHeader)) {
            return h("div", {
              "class": "omi-image-preview__header"
            }, [customHeader(this.activeIndex)]);
          }

          if (!this.showClose) return null;
          return h("div", {
            "class": "omi-image-preview__header"
          }, [h("div", {
            "class": "omi-image-preview__close",
            "on": {
              "click": function click() {
                return _this2.onClick('close');
              }
            }
          }, [h(Icon, {
            "attrs": {
              "type": "close",
              "size": 22
            }
          })])]);
        },
        getBody: function getBody() {
          var _this3 = this;

          var h = this.$createElement;
          var genList = this.getSwipeBody('omi-imgae-preview__body');
          var children;
          var imageProps = {
            attrs: this.$attrs,
            props: {
              placeholderHeight: this.placeholderHeight
            }
          };
          return genList(function (swipeCls, itemStyle) {
            children = _this3.images.map(function (img) {
              return h("div", {
                "class": [swipeCls, 'omi-image-preview__item'],
                "style": itemStyle
              }, [!unDef(img) && isString(img) && h(Image$1, _mergeJSXProps__default["default"]([{
                "class": "omi-image-preview__img",
                "attrs": {
                  "src": img
                }
              }, imageProps]))]);
            });
            _this3.children = children;
            return children;
          });
        },
        getFooter: function getFooter() {
          var h = this.$createElement;
          var listLength = this.listLength;
          var indicator = this.activeIndex + 1 + " / " + listLength;
          var customIndicator = this.getSlot('indicator');

          if (customIndicator) {
            return h("div", {
              "class": "omi-image-preview__footer"
            }, [customIndicator(this.activeIndex)]);
          }

          return h("div", {
            "class": "omi-image-preview__footer"
          }, [h("span", {
            "class": "omi-image-preview__indicator"
          }, [indicator])]);
        }
      },
      computed: {
        wrapperStyles: function wrapperStyles() {
          return {
            zIndex: this.getZindex + 1
          };
        }
      },
      render: function render() {
        var _this4 = this;

        var h = arguments[0];
        if (!this.shouldRender) return null;
        return h("transition", {
          "attrs": {
            "name": "fade-in",
            "appear": true
          }
        }, [h("div", {
          "class": "omi-image-preview",
          "directives": [{
            name: "show",
            value: this.value
          }],
          "style": this.wrapperStyles,
          "on": {
            "click": function click() {
              return _this4.onClick();
            }
          }
        }, [this.getHeader(), this.getBody(), this.getFooter()])]);
      }
    };
  };

  var VueImagePreview = ImagePreview$2();

  function _extends$2() { _extends$2 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$2.apply(this, arguments); }
  var DEFAULT_OPTION = {
    images: [],
    value: false,
    onClose: function onClose() {}
  };
  var creator = createInstance({
    VueComponent: VueImagePreview,
    defaultOption: DEFAULT_OPTION,
    banMultiple: true
  });
  var ImagePreview = creator(function (getInstance, defaultOptions) {
    return function (opt) {
      if (isServer$1) return noop;

      if (opt && !isObject(opt)) {
        throw new Error('[omi ui]: Expected Object with option');
      }

      var imagePreview = getInstance();

      var option = _extends$2({}, defaultOptions, opt);

      Object.assign(imagePreview, option);
      imagePreview.value = true;
      return imagePreview;
    };
  });
  ImagePreview.Component = VueImagePreview; // ImagePreview.name = VueImagePreview;

  var ImagePreview$1 = ImagePreview;

  ImagePreview$1.install = function (Vue) {
    Vue.prototype.$imagePreview = ImagePreview$1;
    Vue.component(ImagePreview$1.Component.name, ImagePreview$1.Component);
  };

  //
  var DEFAULT_ITEM_INDEX = 0;
  var script$5 = {
    name: 'OmiTabBar',
    mixins: [providerMixin('omiTabBar')],
    props: {
      value: {
        type: [String, Number],
        default: DEFAULT_ITEM_INDEX
      },
      iconSize: {
        type: Number,
        default: null
      },
      activeColor: {
        type: String,
        default: null
      },
      zIndex: {
        type: Number,
        default: null
      }
    },
    methods: {
      getCildIndex: function getCildIndex(child) {
        return this.children.indexOf(child);
      },
      setActive: function setActive(activeIndex) {
        this.$emit('input', activeIndex);
        this.$emit('change', activeIndex);
      },
      isActiveItem: function isActiveItem(childIndex) {
        return childIndex === this.value;
      }
    },
    computed: {
      styles: function styles() {
        return {
          zIndex: this.zIndex
        };
      }
    }
  };

  /* script */
  const __vue_script__$5 = script$5;

  /* template */
  var __vue_render__$5 = function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c(
      "div",
      { staticClass: "omi-tabbar", style: _vm.styles },
      [_vm._t("default")],
      2
    )
  };
  var __vue_staticRenderFns__$5 = [];
  __vue_render__$5._withStripped = true;

    /* style */
    const __vue_inject_styles__$5 = undefined;
    /* scoped */
    const __vue_scope_id__$5 = undefined;
    /* module identifier */
    const __vue_module_identifier__$5 = undefined;
    /* functional template */
    const __vue_is_functional_template__$5 = false;
    /* style inject */
    
    /* style inject SSR */
    

    
    var Tabbar$1 = __vue_normalize____default["default"](
      { render: __vue_render__$5, staticRenderFns: __vue_staticRenderFns__$5 },
      __vue_inject_styles__$5,
      __vue_script__$5,
      __vue_scope_id__$5,
      __vue_is_functional_template__$5,
      __vue_module_identifier__$5,
      undefined,
      undefined
    );

  Tabbar$1.install = function (Vue) {
    Vue.component(Tabbar$1.name, Tabbar$1);
  };

  //
  var script$4 = {
    name: 'OmiTabBarItem',
    mixins: [injectMixin('omiTabBar')],
    inheritAttrs: false,
    components: {
      RouteButton: RouteButton$1,
      Icon: Icon,
      Badge: Badge
    },
    methods: {
      onClick: function onClick() {
        this.parent.setActive(this.activeKey);
      },
      getParentProps: function getParentProps(property) {
        return this.parent && this.parent[property];
      }
    },
    props: {
      name: {
        type: String,
        default: null
      },
      dot: {
        type: Boolean,
        default: false
      },
      dotMaxNumber: {
        type: Number,
        default: null
      },
      dotText: {
        type: String,
        default: ''
      },
      iconType: {
        type: String,
        default: ''
      },
      iconSize: {
        type: Number,
        default: null
      },
      activeColor: {
        type: String,
        default: null
      }
    },
    computed: {
      itemStyles: function itemStyles() {
        return {
          color: this.getActiveColor
        };
      },
      getActiveColor: function getActiveColor() {
        return this.activeColor || this.getParentProps('activeColor');
      },
      getIconSize: function getIconSize() {
        return this.iconSize || this.getParentProps('iconSize');
      },
      activeKey: function activeKey() {
        if (!unDef(this.name)) return this.name;
        return this.parent.getCildIndex(this);
      },
      activeItemClass: function activeItemClass() {
        if (this.parent && this.parent.isActiveItem(this.activeKey)) {
          return ['omi-tabbar-item__active'];
        }

        return [];
      }
    }
  };

  /* script */
  const __vue_script__$4 = script$4;

  /* template */
  var __vue_render__$4 = function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c(
      "div",
      {
        staticClass: "omi-tabbar-item",
        class: _vm.activeItemClass,
        style: _vm.itemStyles,
        on: { click: _vm.onClick }
      },
      [
        _c(
          "RouteButton",
          _vm._b({}, "RouteButton", _vm.$attrs, false),
          [
            _c(
              "badge",
              {
                attrs: {
                  dot: _vm.dot,
                  text: _vm.dotText,
                  maxNumber: _vm.dotMaxNumber
                }
              },
              [
                _vm._t("icon", function() {
                  return [
                    _vm.iconType
                      ? _c(
                          "div",
                          { staticClass: "omi-tabbar-item__icon" },
                          [
                            _c("Icon", {
                              attrs: { type: _vm.iconType, size: _vm.getIconSize }
                            })
                          ],
                          1
                        )
                      : _vm._e()
                  ]
                }),
                _vm._v(" "),
                _c(
                  "div",
                  { staticClass: "omi-tabbar-item__text" },
                  [_vm._t("default")],
                  2
                )
              ],
              2
            )
          ],
          1
        )
      ],
      1
    )
  };
  var __vue_staticRenderFns__$4 = [];
  __vue_render__$4._withStripped = true;

    /* style */
    const __vue_inject_styles__$4 = undefined;
    /* scoped */
    const __vue_scope_id__$4 = undefined;
    /* module identifier */
    const __vue_module_identifier__$4 = undefined;
    /* functional template */
    const __vue_is_functional_template__$4 = false;
    /* style inject */
    
    /* style inject SSR */
    

    
    var Tabbar = __vue_normalize____default["default"](
      { render: __vue_render__$4, staticRenderFns: __vue_staticRenderFns__$4 },
      __vue_inject_styles__$4,
      __vue_script__$4,
      __vue_scope_id__$4,
      __vue_is_functional_template__$4,
      __vue_module_identifier__$4,
      undefined,
      undefined
    );

  Tabbar.install = function (Vue) {
    Vue.component(Tabbar.name, Tabbar);
  };

  //
  var DEFAULT_ROW = 3;
  var DEFAULT_AVATAR_SIZE = 32;
  var DEFAUTL_TITLE_WIDTT = 40;
  var DEFAUTL_BUTTON_WIDTT = 100;
  var BUTTON_ROUND = 'round';
  var BUTTON_SQUARE = 'square';
  var AVATAR_ROUND = 'round';
  var AVATAR_SQUARE = 'square';
  var script$3 = {
    name: 'OmiSkeleton',
    props: {
      animate: {
        type: Boolean,
        default: true
      },
      avatar: {
        type: Boolean,
        default: false
      },
      titleWidth: {
        type: Number,
        default: DEFAUTL_TITLE_WIDTT
      },
      buttonWidth: {
        type: Number,
        default: DEFAUTL_BUTTON_WIDTT
      },
      avatarSize: {
        type: Number,
        default: DEFAULT_AVATAR_SIZE
      },
      title: {
        type: Boolean,
        default: true
      },
      loading: {
        type: Boolean,
        default: false
      },
      avatarShape: {
        type: String,
        default: AVATAR_ROUND,
        validator: function validator(value) {
          return oneOf(value, [AVATAR_SQUARE, AVATAR_ROUND]);
        }
      },
      buttonShape: {
        type: String,
        default: BUTTON_ROUND,
        validator: function validator(value) {
          return oneOf(value, [BUTTON_SQUARE, BUTTON_ROUND]);
        }
      },
      rows: {
        type: Number,
        default: DEFAULT_ROW
      }
    },
    computed: {
      titleStyles: function titleStyles() {
        return "width: " + this.titleWidth + "%";
      },
      buttonStyles: function buttonStyles() {
        return "width: " + this.buttonWidth + "%";
      },
      avatarStyles: function avatarStyles() {
        var avatarSize = this.avatarSize;
        return "width: " + avatarSize + "px; height: " + avatarSize + "px";
      },
      wrapperClass: function wrapperClass() {
        return {
          'omi-skeleton__animate': this.animate
        };
      },
      contentClass: function contentClass() {
        var buttonShape = this.buttonShape;
        return {
          'omi-skeleton__button--round': buttonShape === BUTTON_ROUND
        };
      },
      avatarClass: function avatarClass() {
        var avatarShape = this.avatarShape;
        return {
          'omi-skeleton__avatar--round': avatarShape === AVATAR_ROUND
        };
      }
    }
  };

  /* script */
  const __vue_script__$3 = script$3;

  /* template */
  var __vue_render__$3 = function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _vm.loading
      ? _c("div", { staticClass: "omi-skeleton", class: _vm.wrapperClass }, [
          _vm.avatar
            ? _c("div", {
                staticClass: "omi-skeleton-avatar",
                class: _vm.avatarClass,
                style: _vm.avatarStyles
              })
            : _vm._e(),
          _vm._v(" "),
          _c(
            "div",
            { staticClass: "omi-skeleton__body", class: _vm.contentClass },
            [
              _vm.title
                ? _c("h3", {
                    staticClass: "omi-skeleton__title",
                    style: _vm.titleStyles
                  })
                : _vm._e(),
              _vm._v(" "),
              _c(
                "ul",
                { staticClass: "omi-skeleton__content" },
                _vm._l(_vm.rows, function(row) {
                  return _c("li", { key: row, style: _vm.buttonStyles })
                }),
                0
              )
            ]
          )
        ])
      : _vm._e()
  };
  var __vue_staticRenderFns__$3 = [];
  __vue_render__$3._withStripped = true;

    /* style */
    const __vue_inject_styles__$3 = undefined;
    /* scoped */
    const __vue_scope_id__$3 = undefined;
    /* module identifier */
    const __vue_module_identifier__$3 = undefined;
    /* functional template */
    const __vue_is_functional_template__$3 = false;
    /* style inject */
    
    /* style inject SSR */
    

    
    var Skeleton = __vue_normalize____default["default"](
      { render: __vue_render__$3, staticRenderFns: __vue_staticRenderFns__$3 },
      __vue_inject_styles__$3,
      __vue_script__$3,
      __vue_scope_id__$3,
      __vue_is_functional_template__$3,
      __vue_module_identifier__$3,
      undefined,
      undefined
    );

  Skeleton.install = function (Vue) {
    Vue.component(Skeleton.name, Skeleton);
  };

  function parseFile(file, fileType) {
    return new Promise(function (resolve, reject) {
      var reader = new FileReader();

      if (fileType === 'file') {
        resolve();
        return;
      }

      reader.onload = function (e) {
        resolve(e.target.result);
      };

      reader.onerror = function () {
        reader.abort();
        reject(file);
      };

      if (fileType === 'dataUrl') {
        reader.readAsDataURL(file);
      }

      if (fileType === 'text') {
        reader.readAsText(file);
      }
    });
  }
  function isImage(file) {
    if (file.file && file.file.type) {
      return file.file.type.indexOf('image') >= 0;
    }

    var imgMime = /\.(jpeg|jpg|gif|png|svg|webp|jfif|bmp|dpg)/i;
    if (file.url && imgMime.test(file.url)) return true;
    return false;
  }

  function _extends$1() { _extends$1 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$1.apply(this, arguments); }
  var ADD_DEFAULT_SIZE = 32;
  var FILE_TYPE_DATA_URL = 'dataUrl';
  var FILE_TYPE_TEXT = 'text';
  var FILE_TYPE_FILE = 'file';
  var DEFUALT_FILE_TYPE = FILE_TYPE_DATA_URL;
  var DEFAULT_STATUS = 'ready';
  var UPLOAD_STATUS_SUCCESS = 'sccuess';
  var UPLOAD_STATUS_ERROR = 'error';
  var DEFUALT_STATUS_ICON_SIZE = 42;
  var DEFAULT_CIRCLE_RADIUS = 25;

  var Uploader = function Uploader() {
    return {
      name: 'OmiUploader',
      inheritAttrs: false,
      model: {
        prop: 'fileList'
      },
      props: {
        showProgress: {
          type: Boolean,
          default: true
        },
        accept: {
          type: String,
          default: 'image/*'
        },
        fileList: {
          type: Array,
          default: function _default() {
            return [];
          }
        },
        disabled: {
          type: Boolean,
          default: false
        },
        readType: {
          type: String,
          default: DEFUALT_FILE_TYPE,
          validator: function validator(value) {
            return oneOf(value, [FILE_TYPE_TEXT, FILE_TYPE_DATA_URL, FILE_TYPE_FILE]);
          }
        },
        max: {
          type: Number,
          default: Number.MAX_VALUE
        },
        deleteAble: {
          type: Boolean,
          default: true
        },
        afterAdd: {
          type: Function,
          default: function _default(data) {
            return data;
          }
        },
        beforeAdd: {
          type: Function,
          default: function _default() {
            return true;
          }
        },
        statusIconSize: {
          type: Number,
          default: DEFUALT_STATUS_ICON_SIZE
        },
        onExceed: {
          type: Function,
          defualt: noop
        },
        circleRadius: {
          type: Number,
          default: DEFAULT_CIRCLE_RADIUS
        },
        circleColor: {
          type: [String, Object],
          default: null
        }
      },
      methods: {
        clearInput: function clearInput() {
          this.$refs.uploader.value = '';
        },
        onChange: function onChange(e) {
          var _this = this;

          var files = [].slice.call(e.target.files); // const { files } = e.target;

          if (this.disabled || !files.length) return;

          if (this.fileList.length >= this.max) {
            this.onExceed();
            return;
          }

          var response = this.beforeAdd(files);

          if (isPromise(response)) {
            response.then(function (data) {
              var file = data || files;

              _this.parseFiles(file);
            }).catch(this.clearInput);
          } else if (!response) {
            this.clearInput();
            return;
          }

          this.parseFiles(files);
        },
        parseFiles: function parseFiles(files) {
          var _this2 = this;

          var fileList = files;

          if (!isArray(files)) {
            fileList = [].slice.call(files);
          }

          var remaining = this.max - this.fileList.length;

          if (remaining < fileList.length) {
            fileList = fileList.slice(0, remaining);
            this.onExceed();
          }

          Promise.all(fileList.map(function (file) {
            return parseFile(file, _this2.readType);
          })).then(function (contents) {
            var result = fileList.map(function (file, index) {
              var fileItem = {
                file: file,
                content: contents[index],
                progress: null,
                status: DEFAULT_STATUS,
                closeMask: false
              };
              return fileItem;
            });

            _this2.handleFiles(result);
          }).catch(function (file) {
            _this2.$emit('readError', file);

            _this2.clearInput();
          });
        },
        handleFiles: function handleFiles(files) {
          var fileList = [].concat(this.fileList, files);
          this.$emit('input', fileList);
          this.afterAdd(fileList);
        },
        onPreview: function onPreview(file, index) {
          var _this3 = this;

          ImagePreview$1({
            images: this.imagesUrl,
            initialIndex: index,
            onClose: function onClose() {
              _this3.$emit('closePreview');
            }
          });
          this.$emit('preview', file);
        },
        onDelete: function onDelete(file) {
          var fileList = [].concat(this.fileList);
          var fileIndex = fileList.indexOf(file);
          fileList.splice(fileIndex, 1);
          this.$emit('input', fileList);
          this.$emit('delete', file);
        },
        getUploader: function getUploader() {
          var h = this.$createElement;
          var CustomUploader = this.$slots.uploader;

          if (CustomUploader) {
            return h("div", {
              "class": "omi-uploader__upload--custom"
            }, [CustomUploader, h("input", {
              "ref": "uploader",
              "class": "omi-uploader__input",
              "attrs": _extends$1({
                "type": "file",
                "accept": this.accept,
                "disabled": this.disabled
              }, this.$attrs),
              "on": {
                "change": this.onChange
              }
            })]);
          }

          return h("div", {
            "class": "omi-uploader__upload"
          }, [h(Icon, {
            "attrs": {
              "type": "add",
              "size": ADD_DEFAULT_SIZE
            }
          }), h("input", {
            "ref": "uploader",
            "class": "omi-uploader__input",
            "attrs": _extends$1({
              "type": "file",
              "accept": this.accept,
              "disabled": this.disabled
            }, this.$attrs),
            "on": {
              "change": this.onChange
            }
          })]);
        },
        getCloseButton: function getCloseButton(file) {
          var _this4 = this;

          var h = this.$createElement;
          return h("div", {
            "class": "omi-uploader__close omi-icon__wrapper",
            "on": {
              "click": function click() {
                return _this4.onDelete(file);
              }
            }
          }, [h(Icon, {
            "attrs": {
              "type": "delete_fill"
            }
          })]);
        },
        getPreviewMask: function getPreviewMask(file) {
          var h = this.$createElement;
          var status = file.status,
              closeMask = file.closeMask;
          var isSuccess = status === UPLOAD_STATUS_SUCCESS;
          var isError = status === UPLOAD_STATUS_ERROR;
          var showProgress = file.progress >= 0 && !isError && !isSuccess;
          var CustomMask = this.$scopedSlots.mask;

          if (CustomMask) {
            return h("div", {
              "class": "omi-uploader__preview--mask",
              "directives": [{
                name: "show",
                value: !closeMask
              }]
            }, [CustomMask(file)]);
          }

          var Progress = h("div", {
            "class": "omi-uploader__progress",
            "directives": [{
              name: "show",
              value: showProgress
            }]
          }, [this.showProgress ? h(Circle, {
            "attrs": {
              "percentage": file.progress,
              "circleRadius": this.circleRadius,
              "strokeColor": this.circleColor
            }
          }) : h(Loading)]);
          var Status = h("transition", {
            "attrs": {
              "name": "fade-in"
            }
          }, [h("div", {
            "class": "omi-uploader__status",
            "directives": [{
              name: "show",
              value: isSuccess || isError
            }]
          }, [isSuccess && h(Icon, {
            "attrs": {
              "type": "success",
              "size": this.statusIconSize
            }
          }), isError && h(Icon, {
            "attrs": {
              "type": "prompt",
              "size": this.statusIconSize
            }
          })])]);
          return h("div", {
            "class": "omi-uploader__preview--mask",
            "directives": [{
              name: "show",
              value: !closeMask
            }]
          }, [Progress, Status]);
        },
        getPreview: function getPreview() {
          var _this5 = this;

          var h = this.$createElement;
          return this.fileList.map(function (file, index) {
            var isImageFile = isImage(file);
            var Inner = null;
            var CustomPreview = _this5.$scopedSlots.preview;

            if (CustomPreview) {
              return h("div", {
                "class": "omi-upload__preview--custom"
              }, [CustomPreview(file)]);
            }

            if (isImageFile) {
              Inner = h("div", {
                "class": "omi-uploader__image"
              }, [h(Image$1, {
                "attrs": {
                  "src": file.url || file.content,
                  "placeholderHeight": "100%"
                },
                "on": {
                  "click": function click() {
                    return _this5.onPreview(file, index);
                  }
                }
              })]);
            } else {
              Inner = h("div", {
                "class": "omi-uploader__file"
              }, [h(Icon, {
                "attrs": {
                  "type": "document",
                  "size": 32
                }
              }), h("span", [file.name])]);
            }

            return h("div", {
              "class": "omi-uploader__preview"
            }, [_this5.deleteAble && _this5.getCloseButton(file), Inner, _this5.getPreviewMask(file)]);
          });
        }
      },
      computed: {
        imagesUrl: function imagesUrl() {
          var list = [];
          this.fileList.forEach(function (file) {
            if (isImage(file)) {
              list.push(file.url || file.content);
            }
          });
          return list;
        }
      },
      render: function render() {
        var h = arguments[0];
        return h("div", {
          "class": "omi-uploader"
        }, [h("div", {
          "class": "omi-uploader__inner"
        }, [this.getPreview(), this.getUploader()])]);
      }
    };
  };

  var Uploader$1 = Uploader();

  Uploader$1.install = function (Vue) {
    Vue.component(Uploader$1.name, Uploader$1);
  };

  var DEFAULT_DURATION = 16;
  var scrollerMixin = {
    data: function data() {
      return {
        scoller: null
      };
    },
    mounted: function mounted() {
      if (this.scoller) return;
      this.scoller = getScroller(this.$el);
      this.scrollCallBack = throttle(this.onScroll, DEFAULT_DURATION);
      on(this.scoller, 'scroll', this.scrollCallBack);
    },
    beforeDestroy: function beforeDestroy() {
      off(this.scoller, 'scroll', this.scrollCallBack);
    }
  };

  //
  var script$2 = {
    name: 'OmiIndexBox',
    data: function data() {
      return {
        currentIndex: null,
        active: false,
        touching: false,
        anchorIndex: null
      };
    },
    mixins: [touchMixin, scrollerMixin, providerMixin('omiIndexBox')],
    props: {
      fixAnchor: {
        type: Boolean,
        default: true
      },
      indexs: {
        type: Array,
        default: getCharacter
      },
      showIndexTip: {
        type: Boolean,
        default: function _default() {
          return true;
        }
      }
    },
    watch: {
      touching: function touching(_touching) {
        if (_touching) {
          document.body.classList.add('omi-index-box__touching');
        } else {
          document.body.classList.remove('omi-index-box__touching');
        }
      }
    },
    computed: {
      isShowIndexTip: function isShowIndexTip() {
        var showIndexTip = this.showIndexTip,
            currentIndex = this.currentIndex,
            active = this.active;
        return showIndexTip && currentIndex !== null && active;
      }
    },
    methods: {
      getPoint: function getPoint(e) {
        if (e.touches) return e.touches[0];
        return e;
      },
      onTouchStart: function onTouchStart(e) {
        e.stopPropagation();
        this.touchStart(e);
        this.scrollIntoView(e);
        this.touching = true;
      },
      onTouchMove: function onTouchMove(e) {
        this.touchMove(e);
        e.preventDefault();
        var direction = this.direction;

        if (direction === 'vertical') {
          this.scrollIntoView(e);
        }
      },
      onTouchEnd: function onTouchEnd() {
        this.resetStatus();
      },
      onScroll: function onScroll() {
        var getOffsetTop = this.getOffsetTop,
            children = this.children;
        var scollerViewTop = getBoundingClientRect(this.scoller).top;
        var scrollTop = getScrollTop(this.scoller);
        var anchorsOffset = children.map(function (anchor) {
          var offsetTop = getOffsetTop(anchor.$el, scollerViewTop, scrollTop);
          return {
            offsetTop: offsetTop
          };
        });
        var anchorIndex = this.getActiveAnchor(anchorsOffset, scrollTop);
        this.anchorIndex = anchorIndex; // no anchor index found

        if (anchorIndex === -1) {
          this.resetActiveIndex();
          return;
        }

        var currentIndex = this.indexs[anchorIndex];
        this.currentIndex = currentIndex;

        if (this.fixAnchor) {
          this.updateAnchor(anchorIndex, anchorsOffset, scollerViewTop, scrollTop);
        }
      },
      resetStatus: function resetStatus() {
        this.active = false;
        this.touching = false;
      },
      resetActiveIndex: function resetActiveIndex() {
        // reset current index
        if (this.currentIndex !== null) {
          if (this.fixAnchor) {
            var activeAnchorIndex = this.indexs.indexOf(this.currentIndex);
            this.children[activeAnchorIndex].reset();
          }

          this.currentIndex = null;
        } else {
          this.children.forEach(function (anchor) {
            if (anchor.active) anchor.reset();
          });
        }
      },
      getActiveAnchor: function getActiveAnchor(anchorsOffset, scrollTop) {
        var children = this.children; // eslint-disable-next-line no-plusplus

        for (var i = children.length - 1; i >= 0; i--) {
          var preHeight = i > 0 ? children[i - 1].height : 0;
          var reachTop = this.fixAnchor ? preHeight : 0;
          var top = anchorsOffset[i].offsetTop;
          if (top <= scrollTop + reachTop) return i;
        }

        return -1;
      },
      getOffsetTop: function getOffsetTop(el, scollerViewTop, scrollTop) {
        var scoller = this.scoller;
        var elViewTop = el.getBoundingClientRect().top;

        if (scoller === window || scoller === document.body) {
          if (el === window) return 0;
          return elViewTop + getRootPageYOffset();
        }

        return elViewTop - scollerViewTop + scrollTop;
      },
      updateAnchor: function updateAnchor(anchorIndex, anchorsOffset, scollerViewTop, scrollTop) {
        var curIndex = this.indexs[anchorIndex];
        var preIndex = this.indexs[anchorIndex - 1];
        this.children.forEach(function (anchor) {
          var index = anchor.index;
          if (index !== curIndex || index !== preIndex) anchor.reset();
        });
        var activeAnchorEle = this.children[anchorIndex];
        var offsetTop = anchorsOffset[anchorIndex].offsetTop - scrollTop;

        if (anchorIndex > 0) {
          var preAnchorEle = this.children[anchorIndex - 1];

          if (offsetTop > 0) {
            var preHeight = preAnchorEle.height;
            preAnchorEle.update({
              top: offsetTop - preHeight + scollerViewTop
            });
          } else {
            preAnchorEle.reset();
          }
        }

        activeAnchorEle.update({
          top: Math.max(0, offsetTop) + scollerViewTop
        });
      },
      getSelectElement: function getSelectElement(e, isClick) {
        if (isClick) return e.target;

        var _this$getPoint = this.getPoint(e),
            clientX = _this$getPoint.clientX,
            clientY = _this$getPoint.clientY;

        return document.elementFromPoint(clientX, clientY);
      },
      scrollIntoView: function scrollIntoView(e, isClick) {
        if (isClick === void 0) {
          isClick = false;
        }

        var indexElement = this.getSelectElement(e, isClick);
        if (!indexElement || !this.isIndexEle(indexElement)) return;
        var index = indexElement.dataset.index;

        if (this.currentIndex !== index) {
          this.currentIndex = index;
          var activeAnchor = this.children.filter(function (anchor) {
            return anchor.index === index;
          });
          this.scrollTo(activeAnchor[0]);
        }

        this.active = true;
        this.$emit('select', index);
      },
      isIndexEle: function isIndexEle(child) {
        return this.$refs.indexItem.some(function (item) {
          return item === child;
        });
      },
      scrollTo: function scrollTo(vnode) {
        if (vnode) {
          vnode.$el.scrollIntoView();
        }
      }
    }
  };

  /* script */
  const __vue_script__$2 = script$2;

  /* template */
  var __vue_render__$2 = function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c(
      "div",
      { staticClass: "omi-index-box__wrapper", on: { touchend: _vm.onTouchEnd } },
      [
        _c(
          "ul",
          {
            staticClass: "omi-index-box__list",
            on: { touchstart: _vm.onTouchStart, touchmove: _vm.onTouchMove }
          },
          [
            _c(
              "li",
              {
                directives: [
                  {
                    name: "show",
                    rawName: "v-show",
                    value: _vm.isShowIndexTip,
                    expression: "isShowIndexTip"
                  }
                ],
                staticClass: "omi-index-box__tip"
              },
              [_vm._v(_vm._s(_vm.currentIndex))]
            ),
            _vm._v(" "),
            _vm._l(_vm.indexs, function(char) {
              return _c(
                "li",
                {
                  key: char,
                  ref: "indexItem",
                  refInFor: true,
                  staticClass: "omi-index-box__item",
                  class: { "omi-index-box__active": char === _vm.currentIndex },
                  attrs: { "data-index": char },
                  on: { touchstart: _vm.onTouchStart }
                },
                [_vm._v(_vm._s(char))]
              )
            })
          ],
          2
        ),
        _vm._v(" "),
        _vm._t("default")
      ],
      2
    )
  };
  var __vue_staticRenderFns__$2 = [];
  __vue_render__$2._withStripped = true;

    /* style */
    const __vue_inject_styles__$2 = undefined;
    /* scoped */
    const __vue_scope_id__$2 = undefined;
    /* module identifier */
    const __vue_module_identifier__$2 = undefined;
    /* functional template */
    const __vue_is_functional_template__$2 = false;
    /* style inject */
    
    /* style inject SSR */
    

    
    var IndexBox = __vue_normalize____default["default"](
      { render: __vue_render__$2, staticRenderFns: __vue_staticRenderFns__$2 },
      __vue_inject_styles__$2,
      __vue_script__$2,
      __vue_scope_id__$2,
      __vue_is_functional_template__$2,
      __vue_module_identifier__$2,
      undefined,
      undefined
    );

  IndexBox.install = function (Vue) {
    Vue.component(IndexBox.name, IndexBox);
  };

  //
  var script$1 = {
    name: 'OmiIndexAnchor',
    mixins: [injectMixin('omiIndexBox')],
    data: function data() {
      return {
        offsetTop: 0,
        active: false,
        height: null
      };
    },
    props: {
      title: {
        type: String,
        default: function _default() {
          return '';
        }
      },
      zIndex: {
        type: Number,
        default: 1
      },
      index: {
        type: String,
        required: true
      }
    },
    methods: {
      update: function update(_ref) {
        var top = _ref.top;
        this.active = true;
        this.offsetTop = top;
      },
      reset: function reset() {
        this.active = false;
        this.offsetTop = 0;
      }
    },
    computed: {
      styles: function styles() {
        if (this.active) {
          return "\n        height: " + this.height + "px; \n        transform: translate3d(0, " + this.offsetTop + "px,0);\n        z-index:" + this.zIndex + ";\n        ";
        }

        return '';
      }
    },
    mounted: function mounted() {
      this.height = this.$el.offsetHeight;
    }
  };

  /* script */
  const __vue_script__$1 = script$1;

  /* template */
  var __vue_render__$1 = function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c(
      "div",
      {
        staticClass: "omi-index-anchor",
        style: { height: _vm.active ? _vm.height + "px" : null }
      },
      [
        _c(
          "div",
          {
            staticClass: "omi-index-anchor__inner",
            class: { "omi-index-anchor__active": _vm.active },
            style: _vm.styles
          },
          [
            _vm._t("default", function() {
              return [_vm._v(_vm._s(_vm.title))]
            })
          ],
          2
        )
      ]
    )
  };
  var __vue_staticRenderFns__$1 = [];
  __vue_render__$1._withStripped = true;

    /* style */
    const __vue_inject_styles__$1 = undefined;
    /* scoped */
    const __vue_scope_id__$1 = undefined;
    /* module identifier */
    const __vue_module_identifier__$1 = undefined;
    /* functional template */
    const __vue_is_functional_template__$1 = false;
    /* style inject */
    
    /* style inject SSR */
    

    
    var IndexAnchor = __vue_normalize____default["default"](
      { render: __vue_render__$1, staticRenderFns: __vue_staticRenderFns__$1 },
      __vue_inject_styles__$1,
      __vue_script__$1,
      __vue_scope_id__$1,
      __vue_is_functional_template__$1,
      __vue_module_identifier__$1,
      undefined,
      undefined
    );

  IndexAnchor.install = function (Vue) {
    Vue.component(IndexAnchor.name, IndexAnchor);
  };

  function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
  var DEFAULT_THRESHOLD = 0.5;
  var STATUS_ARRIVE = 'arrive';
  var STATUS_RESET = 'reset';
  var STATUS_MOVING = 'moving';
  var STATUS_RESTING = 'reseting';
  var MINI_DISTANCE = 5;
  var abs = Math.abs;
  var script = {
    name: 'OmiSwipeAction',
    data: function data() {
      return {
        documentBody: null,
        startX: 0,
        startY: 0,
        moveX: 0,
        isHolding: false,
        status: STATUS_RESET,
        initialOffset: 0,
        slideArea: null,
        preX: 0,
        clientWith: {
          left: 0,
          right: 0
        }
      };
    },
    components: {
      Cell: Cell,
      Icon: Icon
    },
    props: {
      text: {
        type: String
      },
      showArrow: {
        type: Boolean,
        default: true
      },
      threshold: {
        type: Number,
        default: DEFAULT_THRESHOLD
      },
      autoClose: {
        type: [Function, Boolean],
        default: function _default() {
          return false;
        }
      }
    },
    watch: {
      isMoving: function isMoving(_isMoving) {
        if (_isMoving) {
          this.preventDefaultEVent();
        } else {
          this.removePreventClass();
        }
      }
    },
    computed: {
      styles: function styles() {
        var status = this.status,
            isHolding = this.isHolding;

        if (status !== STATUS_RESET || isHolding) {
          return "\n          touch-action: pan-y;\n          transform: translate3d(" + this.moveX + "px, 0,0) scale(1);\n        ";
        }

        return null;
      },
      isMoving: function isMoving() {
        var status = this.status,
            isHolding = this.isHolding;

        if (status === STATUS_MOVING) {
          return true;
        }

        if (status === STATUS_RESET && isHolding) {
          return true;
        }

        return false;
      }
    },
    methods: {
      removePreventClass: function removePreventClass() {
        this.documentBody.classList.remove('omi-swipe-action__no--event');
      },
      preventDefaultEVent: function preventDefaultEVent() {
        this.documentBody.classList.add('omi-swipe-action__no--event');
      },
      isVertical: function isVertical(x, y) {
        var offsetX = abs(x - this.startX);
        var offsetY = abs(y - this.startY);
        if (offsetY > offsetX && offsetY > MINI_DISTANCE) return true;
        return false;
      },

      /**
       * @vue2doc-exposed-api:close
      */
      close: function close() {
        this.restPosition(0);
      },
      onClick: function onClick(e) {
        var _this = this;

        var autoClose = this.autoClose;

        if (this.status === STATUS_ARRIVE) {
          var isAutoClose = autoClose;

          if (isFunction(autoClose)) {
            autoClose(e, function () {
              _this.restPosition(0);
            });
          } else if (isAutoClose) this.restPosition(0);
        }

        this.$emit('click', e);

        if (this.isHolding) {
          this.isHolding = false;
        }
      },
      setStatus: function setStatus(status) {
        this.status = status;
      },
      onTransitionEnd: function onTransitionEnd() {
        if (this.status === STATUS_RESTING) {
          this.setStatus(STATUS_RESET);
        }
      },
      onTouchStart: function onTouchStart(e) {
        this.startX = this.getPoint(e).clientX;
        this.startY = this.getPoint(e).clientY;
        this.preX = this.startX; // 当前是左侧操作块滑动还是右侧滑动

        this.initialOffset = this.moveX;
        this.isHolding = true;
      },
      onTouchEnd: function onTouchEnd(e) {
        var moveX = this.getPoint(e).clientX;
        var distance = this.getDistance(moveX);
        var direction = this.theDirection(moveX, this.preX);
        var actionWith = this.getFinalPosition(direction);
        var threshold = this.threshold;

        if (this.threshold > 1 || this.threshold <= 0) {
          threshold = DEFAULT_THRESHOLD;
        }

        if (actionWith !== 0 && abs(distance) >= abs(actionWith) * threshold) {
          this.moveToFinal(actionWith, 0);
        } else if (this.status !== STATUS_ARRIVE) {
          this.restPosition(0);
        }

        this.isHolding = false;
      },
      getFinalPosition: function getFinalPosition(direction) {
        var clientWith = this.clientWith,
            slideArea = this.slideArea;

        if (slideArea === 'right') {
          if (direction === 'left') {
            return 0 - clientWith.right;
          }
        } else if (slideArea === 'left') {
          if (direction === 'right') {
            return 0 + clientWith.left;
          }
        }

        return 0;
      },
      getDistance: function getDistance(moveX) {
        var distance = moveX - this.startX + this.initialOffset; // eslint-disable-next-line radix

        return parseInt(distance);
      },
      onMove: function onMove(e) {
        var moveX = this.getPoint(e).clientX;
        var moveY = this.getPoint(e).clientY;
        var status = this.status;
        if (status === STATUS_RESET && this.isVertical(moveX, moveY)) return;
        var direction = this.theDirection(moveX, this.preX);

        if (this.slideArea === null) {
          this.setSlideArea(direction);
        }

        if (this.invalidMove(moveX, this.startX)) {
          this.moveToFinal(this.getFinalPosition(direction), null);
          return;
        }

        var distance = this.getDistance(moveX);
        this.preX = moveX;
        this.walk(distance);
      },
      walk: function walk(position) {
        this.setStatus(STATUS_MOVING);
        this.moveTo(position);
      },
      moveToFinal: function moveToFinal(position, prex) {
        if (position === 0) {
          this.restPosition(prex);
        } else {
          this.moveTo(position);
          this.setStatus(STATUS_ARRIVE);
        }
      },
      restPosition: function restPosition(preX) {
        if (preX !== null) {
          this.preX = preX;
        }

        this.slideArea = null;
        this.setStatus(STATUS_RESTING);
        this.moveTo(0);
        this.setStatus(STATUS_RESET);
      },
      setSlideArea: function setSlideArea(direction) {
        this.slideArea = direction === 'left' ? 'right' : 'left';
        return this.slideArea;
      },
      moveTo: function moveTo(distance) {
        this.moveX = distance;
      },
      isOverOffset: function isOverOffset(moveX) {
        var slideArea = this.slideArea;
        var distance = this.getDistance(moveX);
        var actionWith = this.clientWith[slideArea]; // 判断是否超过操作按钮宽度,以及是否触及边缘

        if (actionWith !== 0 && abs(distance) >= abs(actionWith) || this.isOverBorder(slideArea, this.moveX)) {
          return true;
        }

        return false;
      },
      isOverBorder: function isOverBorder(slideArea, offset) {
        if (slideArea === 'right') {
          return offset >= 0;
        }

        return offset <= 0;
      },
      invalidMove: function invalidMove(moveX, startX) {
        var reset = this.status === STATUS_RESET;
        var direction = this.theDirection(moveX, this.startX);
        if (moveX === startX) return true;
        if (reset && !this.showSlot('left') && direction === 'right') return true;
        if (reset && !this.showSlot('right') && direction === 'left') return true;
        if (!reset && this.isOverOffset(moveX)) return true;
        return false;
      },
      theDirection: function theDirection(moveX, preX) {
        return moveX - preX > 0 ? 'right' : 'left';
      },
      getPoint: function getPoint(e) {
        return e.changedTouches[0];
      },
      showSlot: function showSlot(where) {
        return this.$slots[where];
      },
      getEleClientWith: function getEleClientWith(el) {
        return el.clientWidth;
      },
      setClientWith: function setClientWith(slotType, refKey) {
        if (this.showSlot(slotType)) {
          var _extends2;

          var el = this.$refs[slotType];
          var clientWith = this.getEleClientWith(el);
          this.clientWith = _extends({}, this.clientWith, (_extends2 = {}, _extends2[refKey] = clientWith, _extends2));
        }
      }
    },
    mounted: function mounted() {
      this.documentBody = document.body;
      this.setClientWith('right', 'right');
      this.setClientWith('left', 'left');
    }
  };

  /* script */
  const __vue_script__ = script;

  /* template */
  var __vue_render__ = function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c("Cell", {
      staticClass: "omi-swipe-action__wrap",
      class: { "omi-swipe-action__moving": _vm.isMoving },
      scopedSlots: _vm._u(
        [
          {
            key: "content",
            fn: function() {
              return [
                _vm.showSlot("left")
                  ? _c(
                      "div",
                      {
                        ref: "left",
                        staticClass:
                          "omi-swipe-action__actions omi-swipe-action__left"
                      },
                      [_vm._t("left")],
                      2
                    )
                  : _vm._e(),
                _vm._v(" "),
                _vm.showSlot("right")
                  ? _c(
                      "div",
                      {
                        ref: "right",
                        staticClass:
                          "omi-swipe-action__actions omi-swipe-action__right"
                      },
                      [_vm._t("right")],
                      2
                    )
                  : _vm._e(),
                _vm._v(" "),
                _c(
                  "div",
                  {
                    staticClass:
                      "omi-swipe-action__content omi-swipe-action__transform",
                    style: _vm.styles,
                    on: {
                      touchstart: _vm.onTouchStart,
                      touchend: _vm.onTouchEnd,
                      touchmove: _vm.onMove,
                      transitionend: _vm.onTransitionEnd,
                      click: _vm.onClick
                    }
                  },
                  [
                    _c(
                      "div",
                      { staticClass: "omi-swipe-action__item--text" },
                      [
                        _vm._t("default", function() {
                          return [_vm._v(_vm._s(_vm.text))]
                        })
                      ],
                      2
                    ),
                    _vm._v(" "),
                    _vm.showSlot("extra")
                      ? _c(
                          "div",
                          { staticClass: "omi-swipe-action__item--extra" },
                          [_vm._t("extra")],
                          2
                        )
                      : _vm._e(),
                    _vm._v(" "),
                    _vm._t("arrow", function() {
                      return [
                        _vm.showArrow
                          ? _c("Icon", { attrs: { type: "enter" } })
                          : _vm._e()
                      ]
                    })
                  ],
                  2
                )
              ]
            },
            proxy: true
          }
        ],
        null,
        true
      )
    })
  };
  var __vue_staticRenderFns__ = [];
  __vue_render__._withStripped = true;

    /* style */
    const __vue_inject_styles__ = undefined;
    /* scoped */
    const __vue_scope_id__ = undefined;
    /* module identifier */
    const __vue_module_identifier__ = undefined;
    /* functional template */
    const __vue_is_functional_template__ = false;
    /* style inject */
    
    /* style inject SSR */
    

    
    var SwipeAction = __vue_normalize____default["default"](
      { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
      __vue_inject_styles__,
      __vue_script__,
      __vue_scope_id__,
      __vue_is_functional_template__,
      __vue_module_identifier__,
      undefined,
      undefined
    );

  SwipeAction.install = function (Vue) {
    Vue.component(SwipeAction.name, SwipeAction);
  };

  var components = {
    Form: Form,
    FormItem: FormItem,
    Input: Input,
    Cell: Cell,
    CellGroup: CellGrounp,
    Button: Button,
    Loading: Loading,
    Checkbox: CheckBox$1,
    CheckboxGroup: CheckboxGroup,
    Redio: Radio$1,
    RadioGroup: RadioGroup,
    Icon: Icon,
    Circle: Circle,
    Switch: Switch,
    Collapse: Collapse,
    CollapseItem: CollapseItem,
    ActionSheet: ActionSheet$1,
    Dialog: Dialog$1.Component,
    LoadMore: LoadMore,
    PullRefresh: PullFresh$1,
    Tabs: Tabs,
    TabsPane: TabsPanel,
    Badge: Badge,
    Picker: Picker$1,
    AddressPicker: AddressPicker$1,
    DatePicker: DatePicker$1,
    Search: Search,
    Rate: Rate,
    ImagePreview: ImagePreview$1.Component,
    Image: Image$1,
    TabBar: Tabbar$1,
    TabBarItem: Tabbar,
    Skeleton: Skeleton,
    Uploader: Uploader$1,
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

    Vue.prototype.$toast = Toast$1;
    Vue.prototype.$dialog = Dialog$1;
    Vue.prototype.$imagePreview = ImagePreview$1;
  };

  var index = {
    version: "" + process.env.PACKAGE_VERSION,
    install: install,
    components: components
  };

  return index;

}));
