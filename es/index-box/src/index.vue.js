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
  

  
  var IndexBox = __vue_normalize__(
    { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
    __vue_inject_styles__,
    __vue_script__,
    __vue_scope_id__,
    __vue_is_functional_template__,
    __vue_module_identifier__,
    undefined,
    undefined
  );

export { IndexBox as default };
