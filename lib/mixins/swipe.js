'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var panel = require('./panel.js');
var shared = require('../utils/shared.js');

var isTrue = function isTrue(value) {
  return value === true;
};

var DEFAULT_ACTIVE_INDEX = 0;

var swipeMixin = function swipeMixin(listKey) {
  return {
    mixins: [panel["default"]],
    data: function data() {
      return {
        activeIndex: DEFAULT_ACTIVE_INDEX,
        swiperWidth: 0,
        children: [],
        inited: false
      };
    },
    watch: {
      activeIndex: function activeIndex() {
        this.scrollPane();
      },
      shouldRender: function shouldRender(_shouldRender) {
        if (_shouldRender) this.initializeSwipe();
      }
    },
    props: {
      swipleable: {
        type: Boolean,
        default: true,
        validator: isTrue
      },
      animated: {
        type: Boolean,
        default: true,
        validator: isTrue
      },
      initialIndex: {
        type: Number,
        default: DEFAULT_ACTIVE_INDEX
      }
    },
    methods: {
      initializeSwipe: function initializeSwipe() {
        this.setSwiperWidth();
        this.activeIndex = this.initialIndex;
        this.inited = false;
        this.scrollPane();
      },
      getPaneWidth: function getPaneWidth() {
        return this.swiperWidth || this.$el.offsetWidth;
      },
      updateIndex: function updateIndex(currentIndex) {
        if (this.activeIndex !== currentIndex) {
          this.activeIndex = currentIndex;
          this.$emit('change', currentIndex);
        }
      },
      getScrollerClasses: function getScrollerClasses(className) {
        var _ref;

        return _ref = {
          'omi-swipe__content--wrapper': true
        }, _ref[className + "--wrapper"] = !shared.unDef(className), _ref['omi-swipe__animated'] = this.inited, _ref;
      },
      getSwipeBody: function getSwipeBody(className) {
        var _this = this;

        var h = this.$createElement;
        return function (getList) {
          return h("div", {
            "class": ['omi-swipe__body', className],
            "ref": "pane"
          }, [h("div", {
            "class": _this.getScrollerClasses(className),
            "style": _this.swipeBodyStyles
          }, [getList('omi-swipe__item', _this.itemStyle)])]);
        };
      },
      setSwiperWidth: function setSwiperWidth() {
        var _this2 = this;

        this.$nextTick(function () {
          _this2.swiperWidth = _this2.$el.offsetWidth;
        });
      }
    },
    computed: {
      listLength: function listLength() {
        if (!shared.isArray(this[listKey])) return 0;
        return this[listKey].length;
      },
      itemStyle: function itemStyle() {
        var swiperWidth = this.swiperWidth;
        return "width: " + swiperWidth + "px";
      },
      swipeBodyStyles: function swipeBodyStyles() {
        var paneStyles = this.paneStyles,
            swiperWidth = this.swiperWidth,
            listLength = this.listLength;
        var width = swiperWidth * listLength;
        return "width: " + width + "px; " + paneStyles;
      }
    },
    mounted: function mounted() {
      this.initializeSwipe();
    }
  };
};

exports["default"] = swipeMixin;
