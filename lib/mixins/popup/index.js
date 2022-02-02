'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var portal = require('../portal.js');
var overlay$1 = require('../overlay.js');
var dom = require('../../utils/dom.js');

var overlay = null;
var baseZindex = 1000;
var popProps = {
  popClose: {
    type: Boolean,
    default: true
  },
  value: {
    type: Boolean,
    default: false
  },
  clickClose: {
    type: Boolean,
    default: true
  },
  lockScroll: {
    type: Boolean,
    default: true
  }
};
var seed = 0;
function popMixin () {
  return {
    mixins: [portal["default"](), overlay$1["default"]],
    props: popProps,
    data: function data() {
      return {
        onBindPopState: false,
        hasRendered: false
      };
    },
    watch: {
      value: function value(open) {
        if (open) {
          this.open();
        } else {
          this.close();
        }
      }
    },
    methods: {
      open: function open() {
        if (!overlay) {
          this.renderOverLay();
        }

        this.portalTo();

        if (!this.onBindPopState && this.popClose) {
          dom.on(window, 'popstate', this.bindPopState);
          this.onBindPopState = true;
        }

        this.hasRendered = true;
      },
      close: function close() {
        if (!this.hasRendered) return;

        if (overlay) {
          this.destroyOverlay(overlay, function () {
            overlay = null;
          });
        }

        this.unbindPopState();
        this.hasRendered = false;
        this.$emit('input', false);
      },
      unLoadImmediately: function unLoadImmediately(target) {
        target.$destroy();
        dom.removeElement(target.$el);
        this.unlockScroll();
      },
      renderOverLay: function renderOverLay() {
        if (this.$isServer) return;

        if (!overlay) {
          overlay = this.mountOverlay();
          seed += 1;
        }

        overlay.show = true;
      },
      portalTo: function portalTo() {
        var _this = this;

        if (this.$isServer) return;
        this.$nextTick(function () {
          _this.portal(_this.$el);
        });
      },
      bindPopState: function bindPopState() {
        if (!this.onBindPopState) return;
        this.unLoadImmediately(this);
        this.unLoadImmediately(overlay);
        overlay = null;
        this.unbindPopState();
      },
      unbindPopState: function unbindPopState() {
        var _this2 = this;

        var $isServer = this.$isServer,
            onBindPopState = this.onBindPopState;
        if ($isServer || !onBindPopState) return;
        this.$nextTick(function () {
          dom.off(window, 'popstate', _this2.bindPopState);
          _this2.onBindPopState = false;
        });
      }
    },
    computed: {
      shouldRender: function shouldRender() {
        return this.value;
      },
      getZindex: function getZindex() {
        return baseZindex + seed;
      }
    },
    mounted: function mounted() {
      if (this.shouldRender) {
        this.open();
      }
    }
  };
}

exports["default"] = popMixin;
