import inject from '../../mixins/inject.js';
import touchMixin from '../../mixins/touch.js';
import { preventDefault, on, off } from '../../utils/dom.js';
import { unDef, getRange, isFunction } from '../../utils/shared.js';

var TRIGGER_MINI_DISTANCE = 15; // Minimum time difference to trigger scrolling

var TRIGGER_MINI_TIME = 300;
var ROTATEX = 25;
var SPEED_COEFFICIENT = 0.3;
var MAX_VISIBLE_ITEM = 5;
var DEFAULT_ITEM_HEIGHT = 42;
var DEFAULT_DURATION = 800;

var getTransformFromDom = function getTransformFromDom(el) {
  var matrix = window.getComputedStyle(el, null).getPropertyValue('transform');
  matrix = /[\S\s]*\((.+?)\)/.exec(matrix)[1].split(',');
  var transformY = matrix[matrix.length - 1];
  return transformY * 1;
};

var PickerColums = function PickerColums() {
  return {
    name: 'OmiPickColums',
    mixins: [inject('omiPicker'), touchMixin],
    data: function data() {
      return {
        currentIndex: 0,
        currentDuration: 0,
        startDate: 0,
        startTransformY: 0,
        transformY: 0,
        fingerStartY: 0,
        bindedEvent: false,
        isMoving: false,
        afterTransition: [],
        transitionPayload: {
          duration: 0,
          property: 'none'
        },
        inited: false
      };
    },
    props: {
      // ms
      duration: {
        type: Number,
        default: DEFAULT_DURATION
      },
      itemHeight: {
        type: Number,
        default: DEFAULT_ITEM_HEIGHT
      },
      defaultIndex: {
        type: Number,
        default: 0
      },
      data: {
        type: Array,
        default: function _default() {
          return [];
        }
      }
    },
    watch: {
      data: function data() {
        var defaultIndex = this.defaultIndex;
        this.scrollTo(null, this.getValidDefaultIndex(defaultIndex));
      },
      defaultIndex: function defaultIndex(index) {
        if (this.isMoving) return;
        this.scrollTo(null, this.getValidDefaultIndex(index));
      }
    },
    methods: {
      // @exposed-api
      getActiveValue: function getActiveValue() {
        var data = this.data,
            currentIndex = this.currentIndex;
        var payload = data[currentIndex];

        if (payload) {
          return {
            label: data[currentIndex].label,
            value: data[currentIndex].value
          };
        }

        return {};
      },
      // @exposed-api
      setActiveValue: function setActiveValue(value) {
        var _this = this;

        return new Promise(function (resolve) {
          _this.$nextTick(function () {
            var activeIndex = -1; // eslint-disable-next-line no-plusplus

            for (var i = 0; i < _this.dataLength; i++) {
              if (_this.data[i].value === value) {
                activeIndex = i;
                break;
              }
            }

            if (activeIndex !== -1) {
              _this.scrollTo(null, activeIndex, resolve);
            } else {
              resolve();
            }
          });
        });
      },
      setActiveIndex: function setActiveIndex(index) {
        this.currentIndex = index;
      },
      onClickItem: function onClickItem(index) {
        this.scrollTo(null, index);
      },
      getItemClasses: function getItemClasses(index) {
        var cls = ['omi-picker-colum__list--item'];

        if (index === this.currentIndex) {
          cls.push('omi-picker-colum__list--active');
        }

        return cls;
      },
      getItemStyle: function getItemStyle(index) {
        var itemHeight = this.itemHeight,
            transformY = this.transformY,
            isMoving = this.isMoving;
        var abs = Math.abs;
        var rotateX = (abs(transformY) - index * itemHeight) / itemHeight * ROTATEX;
        return {
          height: itemHeight + "px",
          transform: "rotateX(" + rotateX + "deg)",
          'will-change': isMoving ? 'transform' : null
        };
      },
      getValidDefaultIndex: function getValidDefaultIndex(index) {
        return unDef(this.data[index]) ? 0 : index;
      },
      getListItem: function getListItem() {
        var h = this.$createElement;
        var getItemClasses = this.getItemClasses,
            getItemStyle = this.getItemStyle,
            onClickItem = this.onClickItem;
        return this.data.map(function (item, index) {
          return h("li", {
            "on": {
              "click": function click() {
                return onClickItem(index);
              }
            },
            "style": getItemStyle(index),
            "attrs": {
              "role": "button"
            },
            "class": getItemClasses(index),
            "key": item.uid
          }, [item.label]);
        });
      },
      onTouchStart: function onTouchStart(e) {
        this.touchStart(e);

        if (!this.isMoving) {
          this.startTransformY = this.transformY;
        } else {
          var domTransformY = getTransformFromDom(this.$refs.list);
          this.startTransformY = domTransformY - this.basePosition;
        }

        this.startDate = Date.now();
        this.fingerStartY = this.startTransformY;
        this.resetStatus();
      },
      onTouchMove: function onTouchMove(e) {
        this.touchMove(e);
        var direction = this.direction,
            moveY = this.moveY;

        if (direction === 'vertical') {
          preventDefault(e);
          this.isMoving = true;
        }

        this.setTransform(moveY);
        var cur = Date.now();

        if (cur - this.startDate > TRIGGER_MINI_TIME) {
          this.startDate = cur;
          this.fingerStartY = this.transformY;
        }
      },
      onTouchEnd: function onTouchEnd() {
        var timeDiff = Date.now() - this.startDate;
        var distance = this.transformY - this.fingerStartY;
        var needScroll = timeDiff < TRIGGER_MINI_TIME && Math.abs(distance) >= TRIGGER_MINI_DISTANCE;

        if (needScroll) {
          var duration = this.duration;
          var offset = distance / timeDiff * SPEED_COEFFICIENT * duration;
          var destination = this.transformY + offset;
          this.scrollTo(-destination);
        } else if (this.isMoving) {
          this.scrollTo(-this.transformY);
        }
      },
      setTransform: function setTransform(moveY) {
        var startTransformY = this.startTransformY,
            itemHeight = this.itemHeight,
            dataLength = this.dataLength;
        var offset = startTransformY + moveY;
        this.transformY = getRange(offset, itemHeight, -(dataLength * itemHeight));
      },
      resetStatus: function resetStatus() {
        this.isMoving = false;
        if (!this.inited) this.inited = true;
        this.afterTransition = [];
        this.setTransition();
      },
      onTransitionEnd: function onTransitionEnd() {
        this.flushCallBack();
        this.resetStatus();
      },
      flushCallBack: function flushCallBack() {
        while (this.afterTransition.length) {
          var afterTransition = this.afterTransition.pop();
          if (afterTransition) afterTransition();
        }
      },
      setTransition: function setTransition(duration, property) {
        if (duration === void 0) {
          duration = 0;
        }

        if (property === void 0) {
          property = 'none';
        }

        this.transitionPayload = {
          duration: duration,
          property: property
        };
      },
      scrollCallBack: function scrollCallBack(index) {
        if (this.currentIndex !== index) this.setActiveIndex(index);
        this.$emit('change');
      },
      scrollTo: function scrollTo(offset, currentIndex, cb) {
        var _this2 = this;

        if (currentIndex === void 0) {
          currentIndex = null;
        }

        if (cb === void 0) {
          cb = null;
        }

        var itemHeight = this.itemHeight,
            getValidIndex = this.getValidIndex,
            isMoving = this.isMoving;
        var index = currentIndex;

        if (currentIndex === null) {
          index = getValidIndex(offset / itemHeight);
        }

        var transformY = index * itemHeight;

        if (this.inited) {
          this.setTransition(this.duration, 'all');
          if (!this.isMoving) this.isMoving = true;
        }

        this.transformY = -transformY;

        var scrollCallBack = function scrollCallBack() {
          _this2.scrollCallBack(index);

          if (isFunction(cb)) cb();
        };

        if (!this.inited || isFunction(cb)) {
          this.onTransitionEnd();
          this.setActiveIndex(index);
          scrollCallBack();
          return;
        }

        if (isMoving || index !== this.currentIndex) {
          if (this.afterTransition.length) {
            this.flushCallBack();
          }

          this.afterTransition.push(scrollCallBack);
        } else {
          this.onTransitionEnd();
          this.setActiveIndex(index);
        }
      },
      getValidIndex: function getValidIndex(index) {
        return getRange(Math.round(index), this.dataLength - 1, 0);
      },
      bindTouchEvent: function bindTouchEvent(fn, binded) {
        var list = this.$refs.list;
        var wrapper = this.$el;
        fn(wrapper, 'touchstart', this.onTouchStart);
        fn(wrapper, 'touchmove', this.onTouchMove, false);
        fn(wrapper, 'touchend', this.onTouchEnd);
        fn(list, 'transitionend', this.onTransitionEnd);
        this.bindedEvent = binded;
      }
    },
    computed: {
      dataLength: function dataLength() {
        return this.data.length;
      },
      wrapperStyles: function wrapperStyles() {
        var itemHeight = this.itemHeight;
        return "height: " + itemHeight * MAX_VISIBLE_ITEM + "px";
      },
      basePosition: function basePosition() {
        var itemHeight = this.itemHeight;
        return itemHeight * (MAX_VISIBLE_ITEM - 1) / 2;
      },
      ListStyles: function ListStyles() {
        var basePosition = this.basePosition,
            transformY = this.transformY,
            transitionPayload = this.transitionPayload,
            isMoving = this.isMoving;
        var offsetY = basePosition + transformY;
        return {
          transform: "translate3d(0, " + offsetY + "px, 0)",
          'transition-duration': transitionPayload.duration + "ms",
          'transition-property': "" + transitionPayload.property,
          'will-change': isMoving ? 'transform' : null
        };
      }
    },
    mounted: function mounted() {
      var _this3 = this;

      this.$nextTick(function () {
        if (!_this3.bindedEvent) {
          _this3.bindTouchEvent(on, true);
        }

        var defaultIndex = _this3.getValidDefaultIndex(_this3.defaultIndex);

        if (defaultIndex !== _this3.currentIndex) {
          _this3.scrollTo(null, defaultIndex);
        } else {
          _this3.inited = true;
        }
      });
    },
    beforeUpdate: function beforeUpdate() {
      if (!this.inited) {
        this.inited = true;
      }
    },
    beforeDestroy: function beforeDestroy() {
      if (this.bindedEvent) this.bindTouchEvent(off, false);
    },
    render: function render() {
      var h = arguments[0];
      return h("div", {
        "class": "omi-picker-colum",
        "ref": "wrapper",
        "style": this.wrapperStyles
      }, [h("ul", {
        "class": "omi-picker-colum__list",
        "style": this.ListStyles,
        "ref": "list"
      }, [this.getListItem()])]);
    }
  };
};

var Colums = PickerColums();

export { DEFAULT_DURATION, DEFAULT_ITEM_HEIGHT, MAX_VISIBLE_ITEM, Colums as default };
