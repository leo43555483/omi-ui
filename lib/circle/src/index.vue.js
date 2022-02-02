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
  

  
  var Circle = __vue_normalize____default["default"](
    { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
    __vue_inject_styles__,
    __vue_script__,
    __vue_scope_id__,
    __vue_is_functional_template__,
    __vue_module_identifier__,
    undefined,
    undefined
  );

exports["default"] = Circle;
