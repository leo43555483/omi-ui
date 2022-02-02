'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('../../icon/index.js');
var input = require('../../mixins/input.js');
var index = require('../../icon/src/index.vue.js');

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
var script = {
  name: 'OmiSearch',
  components: {
    Icon: index["default"]
  },
  data: function data() {
    return {
      inited: false,
      focused: false,
      cancelStyles: {
        margin: '-999px'
      },
      placeholderStyles: {},
      cancelWidth: 0
    };
  },
  mixins: [input["default"]],
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    value: {
      type: String,
      default: ''
    },
    cancelText: {
      type: String,
      default: 'cancel'
    },
    placeholder: {
      type: String,
      default: ''
    },
    fixedCancel: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    showCancel: {
      handler: function handler() {
        this.setFocusStyle();
      },
      immediate: true
    }
  },
  methods: {
    setFocusStyle: function setFocusStyle() {
      var _this = this;

      this.$nextTick(function () {
        _this.setCancelStyle();

        var offset = 0;

        if (_this.showCancel) {
          var offsetWidth = _this.$el.offsetWidth;
          var placeholder = _this.$refs.placeholder;
          var cancelWidth = _this.cancelWidth ? _this.cancelWidth : _this.getCancelWidth();
          var floor = Math.floor;
          offset = -floor(offsetWidth / 2 - placeholder.offsetWidth / 2 - cancelWidth / 2);
        }

        _this.placeholderStyles = {
          transform: "translate3d(" + offset + "px,0,0)"
        };
        setTimeout(function () {
          _this.inited = true;
        }, 16);
      });
    },
    onCancel: function onCancel() {
      this.$emit('input', '');
      this.$emit('cancel');
      this.$refs.input.blur();
    },
    onClear: function onClear() {
      this.$emit('input', '');
      this.$emit('clear');
      this.$refs.input.focus();
    },
    onFocus: function onFocus(e) {
      this.focused = true;
      this.$emit('focus', e);
    },
    onInputBlur: function onInputBlur(e) {
      this.focused = false;
      this.onBlur(e);
    },
    getCancelWidth: function getCancelWidth() {
      return this.$refs.cancel.offsetWidth;
    },
    setCancelStyle: function setCancelStyle() {
      var _this2 = this;

      this.$nextTick(function () {
        if (!_this2.showCancel && !_this2.fixedCancel) {
          var cancelWidth = _this2.getCancelWidth();

          _this2.cancelWidth = cancelWidth;
          _this2.cancelStyles = {
            margin: "-" + cancelWidth + "px"
          };
        } else {
          _this2.cancelStyles = {
            margin: 0
          };
        }
      });
    },
    initial: function initial() {
      var fixedCancel = this.fixedCancel;
      var cancelMargin = fixedCancel ? 0 : '-999px';
      this.cancelStyles = {
        margin: cancelMargin
      };
    }
  },
  computed: {
    showCancel: function showCancel() {
      return this.focused || this.showClear || this.fixedCancel;
    },
    showClear: function showClear() {
      return this.value !== '';
    },
    showPlaceholder: function showPlaceholder() {
      return !this.showClear && !this.isComposing;
    },
    innerClasses: function innerClasses() {
      return {
        'omi-search__focused': this.showCancel,
        'omi-search__animation': this.inited
      };
    },
    cancelClasses: function cancelClasses() {
      return {
        'omi-search__cancel--show': this.showCancel
      };
    },
    inputListeners: function inputListeners() {
      return _extends({}, this.listeners, {
        blur: this.onInputBlur
      });
    },
    placeholderTextStyle: function placeholderTextStyle() {
      return {
        opacity: this.showPlaceholder ? 1 : 0
      };
    },
    inputStyle: function inputStyle() {
      return {
        width: this.focused ? null : '100%'
      };
    }
  },
  beforeMount: function beforeMount() {},
  mounted: function mounted() {
    this.setCancelStyle();
  }
};

exports["default"] = script;
