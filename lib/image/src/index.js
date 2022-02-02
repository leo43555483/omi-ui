'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _mergeJSXProps = require('@vue/babel-helper-vue-jsx-merge-props');
require('../../loading/index.js');
require('../../icon/index.js');
var shared = require('../../utils/shared.js');
var index = require('../../loading/src/index.vue.js');
var index$1 = require('../../icon/src/index.vue.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _mergeJSXProps__default = /*#__PURE__*/_interopDefaultLegacy(_mergeJSXProps);

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var isNumber = function isNumber(value) {
  return /^\d*$/.test(value);
};

var formatSize = function formatSize(value) {
  if (shared.unDef(value)) return null;
  var size = String(value);
  size = isNumber(size) ? size + "px" : size;
  return size;
};

var DEFAULT_PLACEHOLER_WIDTH = '100%';
var DEFAULT_PLACEHOLER_HEIGHT = '50px';
var DEFAULT_ICON_SIZE = 24;

var Image = function Image() {
  return {
    name: 'OmiImage',
    data: function data() {
      return {
        binded: false,
        loaded: false,
        error: false
      };
    },
    props: {
      placeholderWidth: {
        type: [String, Number],
        default: DEFAULT_PLACEHOLER_WIDTH
      },
      placeholderHeight: {
        type: [String, Number],
        default: DEFAULT_PLACEHOLER_HEIGHT
      },
      height: {
        type: [String, Number],
        default: null
      },
      width: {
        type: [String, Number],
        default: null
      },
      lazyLoad: {
        type: Boolean,
        default: false
      },
      src: {
        type: String,
        default: ''
      },
      iconSize: {
        type: Number,
        default: DEFAULT_ICON_SIZE
      }
    },
    methods: {
      isSameNode: function isSameNode(el) {
        return el === this.$refs.img;
      },
      onLoad: function onLoad() {
        this.loaded = true;
        this.$emit('loaded', this.$refs.img);
      },
      onError: function onError() {
        this.loaded = true;
        this.error = true;
        this.$emit('error', this.$refs.img);
      },
      getImage: function getImage() {
        var h = this.$createElement;
        var src = this.src;
        var props = {
          attrs: this.$attrs
        };

        if (this.lazyLoad) {
          return h("img", _mergeJSXProps__default["default"]([{
            "class": "omi-image__img",
            "ref": "img",
            "directives": [{
              name: "lazy",
              value: src
            }]
          }, props]));
        }

        return h("img", _mergeJSXProps__default["default"]([{
          "class": "omi-image__img",
          "attrs": {
            "src": src
          },
          "ref": "img",
          "on": {
            "load": this.onLoad,
            "error": this.onError
          }
        }, props]));
      },
      getPlaceholder: function getPlaceholder() {
        var h = this.$createElement;

        if (!this.loaded) {
          return h("div", {
            "class": "omi-image__placeholder",
            "key": "omiImagePlaceholder"
          }, [this.$slots.loading || h("div", {
            "class": "omi-image__loading omi-icon__wrapper"
          }, [h(index["default"], {
            "attrs": {
              "size": this.iconSize,
              "spinner": true
            }
          })])]);
        }

        if (this.error) {
          return h("div", {
            "class": "omi-image__placeholder",
            "key": "omiImagePlaceholder"
          }, [this.$slots.error || h("div", {
            "class": "omi-image__error omi-icon__wrapper"
          }, [h(index$1["default"], {
            "attrs": {
              "size": this.iconSize,
              "type": "prompt"
            }
          })])]);
        }

        return null;
      },
      onLazyLoaded: function onLazyLoaded(_ref) {
        var el = _ref.el;
        if (this.isSameNode(el) && !this.loaded) this.loaded = true;
      },
      onLazyError: function onLazyError(_ref2) {
        var el = _ref2.el;
        if (this.isSameNode(el) && !this.error) this.error = true;
      },
      bindLazyLoad: function bindLazyLoad() {
        var $Lazyload = this.$Lazyload;

        if ($Lazyload && !this.binded) {
          $Lazyload.$on('loaded', this.onLazyLoaded);
          $Lazyload.$on('error', this.onLazyError);
          this.binded = true;
        }
      },
      unbindLazyLoad: function unbindLazyLoad() {
        var $Lazyload = this.$Lazyload;

        if ($Lazyload && this.binded) {
          $Lazyload.$off('loaded', this.onLazyLoaded);
          $Lazyload.$off('error', this.onLazyError);
          this.binded = false;
        }
      }
    },
    computed: {
      showPlaceholder: function showPlaceholder() {
        return this.error || !this.loaded;
      },
      wrapperStyles: function wrapperStyles() {
        var width = formatSize(this.width);
        var height = formatSize(this.height);
        var placeholderHeight = formatSize(this.placeholderHeight);
        var placeholderWidth = formatSize(this.placeholderWidth);
        return {
          width: this.showPlaceholder ? placeholderWidth : width,
          height: this.showPlaceholder ? placeholderHeight : height
        };
      }
    },
    mounted: function mounted() {
      this.bindLazyLoad();
    },
    beforeDestroy: function beforeDestroy() {
      this.unbindLazyLoad();
    },
    render: function render() {
      var h = arguments[0];
      return h("div", {
        "class": "omi-image",
        "style": this.wrapperStyles,
        "on": _extends({}, this.$listeners)
      }, [this.getImage(), this.getPlaceholder()]);
    }
  };
};

var Image$1 = Image();

exports["default"] = Image$1;
