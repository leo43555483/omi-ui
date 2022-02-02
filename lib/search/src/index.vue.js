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
  

  
  var Search = __vue_normalize____default["default"](
    { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
    __vue_inject_styles__,
    __vue_script__,
    __vue_scope_id__,
    __vue_is_functional_template__,
    __vue_module_identifier__,
    undefined,
    undefined
  );

exports["default"] = Search;
