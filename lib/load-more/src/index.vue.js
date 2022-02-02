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
  

  
  var LoadMore = __vue_normalize____default["default"](
    { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
    __vue_inject_styles__,
    __vue_script__,
    __vue_scope_id__,
    __vue_is_functional_template__,
    __vue_module_identifier__,
    undefined,
    undefined
  );

exports["default"] = LoadMore;
