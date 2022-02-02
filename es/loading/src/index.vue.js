import script from './index.vue_rollup-plugin-vue_script.js';
import __vue_normalize__ from 'vue-runtime-helpers/dist/normalize-component.js';

/* script */
const __vue_script__ = script;
/* template */
var __vue_render__ = function() {
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
  

  
  var Loading = __vue_normalize__(
    { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
    __vue_inject_styles__,
    __vue_script__,
    __vue_scope_id__,
    __vue_is_functional_template__,
    __vue_module_identifier__,
    undefined,
    undefined
  );

export { Loading as default };
