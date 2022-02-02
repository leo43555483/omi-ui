'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('../../loading/index.js');
var shared = require('../../utils/shared.js');
var index = require('../../loading/src/index.vue.js');

//
var BUTTON_SIZE = ['normal', 'small', 'mini'];
var BUTTON_TYPE = ['default', 'primary', 'danger', 'info', 'warning', 'success'];
var BUTTON_NATIVE_TYPE = ['submit', 'button', 'reset'];
var BUTTON_SHAPE = ['square', 'round'];
var script = {
  name: 'OmiButton',
  props: {
    size: {
      type: String,
      validator: function validator(value) {
        return shared.oneOf(value, BUTTON_SIZE);
      },
      default: 'normal'
    },
    nativeType: {
      type: String,
      validator: function validator(value) {
        return shared.oneOf(value, BUTTON_NATIVE_TYPE);
      },
      default: 'button'
    },
    type: {
      type: String,
      validator: function validator(value) {
        return shared.oneOf(value, BUTTON_TYPE);
      },
      default: 'primary'
    },
    block: {
      type: Boolean,
      default: false
    },
    text: {
      type: String,
      default: ''
    },
    loadingText: {
      type: String,
      default: ''
    },
    round: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  components: {
    Loading: index["default"]
  },
  computed: {
    showLoadingText: function showLoadingText() {
      return this.loading && this.loadingText;
    },
    typeClassesMap: function typeClassesMap() {
      return shared.createClassMap('omi-btn__', BUTTON_TYPE);
    },
    sizeClassesMap: function sizeClassesMap() {
      return shared.createClassMap('omi-btn__', BUTTON_SIZE);
    },
    shapeClassesMap: function shapeClassesMap() {
      return shared.createClassMap('omi-btn__', BUTTON_SHAPE);
    },
    buttonClass: function buttonClass() {
      var type = this.type,
          size = this.size,
          typeClassesMap = this.typeClassesMap,
          sizeClassesMap = this.sizeClassesMap,
          shapeClassesMap = this.shapeClassesMap,
          block = this.block,
          disabled = this.disabled;
      var square = BUTTON_SHAPE[0],
          round = BUTTON_SHAPE[1];
      var shape = this.round ? round : square;
      var typeClass = typeClassesMap ? typeClassesMap[type] : null;
      var sizeClass = sizeClassesMap ? sizeClassesMap[size] : null;
      var shapeClass = shapeClassesMap ? shapeClassesMap[shape] : null;
      var blockClass = block ? 'omi-btn__block' : null;
      var disabledClass = disabled ? 'omi-btn__disable' : null;
      return [typeClass, sizeClass, shapeClass, blockClass, disabledClass];
    }
  }
};

exports["default"] = script;
