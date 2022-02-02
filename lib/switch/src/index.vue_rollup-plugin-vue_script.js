'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('../../loading/index.js');
var index = require('../../loading/src/index.vue.js');

//
var LOADING_SIZE = 12;
var script = {
  name: 'OmiSwitch',
  props: {
    size: {
      type: Number,
      default: null
    },
    value: {
      type: Boolean,
      default: false
    },
    activeColor: {
      type: String,
      default: null
    },
    loading: {
      type: Boolean,
      default: false
    },
    loadingSize: {
      type: Number,
      default: LOADING_SIZE
    },
    disable: {
      type: Boolean,
      default: false
    }
  },
  components: {
    Loading: index["default"]
  },
  methods: {
    onClick: function onClick() {
      var disable = this.disable,
          value = this.value;
      if (disable) return;
      this.$emit('input', !value);
    }
  },
  computed: {
    swithClasses: function swithClasses() {
      var value = this.value,
          disable = this.disable;
      return {
        'omi-switch__checked': value,
        'omi-switch__disable': disable
      };
    },
    switchStyle: function switchStyle() {
      var value = this.value;
      var translateX = value ? '100%' : '0';
      return "transform: translateX(" + translateX + ")";
    },
    wrapperStyles: function wrapperStyles() {
      var value = this.value,
          activeColor = this.activeColor,
          size = this.size;
      var styles = {
        fontSize: size + "px"
      };
      if (value && activeColor) styles.backgroundColor = activeColor;
      return styles;
    }
  }
};

exports["default"] = script;
