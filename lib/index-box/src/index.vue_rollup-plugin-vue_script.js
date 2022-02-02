'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var touch = require('../../mixins/touch.js');
var provider = require('../../mixins/provider.js');
var scroller = require('./mixin/scroller.js');
var dom = require('../../utils/dom.js');
var shared = require('../../utils/shared.js');

//
var script = {
  name: 'OmiIndexBox',
  data: function data() {
    return {
      currentIndex: null,
      active: false,
      touching: false,
      anchorIndex: null
    };
  },
  mixins: [touch["default"], scroller["default"], provider["default"]('omiIndexBox')],
  props: {
    fixAnchor: {
      type: Boolean,
      default: true
    },
    indexs: {
      type: Array,
      default: shared.getCharacter
    },
    showIndexTip: {
      type: Boolean,
      default: function _default() {
        return true;
      }
    }
  },
  watch: {
    touching: function touching(_touching) {
      if (_touching) {
        document.body.classList.add('omi-index-box__touching');
      } else {
        document.body.classList.remove('omi-index-box__touching');
      }
    }
  },
  computed: {
    isShowIndexTip: function isShowIndexTip() {
      var showIndexTip = this.showIndexTip,
          currentIndex = this.currentIndex,
          active = this.active;
      return showIndexTip && currentIndex !== null && active;
    }
  },
  methods: {
    getPoint: function getPoint(e) {
      if (e.touches) return e.touches[0];
      return e;
    },
    onTouchStart: function onTouchStart(e) {
      e.stopPropagation();
      this.touchStart(e);
      this.scrollIntoView(e);
      this.touching = true;
    },
    onTouchMove: function onTouchMove(e) {
      this.touchMove(e);
      e.preventDefault();
      var direction = this.direction;

      if (direction === 'vertical') {
        this.scrollIntoView(e);
      }
    },
    onTouchEnd: function onTouchEnd() {
      this.resetStatus();
    },
    onScroll: function onScroll() {
      var getOffsetTop = this.getOffsetTop,
          children = this.children;
      var scollerViewTop = dom.getBoundingClientRect(this.scoller).top;
      var scrollTop = dom.getScrollTop(this.scoller);
      var anchorsOffset = children.map(function (anchor) {
        var offsetTop = getOffsetTop(anchor.$el, scollerViewTop, scrollTop);
        return {
          offsetTop: offsetTop
        };
      });
      var anchorIndex = this.getActiveAnchor(anchorsOffset, scrollTop);
      this.anchorIndex = anchorIndex; // no anchor index found

      if (anchorIndex === -1) {
        this.resetActiveIndex();
        return;
      }

      var currentIndex = this.indexs[anchorIndex];
      this.currentIndex = currentIndex;

      if (this.fixAnchor) {
        this.updateAnchor(anchorIndex, anchorsOffset, scollerViewTop, scrollTop);
      }
    },
    resetStatus: function resetStatus() {
      this.active = false;
      this.touching = false;
    },
    resetActiveIndex: function resetActiveIndex() {
      // reset current index
      if (this.currentIndex !== null) {
        if (this.fixAnchor) {
          var activeAnchorIndex = this.indexs.indexOf(this.currentIndex);
          this.children[activeAnchorIndex].reset();
        }

        this.currentIndex = null;
      } else {
        this.children.forEach(function (anchor) {
          if (anchor.active) anchor.reset();
        });
      }
    },
    getActiveAnchor: function getActiveAnchor(anchorsOffset, scrollTop) {
      var children = this.children; // eslint-disable-next-line no-plusplus

      for (var i = children.length - 1; i >= 0; i--) {
        var preHeight = i > 0 ? children[i - 1].height : 0;
        var reachTop = this.fixAnchor ? preHeight : 0;
        var top = anchorsOffset[i].offsetTop;
        if (top <= scrollTop + reachTop) return i;
      }

      return -1;
    },
    getOffsetTop: function getOffsetTop(el, scollerViewTop, scrollTop) {
      var scoller = this.scoller;
      var elViewTop = el.getBoundingClientRect().top;

      if (scoller === window || scoller === document.body) {
        if (el === window) return 0;
        return elViewTop + dom.getRootPageYOffset();
      }

      return elViewTop - scollerViewTop + scrollTop;
    },
    updateAnchor: function updateAnchor(anchorIndex, anchorsOffset, scollerViewTop, scrollTop) {
      var curIndex = this.indexs[anchorIndex];
      var preIndex = this.indexs[anchorIndex - 1];
      this.children.forEach(function (anchor) {
        var index = anchor.index;
        if (index !== curIndex || index !== preIndex) anchor.reset();
      });
      var activeAnchorEle = this.children[anchorIndex];
      var offsetTop = anchorsOffset[anchorIndex].offsetTop - scrollTop;

      if (anchorIndex > 0) {
        var preAnchorEle = this.children[anchorIndex - 1];

        if (offsetTop > 0) {
          var preHeight = preAnchorEle.height;
          preAnchorEle.update({
            top: offsetTop - preHeight + scollerViewTop
          });
        } else {
          preAnchorEle.reset();
        }
      }

      activeAnchorEle.update({
        top: Math.max(0, offsetTop) + scollerViewTop
      });
    },
    getSelectElement: function getSelectElement(e, isClick) {
      if (isClick) return e.target;

      var _this$getPoint = this.getPoint(e),
          clientX = _this$getPoint.clientX,
          clientY = _this$getPoint.clientY;

      return document.elementFromPoint(clientX, clientY);
    },
    scrollIntoView: function scrollIntoView(e, isClick) {
      if (isClick === void 0) {
        isClick = false;
      }

      var indexElement = this.getSelectElement(e, isClick);
      if (!indexElement || !this.isIndexEle(indexElement)) return;
      var index = indexElement.dataset.index;

      if (this.currentIndex !== index) {
        this.currentIndex = index;
        var activeAnchor = this.children.filter(function (anchor) {
          return anchor.index === index;
        });
        this.scrollTo(activeAnchor[0]);
      }

      this.active = true;
      this.$emit('select', index);
    },
    isIndexEle: function isIndexEle(child) {
      return this.$refs.indexItem.some(function (item) {
        return item === child;
      });
    },
    scrollTo: function scrollTo(vnode) {
      if (vnode) {
        vnode.$el.scrollIntoView();
      }
    }
  }
};

exports["default"] = script;
