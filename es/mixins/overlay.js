import Vue from 'vue';
import '../overlay/index.js';
import overLayProps from '../overlay/src/props.js';
import { preventDefault, on, off } from '../utils/dom.js';
import touchMixin from './touch.js';
import OverLay from '../overlay/src/index.js';

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
  mixins: [touchMixin],
  props: _extends({}, overLayProps),
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
        preventDefault(e);
      } else if (!isVertical && (reachLeft && moveX > 0 || reachRight && moveX < 0)) {
        preventDefault(e);
      }
    },
    mountOverlay: function mountOverlay() {
      var _this = this;

      var OverlayConstructor = Vue.extend(OverLay());
      var el = document.createElement('div');
      var Overlay = new OverlayConstructor({
        el: el
      });
      Object.assign(Overlay, getProps(overLayProps, this.$props));
      this.portal(Overlay.$el);
      Overlay.setZindex(this.getZindex);
      Overlay.$on('clickOverlay', function () {
        if (_this.clickClose) {
          _this.close();
        }
      });

      if (this.lockScroll) {
        on(document, 'touchstart', this.touchStart, false);
        on(document, 'touchmove', this.ontouchMove, false);

        if (!lockCount) {
          document.body.classList.add('omi-no-scroll');
        }

        lockCount += 1;
      }

      return Overlay;
    },
    unlockScroll: function unlockScroll() {
      if (this.lockScroll) {
        off(document, 'touchstart', this.onTouchstart);
        off(document, 'touchmove', this.ontouchMove);
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

export { overLayMixin as default };
