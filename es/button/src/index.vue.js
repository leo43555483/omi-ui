import script from './index.vue_rollup-plugin-vue_script.js';
import __vue_normalize__ from 'vue-runtime-helpers/dist/normalize-component.js';

/* script */
const __vue_script__ = script;

/* template */
var __vue_render__ = function() {
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
  

  
  var Button = __vue_normalize__(
    { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
    __vue_inject_styles__,
    __vue_script__,
    __vue_scope_id__,
    __vue_is_functional_template__,
    __vue_module_identifier__,
    undefined,
    undefined
  );

export { Button as default };
