import script from './index.vue_rollup-plugin-vue_script.js';
import __vue_normalize__ from 'vue-runtime-helpers/dist/normalize-component.js';

/* script */
const __vue_script__ = script;

/* template */
var __vue_render__ = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("Cell", {
    staticClass: "omi-swipe-action__wrap",
    class: { "omi-swipe-action__moving": _vm.isMoving },
    scopedSlots: _vm._u(
      [
        {
          key: "content",
          fn: function() {
            return [
              _vm.showSlot("left")
                ? _c(
                    "div",
                    {
                      ref: "left",
                      staticClass:
                        "omi-swipe-action__actions omi-swipe-action__left"
                    },
                    [_vm._t("left")],
                    2
                  )
                : _vm._e(),
              _vm._v(" "),
              _vm.showSlot("right")
                ? _c(
                    "div",
                    {
                      ref: "right",
                      staticClass:
                        "omi-swipe-action__actions omi-swipe-action__right"
                    },
                    [_vm._t("right")],
                    2
                  )
                : _vm._e(),
              _vm._v(" "),
              _c(
                "div",
                {
                  staticClass:
                    "omi-swipe-action__content omi-swipe-action__transform",
                  style: _vm.styles,
                  on: {
                    touchstart: _vm.onTouchStart,
                    touchend: _vm.onTouchEnd,
                    touchmove: _vm.onMove,
                    transitionend: _vm.onTransitionEnd,
                    click: _vm.onClick
                  }
                },
                [
                  _c(
                    "div",
                    { staticClass: "omi-swipe-action__item--text" },
                    [
                      _vm._t("default", function() {
                        return [_vm._v(_vm._s(_vm.text))]
                      })
                    ],
                    2
                  ),
                  _vm._v(" "),
                  _vm.showSlot("extra")
                    ? _c(
                        "div",
                        { staticClass: "omi-swipe-action__item--extra" },
                        [_vm._t("extra")],
                        2
                      )
                    : _vm._e(),
                  _vm._v(" "),
                  _vm._t("arrow", function() {
                    return [
                      _vm.showArrow
                        ? _c("Icon", { attrs: { type: "enter" } })
                        : _vm._e()
                    ]
                  })
                ],
                2
              )
            ]
          },
          proxy: true
        }
      ],
      null,
      true
    )
  })
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
  

  
  var SwipeAction = __vue_normalize__(
    { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
    __vue_inject_styles__,
    __vue_script__,
    __vue_scope_id__,
    __vue_is_functional_template__,
    __vue_module_identifier__,
    undefined,
    undefined
  );

export { SwipeAction as default };
