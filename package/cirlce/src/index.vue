<template>
  <div class="omi-circle" :style="wrapperStyles">
    <svg :viewBox="viewBox">
      <path :d="getPath" class="omi-circle__base" :style="baseStyle"></path>
      <path :d="getPath" class="omi-circle__stroke" :style="layStyle"></path>
    </svg>
    <slot>
      <div class="omi-cirecle__text">{{formatPercentage}}%</div>
    </slot>
  </div>
</template>

<script>
import { getSizeString } from '../../../src/utils/shared';

const STROKE_DEFAULT_WIDTH = 40;
const BASE_SIZE = 900;
const DEFAULT_RADIUS = 40;
const DEFAULT_TRANSITION = 'ease';
export default {
  name: 'OmiCircle',
  props: {
    circleRadius: {
      type: [Number],
      default: DEFAULT_RADIUS,
    },
    strokeWidth: {
      type: [Number, String],
      default: STROKE_DEFAULT_WIDTH,
    },
    strokeColor: {
      type: String,
      default: null,
    },
    clockwise: {
      type: Boolean,
      default: true,
    },
    percentage: {
      type: [String, Number],
      default: 0,
    },
    transition: {
      type: [Boolean, String],
      default: DEFAULT_TRANSITION,
    },
  },
  computed: {
    // 周长
    perimeter() {
      const { diameter } = this;
      const { PI, ceil } = Math;
      return ceil(PI * diameter * 10);
    },
    // 直径
    diameter() {
      return this.circleRadius * 2;
    },
    wrapperStyles() {
      const { diameter } = this;
      return `height: ${diameter}px; width: ${diameter}px`;
    },
    baseStyle() {
      return `stroke-width: ${this.sizeString}px;`;
    },
    formatPercentage() {
      return Math.ceil(this.percentage * 1);
    },
    perimeterRate() {
      const { perimeter } = this;
      let percentage = this.formatPercentage;
      percentage = percentage >= 100 ? 100 : percentage;
      const { ceil } = Math;
      const result = ceil((percentage / 100) * perimeter);
      return result;
    },
    layStyle() {
      const {
        sizeString, strokeColor, perimeter, perimeterRate, transition,
      } = this;
      console.log('perimeter', perimeter);
      const animate = transition ? `transition: stroke-dasharray .4s ${transition};` : null;
      const dashArray = `${perimeterRate}px ${perimeter}px`;
      return `stroke-width: ${sizeString * 1 + 1}px; stroke: ${strokeColor}; stroke-dasharray: ${dashArray}; ${animate}`;
    },
    sizeString() {
      const [size] = getSizeString(this.strokeWidth);
      return size;
    },
    baseSize() {
      const { sizeString } = this;
      const size = BASE_SIZE + sizeString * 1;
      return size;
    },
    viewBox() {
      const { baseSize } = this;
      return `0 0 ${baseSize} ${baseSize}`;
    },
    getPath() {
      const { baseSize, sizeString, clockwise } = this;
      const isClockWise = clockwise ? 1 : 0;
      return `M ${baseSize / 2} ${sizeString} a 400 400 0 1 ${isClockWise} 0, 800 a 400 400 0 1 ${isClockWise} 0, -800`;
    },

  },
};
</script>
