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
    _vm._g(
      { staticClass: "omi-cell", class: _vm.clickAbleClass },
      _vm.$listeners
    ),
    [
      _c(
        "route-button",
        {
          attrs: {
            to: _vm.to,
            replace: _vm.replace,
            append: _vm.append,
            href: _vm.href,
            tag: _vm.tag,
            event: _vm.event
          }
        },
        [
          _vm.renderSlot("left-icon")
            ? _c(
                "div",
                { staticClass: "omi-cell__left--icon" },
                [_vm._t("left-icon")],
                2
              )
            : _vm._e(),
          _vm._v(" "),
          _vm.renderTitle
            ? _c(
                "div",
                {
                  staticClass: "omi-cell__title",
                  class: _vm.titleClass,
                  style: _vm.customTitleStyles
                },
                [
                  _vm._t("title", function() {
                    return [
                      _vm.title
                        ? _c("div", [_vm._v(_vm._s(_vm.title))])
                        : _vm._e()
                    ]
                  }),
                  _vm._v(" "),
                  _vm._t("label", function() {
                    return [
                      _vm.label
                        ? _c("div", { staticClass: "omi-cell__label" }, [
                            _vm._v(_vm._s(_vm.label))
                          ])
                        : _vm._e()
                    ]
                  })
                ],
                2
              )
            : _vm._e(),
          _vm._v(" "),
          _vm.renderSlot("content") || _vm.content
            ? _c(
                "div",
                { staticClass: "omi-cell__content", class: _vm.contentClass },
                [
                  _c(
                    "div",
                    {
                      staticClass: "omi-cell__content--body",
                      style: _vm.customContentStyles
                    },
                    [
                      _vm._t("content", function() {
                        return [_c("span", [_vm._v(_vm._s(_vm.content))])]
                      })
                    ],
                    2
                  ),
                  _vm._v(" "),
                  _vm._t("description")
                ],
                2
              )
            : _vm._e(),
          _vm._v(" "),
          _vm.renderSlot("extra")
            ? _c(
                "div",
                { staticClass: "omi-cell__extra" },
                [_vm._t("extra")],
                2
              )
            : _vm._e(),
          _vm._v(" "),
          _vm.renderSlot("right-icon") || _vm.rightArrow
            ? _c(
                "div",
                { staticClass: "omi-cell__right--icon" },
                [
                  _vm._t("right-icon", function() {
                    return [_c("icon", { attrs: { type: "enter" } })]
                  })
                ],
                2
              )
            : _vm._e()
        ]
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
  

  
  var Cell = __vue_normalize__(
    { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
    __vue_inject_styles__,
    __vue_script__,
    __vue_scope_id__,
    __vue_is_functional_template__,
    __vue_module_identifier__,
    undefined,
    undefined
  );

export { Cell as default };
