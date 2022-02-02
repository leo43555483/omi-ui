import panelMixin from './panel';
import { isArray, unDef } from '../utils/shared';

const isTrue = (value) => value === true;
const DEFAULT_ACTIVE_INDEX = 0;
const swipeMixin = (listKey) => ({
  mixins: [panelMixin],
  data() {
    return {
      activeIndex: DEFAULT_ACTIVE_INDEX,
      swiperWidth: 0,
      children: [],
      inited: false,
    };
  },
  watch: {
    activeIndex() {
      this.scrollPane();
    },
    shouldRender(shouldRender) {
      if (shouldRender) this.initializeSwipe();
    },
  },
  props: {
    swipleable: {
      type: Boolean,
      default: true,
      validator: isTrue,
    },
    animated: {
      type: Boolean,
      default: true,
      validator: isTrue,
    },
    initialIndex: {
      type: Number,
      default: DEFAULT_ACTIVE_INDEX,
    },
  },
  methods: {
    initializeSwipe() {
      this.setSwiperWidth();
      this.activeIndex = this.initialIndex;
      this.inited = false;
      this.scrollPane();
    },
    getPaneWidth() {
      return this.swiperWidth || this.$el.offsetWidth;
    },
    updateIndex(currentIndex) {
      if (this.activeIndex !== currentIndex) {
        this.activeIndex = currentIndex;
        this.$emit('change', currentIndex);
      }
    },
    getScrollerClasses(className) {
      return {
        'omi-swipe__content--wrapper': true,
        [`${className}--wrapper`]: !unDef(className),
        'omi-swipe__animated': this.inited,
      };
    },
    getSwipeBody(className) {
      return (getList) => (
        <div class={['omi-swipe__body', className]} ref="pane">
          <div
            class={this.getScrollerClasses(className)}
            style={this.swipeBodyStyles}
          >
            {getList('omi-swipe__item', this.itemStyle)}
          </div>
        </div>
      );
    },
    setSwiperWidth() {
      this.$nextTick(() => {
        this.swiperWidth = this.$el.offsetWidth;
      });
    },
  },
  computed: {
    listLength() {
      if (!isArray(this[listKey])) return 0;
      return this[listKey].length;
    },
    itemStyle() {
      const { swiperWidth } = this;
      return `width: ${swiperWidth}px`;
    },
    swipeBodyStyles() {
      const { paneStyles, swiperWidth, listLength } = this;
      const width = swiperWidth * listLength;
      return `width: ${width}px; ${paneStyles}`;
    },

  },
  mounted() {
    this.initializeSwipe();
  },
});

export default swipeMixin;
