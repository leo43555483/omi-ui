'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var MINI_DEGREE = 10;

var getDirection = function getDirection(x, y, degreeThreshold) {
  if (degreeThreshold === void 0) {
    degreeThreshold = MINI_DEGREE;
  }

  var atan = Math.atan,
      PI = Math.PI;
  var degree = atan(y / x) * 180 / PI;
  if (degree > degreeThreshold) return 'vertical';
  if (degree <= degreeThreshold) return 'horizontal';
  return '';
};

var abs = Math.abs;
var touchMixin = {
  data: function data() {
    return {
      startX: 0,
      startY: 0,
      offsetY: 0,
      offsetX: 0,
      moveX: 0,
      // 移动距离带符号
      moveY: 0,
      direction: ''
    };
  },
  methods: {
    touchStart: function touchStart(e) {
      this.resetTouch();
      var _e$touches$ = e.touches[0],
          clientX = _e$touches$.clientX,
          clientY = _e$touches$.clientY;
      this.startX = clientX;
      this.startY = clientY;
    },
    touchMove: function touchMove(e, degree) {
      var _e$touches$2 = e.touches[0],
          clientX = _e$touches$2.clientX,
          clientY = _e$touches$2.clientY;
      this.moveX = clientX - this.startX;
      this.moveY = clientY - this.startY;
      this.offsetX = abs(this.moveX);
      this.offsetY = abs(this.moveY);
      this.direction = getDirection(this.offsetX, this.offsetY, degree);
    },
    resetTouch: function resetTouch() {
      Object.assign(this, {
        startX: 0,
        startY: 0,
        offsetY: 0,
        offsetX: 0,
        moveX: 0,
        // 移动距离带符号
        moveY: 0,
        direction: ''
      });
    }
  }
};

exports["default"] = touchMixin;
