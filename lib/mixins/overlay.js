'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var Vue = require('vue');
require('../overlay/index.js');
var props = require('../overlay/src/props.js');
var dom = require('../utils/dom.js');
var touch = require('./touch.js');
var index = require('../overlay/src/index.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var Vue__default = /*#__PURE__*/_interopDefaultLegacy(Vue);

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
var lockCount = 0;

var getProps = function getProps(model, props) {
  var result = {};

  for (var key in model) {
    if (Object.prototype.hasOwnProperty.call(props, key)) {
      result[key] = props[key];
    }
  }

  return result;
};

var overLayMixin = {
  mixins: [touch["default"]],
  props: _extends({}, props["default"]),
  methods: {
    ontouchMove: function ontouchMove(e) {
      this.touchMove(e);
      var direction = this.direction;
      if (!direction) return;
      var moveY = this.moveY,
          moveX = this.moveX;
      var _this$$el = this.$el,
          scrollHeight = _this$$el.scrollHeight,
          scrollTop = _this$$el.scrollTop,
          offsetHeight = _this$$el.offsetHeight,
          scrollWidth = _this$$el.scrollWidth,
          scrollLeft = _this$$el.scrollLeft,
          offsetWidth = _this$$el.offsetWidth;
      var isVertical = direction === 'vertical';
      var reachTop = false;
      var reachBottom = false;
      var reachLeft = false;
      var reachRight = false;
      if (scrollTop <= 0) reachTop = true;
      if (scrollLeft <= 0) reachLeft = true;
      if (scrollTop + offsetHeight >= scrollHeight) reachBottom = true;
      if (scrollLeft + offsetWidth >= scrollWidth) reachRight = true;

      if (isVertical && (reachTop && moveY > 0 || reachBottom && moveY < 0)) {
        dom.preventDefault(e);
      } else if (!isVertical && (reachLeft && moveX > 0 || reachRight && moveX < 0)) {
        dom.preventDefault(e);
      }
    },
    mountOverlay: function mountOverlay() {
      var _this = this;

      var OverlayConstructor = Vue__default["default"].extend(index["default"]());
      var el = document.createElement('div');
      var Overlay = new OverlayConstructor({
        el: el
      });
      Object.assign(Overlay, getProps(props["default"], this.$props));
      this.portal(Overlay.$el);
      Overlay.setZindex(this.getZindex);
      Overlay.$on('clickOverlay', function () {
        if (_this.clickClose) {
          _this.close();
        }
      });

      if (this.lockScroll) {
        dom.on(document, 'touchstart', this.touchStart, false);
        dom.on(document, 'touchmove', this.ontouchMove, false);

        if (!lockCount) {
          document.body.classList.add('omi-no-scroll');
        }

        lockCount += 1;
      }

      return Overlay;
    },
    unlockScroll: function unlockScroll() {
      if (this.lockScroll) {
        dom.off(document, 'touchstart', this.onTouchstart);
        dom.off(document, 'touchmove', this.ontouchMove);
        if (lockCount > 0) lockCount -= 1;
        document.body.classList.remove('omi-no-scroll');
      }
    },
    destroyOverlay: function destroyOverlay(overlay, cb) {
      var _this2 = this;

      if (overlay && overlay.$el) {
        overlay.show = false;
        this.$nextTick(function () {
          _this2.unLoadImmediately(overlay);

          cb();
        });
      }

      this.unlockScroll();
    }
  }
};

exports["default"] = overLayMixin;
