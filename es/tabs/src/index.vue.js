import script from './index.vue_rollup-plugin-vue_script.js';
import __vue_normalize__ from 'vue-runtime-helpers/dist/normalize-component.js';

/* script */
const __vue_script__ = script;

/* template */
var __vue_render__ = function() {
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
  

  
  var Tabs = __vue_normalize__(
    { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
    __vue_inject_styles__,
    __vue_script__,
    __vue_scope_id__,
    __vue_is_functional_template__,
    __vue_module_identifier__,
    undefined,
    undefined
  );

export { Tabs as default };
