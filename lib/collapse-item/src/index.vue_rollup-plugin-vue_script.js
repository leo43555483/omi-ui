'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('../../cell/index.js');
var shared = require('../../utils/shared.js');
var polyfill = require('../../utils/polyfill.js');
var index = require('../../cell/src/index.vue.js');

//
var script = {
  name: 'OmiCollapseItem',
  inject: {
    parent: {
      default: null
    }
  },
  data: function data() {
    return {
      height: 0
    };
  },
  props: {
    disable: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: null
    },
    name: {
      type: [String, Number],
      default: null,
      required: true
    }
  },
  components: {
    Cell: index["default"]
  },
  methods: {
    fold: function fold(el) {
      el.style.height = '0';
    },
    unfold: function unfold(el) {
      el.style.height = this.getHeight() + "px";
    },
    getHeight: function getHeight() {
      var inner = this.$refs.inner;
      return inner.offsetHeight;
    },
    onBeforeEnter: function onBeforeEnter(el) {
      this.fold(el);
    },
    onEnter: function onEnter(el) {
      this.unfold(el);
    },
    onAfterEnter: function onAfterEnter(el) {
      el.style.height = '';
    },
    onBeforeLeave: function onBeforeLeave(el) {
      this.unfold(el);
    },
    onLeave: function onLeave(el) {
      var _this = this;

      polyfill.doubleAnimation(function () {
        _this.fold(el);
      });
    },
    onClick: shared.throttle(function () {
      var opened = this.opened,
          disable = this.disable;
      if (disable) return;
      this.opened = !opened;
    })
  },
  computed: {
    wrapperHeight: function wrapperHeight() {
      var inner = this.$refs.inner;
      return inner.offsetHeight;
    },
    wrapperClasses: function wrapperClasses() {
      var opened = this.opened,
          disable = this.disable;
      return {
        'omi-collapse-item__open': opened,
        'omi-collapse-item__disable': disable
      };
    },
    opened: {
      get: function get() {
        if (this.parent) {
          return this.parent.hasName(this.name);
        }

        throw new Error('[omi ui]: Cannot find parent in collapse item');
      },
      set: function set(isOpen) {
        this.parent.open(isOpen, this.name);
      }
    }
  },
  created: function created() {
    if (this.parent && this.parent.children) {
      this.parent.children.push(this);
    }
  }
};

exports["default"] = script;
