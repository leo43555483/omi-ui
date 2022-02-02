'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var inject = require('../../mixins/inject.js');

//
var script = {
  name: 'OmiIndexAnchor',
  mixins: [inject["default"]('omiIndexBox')],
  data: function data() {
    return {
      offsetTop: 0,
      active: false,
      height: null
    };
  },
  props: {
    title: {
      type: String,
      default: function _default() {
        return '';
      }
    },
    zIndex: {
      type: Number,
      default: 1
    },
    index: {
      type: String,
      required: true
    }
  },
  methods: {
    update: function update(_ref) {
      var top = _ref.top;
      this.active = true;
      this.offsetTop = top;
    },
    reset: function reset() {
      this.active = false;
      this.offsetTop = 0;
    }
  },
  computed: {
    styles: function styles() {
      if (this.active) {
        return "\n        height: " + this.height + "px; \n        transform: translate3d(0, " + this.offsetTop + "px,0);\n        z-index:" + this.zIndex + ";\n        ";
      }

      return '';
    }
  },
  mounted: function mounted() {
    this.height = this.$el.offsetHeight;
  }
};

exports["default"] = script;
