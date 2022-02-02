'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var shared = require('../utils/shared.js');

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
var inpuMixin = {
  data: function data() {
    return {
      isComposing: false
    };
  },
  methods: {
    onInput: function onInput(e) {
      if (this.isComposing) return;
      this.$emit('input', e.target.value);
    },
    onKeyPress: function onKeyPress(e) {
      if (this.type === 'search' && e.keyCode === 13) {
        this.blur();
        this.$emit('search', e);
      }
    },
    onFocus: function onFocus(e) {
      this.$emit('focus', e);
    },
    onBlur: function onBlur(e) {
      this.$emit('blur', e);
      if (shared.isFunction(this.validateTriggerOn)) this.validateTriggerOn('blur');
    },
    onCompositionUpdate: function onCompositionUpdate(e) {
      var text = e.target.value;
      var lastCharacter = text[text.length - 1] || '';
      this.isComposing = !shared.isKorean(lastCharacter);
    },
    onCompositionStart: function onCompositionStart() {
      this.isComposing = true;
    },
    onCompositionEnd: function onCompositionEnd(e) {
      if (this.isComposing) {
        this.isComposing = false;
        this.onInput(e);
      }
    }
  },
  computed: {
    listeners: function listeners() {
      return _extends({}, this.$listeners, {
        input: this.onInput,
        focus: this.onFocus,
        blur: this.onBlur,
        keypress: this.onKeyPress,
        compositionstart: this.onCompositionStart,
        compositionupdate: this.onCompositionUpdate,
        compositionend: this.onCompositionEnd
      });
    }
  }
};

exports["default"] = inpuMixin;
