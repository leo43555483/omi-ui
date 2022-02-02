import _mergeJSXProps from '@vue/babel-helper-vue-jsx-merge-props';
import popMixin from '../../mixins/popup/index.js';
import swipeMixin from '../../mixins/swipe.js';
import '../../icon/index.js';
import '../../image/index.js';
import props from './props.js';
import { isPromise, unDef, isString } from '../../utils/shared.js';
import Icon from '../../icon/src/index.vue.js';
import Image from '../../image/src/index.js';

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var ImagePreview = function ImagePreview() {
  return {
    name: 'OmiImagePreview',
    inheritAttrs: false,
    mixins: [popMixin(), swipeMixin('images')],
    props: _extends({}, props),
    methods: {
      beforeClose: function beforeClose() {
        var _this = this;

        var onClose = this.onClose;
        var promise = onClose.apply(void 0, arguments);

        if (isPromise(promise)) {
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
        if (!unDef(this.$scopedSlots) && !unDef(this.$scopedSlots[slotName])) {
          return this.$scopedSlots[slotName];
        }

        return null;
      },
      getHeader: function getHeader() {
        var _this2 = this;

        var h = this.$createElement;
        var customHeader = this.getSlot('header');

        if (!unDef(customHeader)) {
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
        }, [h(Icon, {
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
            }, [!unDef(img) && isString(img) && h(Image, _mergeJSXProps([{
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

export { VueImagePreview as default };
