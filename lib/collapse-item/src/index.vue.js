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
      staticClass: "omi-collapse-item omi-border__bottom",
      class: _vm.wrapperClasses,
      attrs: { "aria-expanded": String(_vm.opened), tabindex: "0" }
    },
    [
      _c(
        "cell",
        {
          attrs: {
            clickable: !_vm.disable,
            rightArrow: "",
            titleClass: "omi-collapse-item__title"
          },
          on: { click: _vm.onClick }
        },
        [
          _vm._t("title", function() {
            return [
              _c("span", { attrs: { slot: "title" }, slot: "title" }, [
                _vm._v(_vm._s(_vm.title))
              ])
            ]
          })
        ],
        2
      ),
      _vm._v(" "),
      _c(
        "transition",
        {
          attrs: { name: "collapse" },
          on: {
            beforeEnter: _vm.onBeforeEnter,
            enter: _vm.onEnter,
            afterEnter: _vm.onAfterEnter,
            beforeLeave: _vm.onBeforeLeave,
            leave: _vm.onLeave
          }
        },
        [
          _c(
            "div",
            {
              directives: [
                {
                  name: "show",
                  rawName: "v-show",
                  value: _vm.opened,
                  expression: "opened"
                }
              ],
              staticClass: "omi-collapse-item__wrapper"
            },
            [
              _c(
                "div",
                { ref: "inner", staticClass: "omi-collapse-item__inner" },
                [_vm._t("default")],
                2
              )
            ]
          )
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
  

  
  var CollapseItem = __vue_normalize____default["default"](
    { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
    __vue_inject_styles__,
    __vue_script__,
    __vue_scope_id__,
    __vue_is_functional_template__,
    __vue_module_identifier__,
    undefined,
    undefined
  );

exports["default"] = CollapseItem;
