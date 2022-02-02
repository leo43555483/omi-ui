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
  

  
  var FormItem = __vue_normalize__(
    { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
    __vue_inject_styles__,
    __vue_script__,
    __vue_scope_id__,
    __vue_is_functional_template__,
    __vue_module_identifier__,
    undefined,
    undefined
  );

export { FormItem as default };
