'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _mergeJSXProps = require('@vue/babel-helper-vue-jsx-merge-props');
var index = require('../../mixins/popup/index.js');
var swipe = require('../../mixins/swipe.js');
require('../../icon/index.js');
require('../../image/index.js');
var props = require('./props.js');
var shared = require('../../utils/shared.js');
var index$1 = require('../../icon/src/index.vue.js');
var index$2 = require('../../image/src/index.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _mergeJSXProps__default = /*#__PURE__*/_interopDefaultLegacy(_mergeJSXProps);

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var ImagePreview = function ImagePreview() {
  return {
    name: 'OmiImagePreview',
    inheritAttrs: false,
    mixins: [index["default"](), swipe["default"]('images')],
    props: _extends({}, props["default"]),
    methods: {
      beforeClose: function beforeClose() {
        var _this = this;

        var onClose = this.onClose;
        var promise = onClose.apply(void 0, arguments);

        if (shared.isPromise(promise)) {
          promise.then(function () {
            return _this.close();
          });
        } else {
          // close is triggered by popMixin
          this.close();
        }
      },
      onClick: function onClick(target) {
        if (target !== 'close' && this.showClose) return;
        var activeIndex = this.activeIndex;
        this.beforeClose(activeIndex);
      },
      getSlot: function getSlot(slotName) {
        if (!shared.unDef(this.$scopedSlots) && !shared.unDef(this.$scopedSlots[slotName])) {
          return this.$scopedSlots[slotName];
        }

        return null;
      },
      getHeader: function getHeader() {
        var _this2 = this;

        var h = this.$createElement;
        var customHeader = this.getSlot('header');

        if (!shared.unDef(customHeader)) {
          return h("div", {
            "class": "omi-image-preview__header"
          }, [customHeader(this.activeIndex)]);
        }

        if (!this.showClose) return null;
        return h("div", {
          "class": "omi-image-preview__header"
        }, [h("div", {
          "class": "omi-image-preview__close",
          "on": {
            "click": function click() {
              return _this2.onClick('close');
            }
          }
        }, [h(index$1["default"], {
          "attrs": {
            "type": "close",
            "size": 22
          }
        })])]);
      },
      getBody: function getBody() {
        var _this3 = this;

        var h = this.$createElement;
        var genList = this.getSwipeBody('omi-imgae-preview__body');
        var children;
        var imageProps = {
          attrs: this.$attrs,
          props: {
            placeholderHeight: this.placeholderHeight
          }
        };
        return genList(function (swipeCls, itemStyle) {
          children = _this3.images.map(function (img) {
            return h("div", {
              "class": [swipeCls, 'omi-image-preview__item'],
              "style": itemStyle
            }, [!shared.unDef(img) && shared.isString(img) && h(index$2["default"], _mergeJSXProps__default["default"]([{
              "class": "omi-image-preview__img",
              "attrs": {
                "src": img
              }
            }, imageProps]))]);
          });
          _this3.children = children;
          return children;
        });
      },
      getFooter: function getFooter() {
        var h = this.$createElement;
        var listLength = this.listLength;
        var indicator = this.activeIndex + 1 + " / " + listLength;
        var customIndicator = this.getSlot('indicator');

        if (customIndicator) {
          return h("div", {
            "class": "omi-image-preview__footer"
          }, [customIndicator(this.activeIndex)]);
        }

        return h("div", {
          "class": "omi-image-preview__footer"
        }, [h("span", {
          "class": "omi-image-preview__indicator"
        }, [indicator])]);
      }
    },
    computed: {
      wrapperStyles: function wrapperStyles() {
        return {
          zIndex: this.getZindex + 1
        };
      }
    },
    render: function render() {
      var _this4 = this;

      var h = arguments[0];
      if (!this.shouldRender) return null;
      return h("transition", {
        "attrs": {
          "name": "fade-in",
          "appear": true
        }
      }, [h("div", {
        "class": "omi-image-preview",
        "directives": [{
          name: "show",
          value: this.value
        }],
        "style": this.wrapperStyles,
        "on": {
          "click": function click() {
            return _this4.onClick();
          }
        }
      }, [this.getHeader(), this.getBody(), this.getFooter()])]);
    }
  };
};

var VueImagePreview = ImagePreview();

exports["default"] = VueImagePreview;
