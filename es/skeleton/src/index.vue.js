import script from './index.vue_rollup-plugin-vue_script.js';
import __vue_normalize__ from 'vue-runtime-helpers/dist/normalize-component.js';

/* script */
const __vue_script__ = script;

/* template */
var __vue_render__ = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _vm.loading
    ? _c("div", { staticClass: "omi-skeleton", class: _vm.wrapperClass }, [
        _vm.avatar
          ? _c("div", {
              staticClass: "omi-skeleton-avatar",
              class: _vm.avatarClass,
              style: _vm.avatarStyles
            })
          : _vm._e(),
        _vm._v(" "),
        _c(
          "div",
          { staticClass: "omi-skeleton__body", class: _vm.contentClass },
          [
            _vm.title
              ? _c("h3", {
                  staticClass: "omi-skeleton__title",
                  style: _vm.titleStyles
                })
              : _vm._e(),
            _vm._v(" "),
            _c(
              "ul",
              { staticClass: "omi-skeleton__content" },
              _vm._l(_vm.rows, function(row) {
                return _c("li", { key: row, style: _vm.buttonStyles })
              }),
              0
            )
          ]
        )
      ])
    : _vm._e()
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
  

  
  var Skeleton = __vue_normalize__(
    { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
    __vue_inject_styles__,
    __vue_script__,
    __vue_scope_id__,
    __vue_is_functional_template__,
    __vue_module_identifier__,
    undefined,
    undefined
  );

export { Skeleton as default };
