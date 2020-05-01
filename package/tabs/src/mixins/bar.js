import { scrollLeft } from '../../../../src/utils/dom';

const toFixed = (num) => num.toFixed(5);
const MAX_TITLE_NUMBER = 4;
export default {
  data() {
    return {
      lineOffset: 0,
    };
  },
  methods: {
    scrollBarToView(animated) {
      const { scrollAble, activeIndex } = this;
      const labels = this.$refs.label;
      const labelItem = labels[activeIndex];
      if (
        !scrollAble
        || !labels.length
        || !labelItem
      ) return;
      const { bar } = this.$refs;
      const { offsetLeft, offsetWidth } = labelItem;
      const from = bar.scrollLeft;
      const to = offsetLeft - (bar.offsetWidth - offsetWidth) / 2;
      const distance = to - from;
      const duration = animated ? this.titleScrollDuration : 0;
      scrollLeft(bar, distance, duration);
    },
    scrollLine() {
      const { activeIndex, labels } = this;
      const label = this.$refs.label[activeIndex];
      if (!label || !labels.length || label.disalbed) return;
      this.lineOffset = activeIndex * 100;
    },
  },
  computed: {
    lineClass() {
      const { inited } = this;
      return {
        'omi-tabs_bar--animated': inited,
      };
    },
    labelRateWidth() {
      return toFixed((1 / MAX_TITLE_NUMBER) * 100);
    },
    labelStyle() {
      if (this.labels.length <= MAX_TITLE_NUMBER) return null;
      const { labelRateWidth } = this;
      return `flex-basis: ${labelRateWidth}%;`;
    },
    lineStyle() {
      return `
        width:${this.labelRateWidth}%; 
        transform: translateX(${this.lineOffset}%) translateZ(0)
      `;
    },
    scrollAble() {
      return this.labels.length > MAX_TITLE_NUMBER;
    },
    labels() {
      return this.children.filter(({ label }) => label !== null);
    },
  },
};
