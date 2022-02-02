'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var index_vue_rollupPluginVue_script = require('./index.vue_rollup-plugin-vue_script.js');
var __vue_normalize__ = require('vue-runtime-helpers/dist/normalize-component.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var __vue_normalize____default = /*#__PURE__*/_interopDefaultLegacy(__vue_normalize__);

/* script */
const __vue_script__ = index_vue_rollupPluginVue_script["default"];

/* template */
var __vue_render__ = function() {
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
  

  
  var Tabbar = __vue_normalize____default["default"](
    { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
    __vue_inject_styles__,
    __vue_script__,
    __vue_scope_id__,
    __vue_is_functional_template__,
    __vue_module_identifier__,
    undefined,
    undefined
  );

exports["default"] = Tabbar;
