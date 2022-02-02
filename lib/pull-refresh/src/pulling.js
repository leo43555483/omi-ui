'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('../../loading/index.js');
var index = require('../../loading/src/index.vue.js');

var Pulling = function Pulling() {
  return {
    props: {
      threshold: {
        type: Number,
        default: 0
      },
      distance: {
        type: Number,
        default: 0
      }
    },
    watch: {
      showIndex: {
        handler: function handler(index) {
          if (this.$refs.loading) this.$refs.loading.show(index);
        },
        immediate: true
      }
    },
    computed: {
      showIndex: function showIndex() {
        var threshold = this.threshold,
            distance = this.distance;
        return parseInt((distance + 1) / Math.round(threshold / 12), 10);
      }
    },
    render: function render() {
      var h = arguments[0];
      return h("div", {
        "class": "omi-pull-refresh__spinner"
      }, [h(index["default"], {
        "ref": "loading",
        "attrs": {
          "lazyShow": true,
          "spinner": true
        }
      })]);
    }
  };
};

var Pulling$1 = Pulling();

exports["default"] = Pulling$1;
