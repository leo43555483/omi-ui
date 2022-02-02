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
  

  
  var Rate = __vue_normalize__(
    { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
    __vue_inject_styles__,
    __vue_script__,
    __vue_scope_id__,
    __vue_is_functional_template__,
    __vue_module_identifier__,
    undefined,
    undefined
  );

export { Rate as default };
