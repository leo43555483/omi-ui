<template>
  <Cell class="omi-swipe-action__wrap" :class="{ 'omi-swipe-action__moving': isMoving }">
    <template #content>
      <div
        v-if="showSlot('left')"
        class="omi-swipe-action__actions omi-swipe-action__left"
        ref="left"
      >
        <slot name="left"></slot>
      </div>
      <div
        v-if="showSlot('right')"
        class="omi-swipe-action__actions omi-swipe-action__right"
        ref="right"
      >
        <slot name="right"></slot>
      </div>
      <div
        class="omi-swipe-action__content omi-swipe-action__transform"
        @touchstart="onTouchStart"
        @touchend="onTouchEnd"
        @touchmove="onMove"
        @transitionend="onTransitionEnd"
        @click="onClick"
        :style="styles"
      >
        <div class="omi-swipe-action__item--text">
          <slot>{{text}}</slot>
        </div>
        <div class="omi-swipe-action__item--extra" v-if="showSlot('extra')">
          <slot name="extra"></slot>
        </div>
        <slot name="arrow">
          <Icon type="enter" v-if="showArrow" />
        </slot>
      </div>
    </template>
  </Cell>
</template>

<script>
import Cell from '../../cell';
import Icon from '../../icon';
import { isFunction } from '../../../src/utils/shared';

const DEFAULT_THRESHOLD = 0.5;
const STATUS_ARRIVE = 'arrive';
const STATUS_RESET = 'reset';
const STATUS_MOVING = 'moving';
const STATUS_RESTING = 'reseting';
const MINI_DISTANCE = 5;

const { abs } = Math;
export default {
  name: 'OmiSwipeAction',
  data() {
    return {
      documentBody: null,
      startX: 0,
      startY: 0,
      moveX: 0,
      isHolding: false,
      status: STATUS_RESET,
      initialOffset: 0,
      slideArea: null,
      preX: 0,
      clientWith: {
        left: 0,
        right: 0,
      },
    };
  },
  components: { Cell, Icon },
  props: {
    text: {
      type: String,
    },
    showArrow: {
      type: Boolean,
      default: true,
    },
    threshold: {
      type: Number,
      default: DEFAULT_THRESHOLD,
    },
    autoClose: {
      type: [Function, Boolean],
      default: () => false,
    },
  },
  watch: {
    isMoving(isMoving) {
      if (isMoving) {
        this.preventDefaultEVent();
      } else {
        this.removePreventClass();
      }
    },
  },
  computed: {
    styles() {
      const { status, isHolding } = this;
      if (status !== STATUS_RESET || isHolding) {
        return `
          touch-action: pan-y;
          transform: translate3d(${this.moveX}px, 0,0) scale(1);
        `;
      }
      return null;
    },
    isMoving() {
      const { status, isHolding } = this;
      if (status === STATUS_MOVING) {
        return true;
      }
      if (status === STATUS_RESET && isHolding) {
        return true;
      }
      return false;
    },
  },
  methods: {
    removePreventClass() {
      this.documentBody.classList.remove('omi-swipe-action__no--event');
    },
    preventDefaultEVent() {
      this.documentBody.classList.add('omi-swipe-action__no--event');
    },
    isVertical(x, y) {
      const offsetX = abs(x - this.startX);
      const offsetY = abs(y - this.startY);
      if (offsetY > offsetX && offsetY > MINI_DISTANCE) return true;
      return false;
    },
    /**
     * @vue2doc-exposed-api:close
    */
    close() {
      this.restPosition(0);
    },
    onClick(e) {
      const { autoClose } = this;
      if (this.status === STATUS_ARRIVE) {
        const isAutoClose = autoClose;
        if (isFunction(autoClose)) {
          autoClose(e, () => {
            this.restPosition(0);
          });
        } else if (isAutoClose) this.restPosition(0);
      }
      this.$emit('click', e);
      if (this.isHolding) {
        this.isHolding = false;
      }
    },
    setStatus(status) {
      this.status = status;
    },
    onTransitionEnd() {
      if (this.status === STATUS_RESTING) {
        this.setStatus(STATUS_RESET);
      }
    },
    onTouchStart(e) {
      this.startX = this.getPoint(e).clientX;
      this.startY = this.getPoint(e).clientY;
      this.preX = this.startX;
      // 当前是左侧操作块滑动还是右侧滑动
      this.initialOffset = this.moveX;
      this.isHolding = true;
    },
    onTouchEnd(e) {
      const moveX = this.getPoint(e).clientX;
      const distance = this.getDistance(moveX);
      const direction = this.theDirection(moveX, this.preX);
      const actionWith = this.getFinalPosition(direction);
      let { threshold } = this;
      if (this.threshold > 1 || this.threshold <= 0) {
        threshold = DEFAULT_THRESHOLD;
      }
      if (actionWith !== 0 && abs(distance) >= abs(actionWith) * threshold) {
        this.moveToFinal(actionWith, 0);
      } else if (this.status !== STATUS_ARRIVE) {
        this.restPosition(0);
      }
      this.isHolding = false;
    },
    getFinalPosition(direction) {
      const { clientWith, slideArea } = this;
      if (slideArea === 'right') {
        if (direction === 'left') {
          return 0 - clientWith.right;
        }
      } else if (slideArea === 'left') {
        if (direction === 'right') {
          return 0 + clientWith.left;
        }
      }
      return 0;
    },
    getDistance(moveX) {
      const distance = moveX - this.startX + this.initialOffset;
      // eslint-disable-next-line radix
      return parseInt(distance);
    },
    onMove(e) {
      const moveX = this.getPoint(e).clientX;
      const moveY = this.getPoint(e).clientY;
      const { status } = this;
      if (status === STATUS_RESET && this.isVertical(moveX, moveY)) return;
      const direction = this.theDirection(moveX, this.preX);
      if (this.slideArea === null) {
        this.setSlideArea(direction);
      }
      if (this.invalidMove(moveX, this.startX)) {
        this.moveToFinal(this.getFinalPosition(direction), null);
        return;
      }
      const distance = this.getDistance(moveX);
      this.preX = moveX;
      this.walk(distance);
    },
    walk(position) {
      this.setStatus(STATUS_MOVING);
      this.moveTo(position);
    },
    moveToFinal(position, prex) {
      if (position === 0) {
        this.restPosition(prex);
      } else {
        this.moveTo(position);
        this.setStatus(STATUS_ARRIVE);
      }
    },
    restPosition(preX) {
      if (preX !== null) {
        this.preX = preX;
      }
      this.slideArea = null;
      this.setStatus(STATUS_RESTING);
      this.moveTo(0);
      this.setStatus(STATUS_RESET);
    },
    setSlideArea(direction) {
      this.slideArea = direction === 'left' ? 'right' : 'left';
      return this.slideArea;
    },
    moveTo(distance) {
      this.moveX = distance;
    },
    isOverOffset(moveX) {
      const { slideArea } = this;
      const distance = this.getDistance(moveX);
      const actionWith = this.clientWith[slideArea];
      // 判断是否超过操作按钮宽度,以及是否触及边缘
      if ((actionWith !== 0 && abs(distance) >= abs(actionWith))
        || this.isOverBorder(slideArea, this.moveX)) {
        return true;
      }
      return false;
    },
    isOverBorder(slideArea, offset) {
      if (slideArea === 'right') {
        return offset >= 0;
      }
      return offset <= 0;
    },
    invalidMove(moveX, startX) {
      const reset = this.status === STATUS_RESET;
      const direction = this.theDirection(moveX, this.startX);
      if (moveX === startX) return true;
      if (reset && !this.showSlot('left') && direction === 'right') return true;
      if (reset && !this.showSlot('right') && direction === 'left') return true;
      if (!reset && this.isOverOffset(moveX)) return true;
      return false;
    },
    theDirection(moveX, preX) {
      return moveX - preX > 0 ? 'right' : 'left';
    },
    getPoint(e) {
      return e.changedTouches[0];
    },
    showSlot(where) {
      return this.$slots[where];
    },
    getEleClientWith(el) {
      return el.clientWidth;
    },
    setClientWith(slotType, refKey) {
      if (this.showSlot(slotType)) {
        const el = this.$refs[slotType];
        const clientWith = this.getEleClientWith(el);
        this.clientWith = { ...this.clientWith, [refKey]: clientWith };
      }
    },
  },
  mounted() {
    this.documentBody = document.body;
    this.setClientWith('right', 'right');
    this.setClientWith('left', 'left');
  },
};

</script>
