'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _mergeJSXProps = require('@vue/babel-helper-vue-jsx-merge-props');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _mergeJSXProps__default = /*#__PURE__*/_interopDefaultLegacy(_mergeJSXProps);

var _routeButtonProps;

var tagClass = 'omi-cell__inner';
var VUE_ROUTER_ATTR = ['append', 'tag', 'activeClass', 'exact', 'event', 'exactActiveClass', 'replace', 'to'];
var APPEND = VUE_ROUTER_ATTR[0],
    TAG = VUE_ROUTER_ATTR[1],
    ACTIVECLASS = VUE_ROUTER_ATTR[2],
    EXACT = VUE_ROUTER_ATTR[3],
    EVENT = VUE_ROUTER_ATTR[4],
    EXACTACTIVECLASS = VUE_ROUTER_ATTR[5],
    REPLACE = VUE_ROUTER_ATTR[6],
    TO = VUE_ROUTER_ATTR[7];
var routeButtonProps = (_routeButtonProps = {
  href: {
    type: String,
    default: null
  }
}, _routeButtonProps[APPEND] = {
  type: Boolean,
  default: false
}, _routeButtonProps[TAG] = {
  type: String,
  default: 'div'
}, _routeButtonProps[ACTIVECLASS] = {
  type: String,
  default: null
}, _routeButtonProps[EXACT] = {
  type: Boolean,
  default: false
}, _routeButtonProps[EVENT] = {
  type: String,
  default: null
}, _routeButtonProps[EXACTACTIVECLASS] = {
  type: String,
  default: null
}, _routeButtonProps[TO] = {
  type: String,
  default: null
}, _routeButtonProps[REPLACE] = {
  type: Boolean,
  default: false
}, _routeButtonProps);

var getValidProps = function getValidProps(ctx) {
  var props = {};
  VUE_ROUTER_ATTR.forEach(function (key) {
    if (ctx[key] !== null) props[key] = ctx[key];
  });
  return props;
};

var RouteButton = function RouteButton() {
  return {
    props: routeButtonProps,
    methods: {
      createHrefTag: function createHrefTag(child) {
        var h = this.$createElement;
        return h("a", {
          "attrs": {
            "href": this.href
          },
          "class": tagClass
        }, [child]);
      },
      createRouteTag: function createRouteTag(child) {
        var h = this.$createElement;
        var routeAttrs = getValidProps(this);
        var props = {
          props: routeAttrs
        };
        return h("RouterLink", _mergeJSXProps__default["default"]([{}, props, {
          "class": tagClass
        }]), [child]);
      },
      createNormalTag: function createNormalTag(child) {
        var h = this.$createElement;
        return h("div", {
          "class": tagClass
        }, [child]);
      }
    },
    render: function render() {
      var href = this.href,
          to = this.to,
          createHrefTag = this.createHrefTag,
          createRouteTag = this.createRouteTag,
          createNormalTag = this.createNormalTag;
      var slot = this.$slots.default;
      if (href) return createHrefTag(slot);
      if (to) return createRouteTag(slot);
      return createNormalTag(slot);
    }
  };
};

var RouteButton$1 = RouteButton();

exports.ACTIVECLASS = ACTIVECLASS;
exports.APPEND = APPEND;
exports.EVENT = EVENT;
exports.EXACT = EXACT;
exports.EXACTACTIVECLASS = EXACTACTIVECLASS;
exports.REPLACE = REPLACE;
exports.TAG = TAG;
exports.TO = TO;
exports["default"] = RouteButton$1;
exports.routeButtonProps = routeButtonProps;
