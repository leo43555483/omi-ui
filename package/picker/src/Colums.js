import injectMixin from '../../mixins/inject';
import touchMixin from '../../mixins/touch';
import { on, off, preventDefault } from '../../../src/utils/dom';
import { getRange, unDef, isFunction } from '../../../src/utils/shared';

// Minimum distance to trigger scrolling
const TRIGGER_MINI_DISTANCE = 15;
// Minimum time difference to trigger scrolling
const TRIGGER_MINI_TIME = 300;
const ROTATEX = 25;
const SPEED_COEFFICIENT = 0.3;

export const MAX_VISIBLE_ITEM = 5;
export const DEFAULT_ITEM_HEIGHT = 42;
export const DEFAULT_DURATION = 800;

const getTransformFromDom = (el) => {
  let matrix = window.getComputedStyle(el, null).getPropertyValue('transform');
  matrix = /[\S\s]*\((.+?)\)/.exec(matrix)[1].split(',');
  const transformY = matrix[matrix.length - 1];
  return transformY * 1;
};
const PickerColums = () => ({
  name: 'OmiPickColums',
  mixins: [injectMixin('omiPicker'), touchMixin],
  data() {
    return {
      currentIndex: 0,
      currentDuration: 0,
      startDate: 0,
      startTransformY: 0,
      transformY: 0,
      fingerStartY: 0,
      bindedEvent: false,
      isMoving: false,
      afterTransition: [],
      transitionPayload: {
        duration: 0,
        property: 'none',
      },
      inited: false,
    };
  },
  props: {
    // ms
    duration: {
      type: Number,
      default: DEFAULT_DURATION,
    },
    itemHeight: {
      type: Number,
      default: DEFAULT_ITEM_HEIGHT,
    },
    defaultIndex: {
      type: Number,
      default: 0,
    },
    data: {
      type: Array,
      default: () => [],
    },
  },
  watch: {
    data() {
      const { defaultIndex } = this;
      this.scrollTo(null, this.getValidDefaultIndex(defaultIndex));
    },
    defaultIndex(index) {
      if (this.isMoving) return;
      this.scrollTo(null, this.getValidDefaultIndex(index));
    },
  },
  methods: {
    // @exposed-api
    getActiveValue() {
      const { data, currentIndex } = this;
      const payload = data[currentIndex];
      if (payload) {
        return {
          label: data[currentIndex].label,
          value: data[currentIndex].value,
        };
      }
      return {};
    },
    // @exposed-api
    setActiveValue(value) {
      return new Promise((resolve) => {
        this.$nextTick(() => {
          let activeIndex = -1;
          // eslint-disable-next-line no-plusplus
          for (let i = 0; i < this.dataLength; i++) {
            if (this.data[i].value === value) {
              activeIndex = i;
              break;
            }
          }
          if (activeIndex !== -1) {
            this.scrollTo(null, activeIndex, resolve);
          } else {
            resolve();
          }
        });
      });
    },
    setActiveIndex(index) {
      this.currentIndex = index;
    },
    onClickItem(index) {
      this.scrollTo(null, index);
    },
    getItemClasses(index) {
      const cls = ['omi-picker-colum__list--item'];
      if (index === this.currentIndex) {
        cls.push('omi-picker-colum__list--active');
      }
      return cls;
    },
    getItemStyle(index) {
      const { itemHeight, transformY, isMoving } = this;
      const { abs } = Math;
      const rotateX = ((abs(transformY) - index * itemHeight) / itemHeight) * ROTATEX;
      return {
        height: `${itemHeight}px`,
        transform: `rotateX(${rotateX}deg)`,
        'will-change': isMoving ? 'transform' : null,
      };
    },
    getValidDefaultIndex(index) {
      return unDef(this.data[index]) ? 0 : index;
    },
    getListItem() {
      const { getItemClasses, getItemStyle, onClickItem } = this;
      return this.data.map((item, index) => (
        <li
          onClick={() => onClickItem(index)}
          style={getItemStyle(index)}
          role="button"
          class={getItemClasses(index)}
          key={item.uid}
        >
          {item.label}
        </li>
      ));
    },
    onTouchStart(e) {
      this.touchStart(e);
      if (!this.isMoving) {
        this.startTransformY = this.transformY;
      } else {
        const domTransformY = getTransformFromDom(this.$refs.list);
        this.startTransformY = domTransformY - this.basePosition;
      }
      this.startDate = Date.now();
      this.fingerStartY = this.startTransformY;
      this.resetStatus();
    },
    onTouchMove(e) {
      this.touchMove(e);
      const { direction, moveY } = this;
      if (direction === 'vertical') {
        preventDefault(e);
        this.isMoving = true;
      }
      this.setTransform(moveY);
      const cur = Date.now();
      if (cur - this.startDate > TRIGGER_MINI_TIME) {
        this.startDate = cur;
        this.fingerStartY = this.transformY;
      }
    },
    onTouchEnd() {
      const timeDiff = Date.now() - this.startDate;
      const distance = this.transformY - this.fingerStartY;
      const needScroll = timeDiff < TRIGGER_MINI_TIME && Math.abs(distance) >= TRIGGER_MINI_DISTANCE;
      if (needScroll) {
        const { duration } = this;
        const offset = (distance / timeDiff) * SPEED_COEFFICIENT * duration;

        const destination = this.transformY + offset;
        this.scrollTo(-destination);
      } else if (this.isMoving) {
        this.scrollTo(-this.transformY);
      }
    },
    setTransform(moveY) {
      const { startTransformY, itemHeight, dataLength } = this;
      const offset = startTransformY + moveY;
      this.transformY = getRange(offset, itemHeight, -(dataLength * itemHeight));
    },
    resetStatus() {
      this.isMoving = false;
      if (!this.inited) this.inited = true;
      this.afterTransition = [];
      this.setTransition();
    },
    onTransitionEnd() {
      this.flushCallBack();
      this.resetStatus();
    },
    flushCallBack() {
      while (this.afterTransition.length) {
        const afterTransition = this.afterTransition.pop();
        if (afterTransition) afterTransition();
      }
    },
    setTransition(duration = 0, property = 'none') {
      this.transitionPayload = {
        duration,
        property,
      };
    },
    scrollCallBack(index) {
      if (this.currentIndex !== index) this.setActiveIndex(index);
      this.$emit('change');
    },
    scrollTo(offset, currentIndex = null, cb = null) {
      const { itemHeight, getValidIndex, isMoving } = this;

      let index = currentIndex;
      if (currentIndex === null) {
        index = getValidIndex(offset / itemHeight);
      }

      const transformY = index * itemHeight;
      if (this.inited) {
        this.setTransition(this.duration, 'all');
        if (!this.isMoving) this.isMoving = true;
      }
      this.transformY = -transformY;

      const scrollCallBack = () => {
        this.scrollCallBack(index);
        if (isFunction(cb)) cb();
      };

      if (!this.inited || isFunction(cb)) {
        this.onTransitionEnd();
        this.setActiveIndex(index);
        scrollCallBack();

        return;
      }

      if (isMoving || index !== this.currentIndex) {
        if (this.afterTransition.length) {
          this.flushCallBack();
        }

        this.afterTransition.push(scrollCallBack);
      } else {
        this.onTransitionEnd();
        this.setActiveIndex(index);
      }
    },
    getValidIndex(index) {
      return getRange(Math.round(index), this.dataLength - 1, 0);
    },
    bindTouchEvent(fn, binded) {
      const { list } = this.$refs;
      const wrapper = this.$el;
      fn(wrapper, 'touchstart', this.onTouchStart);
      fn(wrapper, 'touchmove', this.onTouchMove, false);
      fn(wrapper, 'touchend', this.onTouchEnd);
      fn(list, 'transitionend', this.onTransitionEnd);
      this.bindedEvent = binded;
    },
  },
  computed: {
    dataLength() {
      return this.data.length;
    },
    wrapperStyles() {
      const { itemHeight } = this;
      return `height: ${itemHeight * MAX_VISIBLE_ITEM}px`;
    },
    basePosition() {
      const { itemHeight } = this;
      return (itemHeight * (MAX_VISIBLE_ITEM - 1)) / 2;
    },
    ListStyles() {
      const {
        basePosition, transformY, transitionPayload, isMoving,
      } = this;
      const offsetY = basePosition + transformY;
      return {
        transform: `translate3d(0, ${offsetY}px, 0)`,
        'transition-duration': `${transitionPayload.duration}ms`,
        'transition-property': `${transitionPayload.property}`,
        'will-change': isMoving ? 'transform' : null,
      };
    },
  },
  mounted() {
    this.$nextTick(() => {
      if (!this.bindedEvent) {
        this.bindTouchEvent(on, true);
      }
      const defaultIndex = this.getValidDefaultIndex(this.defaultIndex);
      if (defaultIndex !== this.currentIndex) {
        this.scrollTo(null, defaultIndex);
      } else {
        this.inited = true;
      }
    });
  },
  beforeUpdate() {
    if (!this.inited) {
      this.inited = true;
    }
  },
  beforeDestroy() {
    if (this.bindedEvent) this.bindTouchEvent(off, false);
  },
  render() {
    return (
      <div class="omi-picker-colum" ref="wrapper" style={this.wrapperStyles}>
        <ul class="omi-picker-colum__list" style={this.ListStyles} ref="list">
          {this.getListItem()}
        </ul>
      </div>
    );
  },
});

export default PickerColums();
