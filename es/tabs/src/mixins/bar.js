import { scrollLeft } from '../../../utils/dom.js';

var toFixed = function toFixed(num) {
  return num.toFixed(5);
};

var MAX_TITLE_NUMBER = 4;
var barMixin = {
  data: function data() {
    return {
      lineOffset: 0
    };
  },
  methods: {
    scrollBarToView: function scrollBarToView(animated) {
      var scrollAble = this.scrollAble,
          activeIndex = this.activeIndex;
      var labels = this.$refs.label;
      var labelItem = labels[activeIndex];
      if (!scrollAble || !labels.length || !labelItem) return;
      var bar = this.$refs.bar;
      var offsetLeft = labelItem.offsetLeft,
          offsetWidth = labelItem.offsetWidth;
      var from = bar.scrollLeft;
      var to = offsetLeft - (bar.offsetWidth - offsetWidth) / 2;
      var distance = to - from;
      var duration = animated ? this.titleScrollDuration : 0;
      scrollLeft(bar, distance, duration);
    },
    scrollLine: function scrollLine() {
      var activeIndex = this.activeIndex,
          labels = this.labels;
      var label = this.$refs.label[activeIndex];
      if (!label || !labels.length || label.disalbed) return;
      this.lineOffset = activeIndex * 100;
    }
  },
  computed: {
    lineClass: function lineClass() {
      var inited = this.inited;
      return {
        'omi-tabs_bar--animated': inited
      };
    },
    labelRateWidth: function labelRateWidth() {
      return toFixed(1 / MAX_TITLE_NUMBER * 100);
    },
    labelStyle: function labelStyle() {
      if (this.labels.length <= MAX_TITLE_NUMBER) return null;
      var labelRateWidth = this.labelRateWidth;
      return "flex-basis: " + labelRateWidth + "%;";
    },
    lineStyle: function lineStyle() {
      return "\n        width:" + this.labelRateWidth + "%;\n        transform: translateX(" + this.lineOffset + "%) translateZ(0)\n      ";
    },
    scrollAble: function scrollAble() {
      return this.labels.length > MAX_TITLE_NUMBER;
    },
    labels: function labels() {
      return this.children.filter(function (_ref) {
        var label = _ref.label;
        return label !== null;
      });
    }
  }
};

export { barMixin as default };
