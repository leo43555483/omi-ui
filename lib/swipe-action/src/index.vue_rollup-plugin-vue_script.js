'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('../../cell/index.js');
require('../../icon/index.js');
var shared = require('../../utils/shared.js');
var index = require('../../cell/src/index.vue.js');
var index$1 = require('../../icon/src/index.vue.js');

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
var DEFAULT_THRESHOLD = 0.5;
var STATUS_ARRIVE = 'arrive';
var STATUS_RESET = 'reset';
var STATUS_MOVING = 'moving';
var STATUS_RESTING = 'reseting';
var MINI_DISTANCE = 5;
var abs = Math.abs;
var script = {
  name: 'OmiSwipeAction',
  data: function data() {
    return {
      documentBody: null,
      startX: 0,
      startY: 0,
      moveX: 0,
      isHolding: false,
      status: STATUS_RESET,
      initialOffset: 0,
      slideArea: null,
      preX: 0,
      clientWith: {
        left: 0,
        right: 0
      }
    };
  },
  components: {
    Cell: index["default"],
    Icon: index$1["default"]
  },
  props: {
    text: {
      type: String
    },
    showArrow: {
      type: Boolean,
      default: true
    },
    threshold: {
      type: Number,
      default: DEFAULT_THRESHOLD
    },
    autoClose: {
      type: [Function, Boolean],
      default: function _default() {
        return false;
      }
    }
  },
  watch: {
    isMoving: function isMoving(_isMoving) {
      if (_isMoving) {
        this.preventDefaultEVent();
      } else {
        this.removePreventClass();
      }
    }
  },
  computed: {
    styles: function styles() {
      var status = this.status,
          isHolding = this.isHolding;

      if (status !== STATUS_RESET || isHolding) {
        return "\n          touch-action: pan-y;\n          transform: translate3d(" + this.moveX + "px, 0,0) scale(1);\n        ";
      }

      return null;
    },
    isMoving: function isMoving() {
      var status = this.status,
          isHolding = this.isHolding;

      if (status === STATUS_MOVING) {
        return true;
      }

      if (status === STATUS_RESET && isHolding) {
        return true;
      }

      return false;
    }
  },
  methods: {
    removePreventClass: function removePreventClass() {
      this.documentBody.classList.remove('omi-swipe-action__no--event');
    },
    preventDefaultEVent: function preventDefaultEVent() {
      this.documentBody.classList.add('omi-swipe-action__no--event');
    },
    isVertical: function isVertical(x, y) {
      var offsetX = abs(x - this.startX);
      var offsetY = abs(y - this.startY);
      if (offsetY > offsetX && offsetY > MINI_DISTANCE) return true;
      return false;
    },

    /**
     * @vue2doc-exposed-api:close
    */
    close: function close() {
      this.restPosition(0);
    },
    onClick: function onClick(e) {
      var _this = this;

      var autoClose = this.autoClose;

      if (this.status === STATUS_ARRIVE) {
        var isAutoClose = autoClose;

        if (shared.isFunction(autoClose)) {
          autoClose(e, function () {
            _this.restPosition(0);
          });
        } else if (isAutoClose) this.restPosition(0);
      }

      this.$emit('click', e);

      if (this.isHolding) {
        this.isHolding = false;
      }
    },
    setStatus: function setStatus(status) {
      this.status = status;
    },
    onTransitionEnd: function onTransitionEnd() {
      if (this.status === STATUS_RESTING) {
        this.setStatus(STATUS_RESET);
      }
    },
    onTouchStart: function onTouchStart(e) {
      this.startX = this.getPoint(e).clientX;
      this.startY = this.getPoint(e).clientY;
      this.preX = this.startX; // 当前是左侧操作块滑动还是右侧滑动

      this.initialOffset = this.moveX;
      this.isHolding = true;
    },
    onTouchEnd: function onTouchEnd(e) {
      var moveX = this.getPoint(e).clientX;
      var distance = this.getDistance(moveX);
      var direction = this.theDirection(moveX, this.preX);
      var actionWith = this.getFinalPosition(direction);
      var threshold = this.threshold;

      if (this.threshold > 1 || this.threshold <= 0) {
        threshold = DEFAULT_THRESHOLD;
      }

      if (actionWith !== 0 && abs(distance) >= abs(actionWith) * threshold) {
        this.moveToFinal(actionWith, 0);
      } else if (this.status !== STATUS_ARRIVE) {
        this.restPosition(0);
      }

      this.isHolding = false;
    },
    getFinalPosition: function getFinalPosition(direction) {
      var clientWith = this.clientWith,
          slideArea = this.slideArea;

      if (slideArea === 'right') {
        if (direction === 'left') {
          return 0 - clientWith.right;
        }
      } else if (slideArea === 'left') {
        if (direction === 'right') {
          return 0 + clientWith.left;
        }
      }

      return 0;
    },
    getDistance: function getDistance(moveX) {
      var distance = moveX - this.startX + this.initialOffset; // eslint-disable-next-line radix

      return parseInt(distance);
    },
    onMove: function onMove(e) {
      var moveX = this.getPoint(e).clientX;
      var moveY = this.getPoint(e).clientY;
      var status = this.status;
      if (status === STATUS_RESET && this.isVertical(moveX, moveY)) return;
      var direction = this.theDirection(moveX, this.preX);

      if (this.slideArea === null) {
        this.setSlideArea(direction);
      }

      if (this.invalidMove(moveX, this.startX)) {
        this.moveToFinal(this.getFinalPosition(direction), null);
        return;
      }

      var distance = this.getDistance(moveX);
      this.preX = moveX;
      this.walk(distance);
    },
    walk: function walk(position) {
      this.setStatus(STATUS_MOVING);
      this.moveTo(position);
    },
    moveToFinal: function moveToFinal(position, prex) {
      if (position === 0) {
        this.restPosition(prex);
      } else {
        this.moveTo(position);
        this.setStatus(STATUS_ARRIVE);
      }
    },
    restPosition: function restPosition(preX) {
      if (preX !== null) {
        this.preX = preX;
      }

      this.slideArea = null;
      this.setStatus(STATUS_RESTING);
      this.moveTo(0);
      this.setStatus(STATUS_RESET);
    },
    setSlideArea: function setSlideArea(direction) {
      this.slideArea = direction === 'left' ? 'right' : 'left';
      return this.slideArea;
    },
    moveTo: function moveTo(distance) {
      this.moveX = distance;
    },
    isOverOffset: function isOverOffset(moveX) {
      var slideArea = this.slideArea;
      var distance = this.getDistance(moveX);
      var actionWith = this.clientWith[slideArea]; // 判断是否超过操作按钮宽度,以及是否触及边缘

      if (actionWith !== 0 && abs(distance) >= abs(actionWith) || this.isOverBorder(slideArea, this.moveX)) {
        return true;
      }

      return false;
    },
    isOverBorder: function isOverBorder(slideArea, offset) {
      if (slideArea === 'right') {
        return offset >= 0;
      }

      return offset <= 0;
    },
    invalidMove: function invalidMove(moveX, startX) {
      var reset = this.status === STATUS_RESET;
      var direction = this.theDirection(moveX, this.startX);
      if (moveX === startX) return true;
      if (reset && !this.showSlot('left') && direction === 'right') return true;
      if (reset && !this.showSlot('right') && direction === 'left') return true;
      if (!reset && this.isOverOffset(moveX)) return true;
      return false;
    },
    theDirection: function theDirection(moveX, preX) {
      return moveX - preX > 0 ? 'right' : 'left';
    },
    getPoint: function getPoint(e) {
      return e.changedTouches[0];
    },
    showSlot: function showSlot(where) {
      return this.$slots[where];
    },
    getEleClientWith: function getEleClientWith(el) {
      return el.clientWidth;
    },
    setClientWith: function setClientWith(slotType, refKey) {
      if (this.showSlot(slotType)) {
        var _extends2;

        var el = this.$refs[slotType];
        var clientWith = this.getEleClientWith(el);
        this.clientWith = _extends({}, this.clientWith, (_extends2 = {}, _extends2[refKey] = clientWith, _extends2));
      }
    }
  },
  mounted: function mounted() {
    this.documentBody = document.body;
    this.setClientWith('right', 'right');
    this.setClientWith('left', 'left');
  }
};

exports["default"] = script;
