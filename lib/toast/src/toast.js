'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var shared = require('../../utils/shared.js');
var toastType = require('./toast-type.js');
require('../../icon/index.js');
require('../../loading/index.js');
var index = require('../../loading/src/index.vue.js');
var index$1 = require('../../icon/src/index.vue.js');

var TOAST_ZINDEX_BASE = 2000;
var TOAST_DEFUALT_TYPE = 'text';

var Toast = function Toast() {
  return {
    name: 'OmiToast',
    data: function data() {
      return {
        zIndex: 0
      };
    },
    watch: {
      noScroll: {
        handler: 'preventScroll',
        immediate: true
      },
      value: {
        handler: 'preventScroll',
        immediate: true
      }
    },
    props: {
      clickClose: {
        type: Boolean,
        default: false
      },
      noScroll: {
        type: Boolean,
        default: true
      },
      icon: {
        type: String,
        default: null
      },
      content: {
        type: String,
        default: ''
      },
      value: {
        type: Boolean,
        default: false
      },
      baseZindex: {
        type: Number,
        default: TOAST_ZINDEX_BASE
      },
      type: {
        type: String,
        default: TOAST_DEFUALT_TYPE,
        validator: function validator(value) {
          return shared.oneOf(value, toastType["default"]);
        }
      }
    },
    methods: {
      preventScroll: function preventScroll() {
        var noScroll = this.noScroll,
            value = this.value;
        this.$nextTick(function () {
          if (noScroll && value) {
            document.body.classList.add('omi-toast__noscroll');
          } else {
            document.body.classList.remove('omi-toast__noscroll');
          }
        });
      },
      setZindex: function setZindex(value) {
        if (value === void 0) {
          value = 0;
        }

        this.zIndex = value + this.baseZindex;
      },
      getIcon: function getIcon() {
        var h = this.$createElement;
        var type = this.type,
            icon = this.icon;

        if (type === 'loading') {
          return h(index["default"], {
            "attrs": {
              "size": 24,
              "spinner": true
            }
          });
        }

        if (icon) return h(index$1["default"], {
          "attrs": {
            "type": icon
          }
        });
        var iconType = null;
        if (type === 'error') iconType = 'close';
        if (type === 'success') iconType = 'right';
        if (iconType) return h(index$1["default"], {
          "attrs": {
            "type": iconType
          }
        });
        return null;
      },
      getText: function getText() {
        var h = this.$createElement;
        var content = this.content,
            type = this.type;

        if (type === 'html') {
          return h("div", {
            "class": "omi-toast__text",
            "domProps": {
              "innerHTML": content
            }
          });
        }

        if (content) {
          return h("span", {
            "class": "omi-toast__text"
          }, [this.content]);
        }

        return null;
      },
      onAfterEnter: function onAfterEnter() {
        if (shared.isFunction(this.onOpen)) this.onOpen();
      },
      onAfterLeave: function onAfterLeave() {
        this.onClose();
      },
      onClick: function onClick() {
        if (this.clickClose) this.$emit('input', false);
      }
    },
    computed: {
      getZindex: function getZindex() {
        return "z-index: " + this.zIndex;
      },
      wrapperClasses: function wrapperClasses() {
        var type = this.type;
        if (type === 'text' || type === 'html') return 'omi-toast_custom';
        return null;
      }
    },
    render: function render() {
      var h = arguments[0];
      return h("transition", {
        "attrs": {
          "name": "fade-in",
          "appear": true
        },
        "on": {
          "afterEnter": this.onAfterEnter,
          "afterLeave": this.onAfterLeave
        }
      }, [h("div", {
        "class": ['omi-toast', this.wrapperClasses],
        "directives": [{
          name: "show",
          value: this.value
        }],
        "style": this.getZindex,
        "on": {
          "click": this.onClick
        }
      }, [this.getIcon(), this.getText()])]);
    }
  };
};

var VueToast = Toast();

exports["default"] = VueToast;
