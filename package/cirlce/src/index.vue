<template>
  <div class="omi-circle" >
    <div class="omi-circle__wrapper" :style="wrapperStyles">
      <svg :viewBox="viewBox">
        <defs v-if="isGradient">
          <linearGradient :id="gradientId"  x1="0%" y1="0%" x2="100%" y2="0%">
            <stop
              v-for="(color, rate, index) in strokeColor"
              :key="index"
              :offset="rate"
              :stop-color="color"
            />
          </linearGradient>
        </defs>
        <path :d="getPath" class="omi-circle__base" :style="baseStyle"></path>
        <path :d="getPath" class="omi-circle__stroke" :style="layStyle"></path>
      </svg>
      <slot>
        <div class="omi-cirecle__text" v-if="text">{{text}}</div>
        <div class="omi-cirecle__text" v-else>{{formatPercentage}}%</div>
      </slot>
    </div>
  </div>
</template>

<script>
import { getSizeString, oneOf, isObject } from '../../../src/utils/shared';

const STROKE_LINECAP = ['butt', 'round', 'square'];

const STROKE_DEFAULT_WIDTH = 40;
const BASE_SIZE = 800;
const DEFAULT_RADIUS = 40;
const DEFAULT_TRANSITION = 'ease';
const DEFAULT_DURATION = '.3s';
const MAX_DEFAULT = 100;
const CX = 400;
let uid = 0;
export default {
  name: 'OmiCircle',
  props: {
    circleRadius: {
      type: Number,
      default: DEFAULT_RADIUS,
    },
    strokeWidth: {
      type: [Number, String],
      default: STROKE_DEFAULT_WIDTH,
    },
    strokeColor: {
      type: [String, Object],
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
    max: {
      type: Number,
      default: MAX_DEFAULT,
      validator(value) {
        return value <= 100;
      },
    },
    text: {
      type: String,
      default: null,
    },
    strokeLinecap: {
      type: String,
      validator(value) {
        return oneOf(value, STROKE_LINECAP);
      },
      default: null,
    },
    transition: {
      type: [Boolean, String],
      default: DEFAULT_TRANSITION,
    },
  },
  computed: {
    // 周长
    perimeter() {
      const { PI, ceil } = Math;
      return ceil(PI * 800);
    },
    // 直径
    diameter() {
      return this.circleRadius * 2;
    },
    isGradient() {
      return isObject(this.strokeColor);
    },
    customColor() {
      if (!this.isGradient) return this.strokeColor;
      return `url(#${this.gradientId})`;
    },
    wrapperStyles() {
      const { diameter } = this;
      return `height: ${diameter}px; width: ${diameter}px`;
    },
    baseStyle() {
      return `stroke-width: ${this.sizeString}px;`;
    },
    formatPercentage() {
      const { max } = this;
      const result = Math.ceil(this.percentage * 1);
      return result >= max ? max : result;
    },
    perimeterRate() {
      const { perimeter, max } = this;
      const percentage = this.formatPercentage;
      if (percentage >= max) return null;
      const { ceil } = Math;
      const result = ceil((percentage / 100) * perimeter);
      return result;
    },
    layStyle() {
      const {
        sizeString, customColor, perimeter, perimeterRate, transition, strokeLinecap,
      } = this;
      const animate = transition ? `transition: stroke-dasharray ${DEFAULT_DURATION} ${transition};` : null;
      const dashArray = `${perimeterRate}px ${perimeter}px`;
      const linecap = strokeLinecap ? `stroke-linecap: ${strokeLinecap};` : null;
      return `
        stroke-width: ${sizeString * 1 + 1}px; 
        stroke: ${customColor}; 
        stroke-dasharray: ${dashArray}; ${animate};
        ${linecap}
      `;
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
      const { baseSize, clockwise } = this;
      const isClockWise = clockwise ? 1 : 0;
      return `M ${baseSize / 2} ${baseSize / 2} m 0 -${CX} a ${CX} ${CX} 0 1 ${isClockWise} 0, ${CX * 2} a ${CX} ${CX} 0 1 ${isClockWise} 0, -${CX * 2}`;
    },
  },
  created() {
    uid += 1;
    this.gradientId = `omi-circle__gradient-${uid}`;
  },
};
</script>
