import { oneOf, isObject, getSizeString } from '../../utils/shared.js';

//
var STROKE_LINECAP = ['butt', 'round', 'square'];
var STROKE_DEFAULT_WIDTH = 40;
var BASE_SIZE = 800;
var DEFAULT_RADIUS = 40;
var DEFAULT_TRANSITION = 'ease';
var DEFAULT_DURATION = '.3s';
var MAX_DEFAULT = 100;
var CX = 400;
var uid = 0;
var script = {
  name: 'OmiCircle',
  props: {
    circleRadius: {
      type: Number,
      default: DEFAULT_RADIUS
    },
    strokeWidth: {
      type: [Number, String],
      default: STROKE_DEFAULT_WIDTH
    },
    strokeColor: {
      type: [String, Object],
      default: null
    },
    clockwise: {
      type: Boolean,
      default: true
    },
    percentage: {
      type: [String, Number],
      default: 0
    },
    max: {
      type: Number,
      default: MAX_DEFAULT,
      validator: function validator(value) {
        return value <= 100;
      }
    },
    text: {
      type: String,
      default: null
    },
    strokeLinecap: {
      type: String,
      validator: function validator(value) {
        return oneOf(value, STROKE_LINECAP);
      },
      default: null
    },
    transition: {
      type: [Boolean, String],
      default: DEFAULT_TRANSITION
    }
  },
  computed: {
    // 周长
    perimeter: function perimeter() {
      var PI = Math.PI,
          ceil = Math.ceil;
      return ceil(PI * 800);
    },
    // 直径
    diameter: function diameter() {
      return this.circleRadius * 2;
    },
    isGradient: function isGradient() {
      return isObject(this.strokeColor);
    },
    customColor: function customColor() {
      if (!this.isGradient) return this.strokeColor;
      return "url(#" + this.gradientId + ")";
    },
    wrapperStyles: function wrapperStyles() {
      var diameter = this.diameter;
      return "height: " + diameter + "px; width: " + diameter + "px";
    },
    baseStyle: function baseStyle() {
      return "stroke-width: " + this.sizeString + "px;";
    },
    formatPercentage: function formatPercentage() {
      var max = this.max;
      var result = Math.ceil(this.percentage * 1);
      return result > max ? max : result;
    },
    perimeterRate: function perimeterRate() {
      var perimeter = this.perimeter,
          max = this.max;
      var percentage = this.formatPercentage;
      if (percentage > max) return null;
      var ceil = Math.ceil;
      var result = ceil(percentage / 100 * perimeter);
      return result;
    },
    layStyle: function layStyle() {
      var sizeString = this.sizeString,
          customColor = this.customColor,
          perimeter = this.perimeter,
          perimeterRate = this.perimeterRate,
          transition = this.transition,
          strokeLinecap = this.strokeLinecap;
      var animate = transition ? "transition: stroke-dasharray " + DEFAULT_DURATION + " " + transition + ";" : null;
      var dashArray = perimeterRate + "px " + perimeter + "px";
      var linecap = strokeLinecap ? "stroke-linecap: " + strokeLinecap + ";" : null;
      return "\n        stroke-width: " + (sizeString * 1 + 1) + "px;\n        stroke: " + customColor + ";\n        stroke-dasharray: " + dashArray + "; " + animate + ";\n        " + linecap + "\n      ";
    },
    sizeString: function sizeString() {
      var _getSizeString = getSizeString(this.strokeWidth),
          size = _getSizeString[0];

      return size;
    },
    baseSize: function baseSize() {
      var sizeString = this.sizeString;
      var size = BASE_SIZE + sizeString * 1;
      return size;
    },
    viewBox: function viewBox() {
      var baseSize = this.baseSize;
      return "0 0 " + baseSize + " " + baseSize;
    },
    getPath: function getPath() {
      var baseSize = this.baseSize,
          clockwise = this.clockwise;
      var isClockWise = clockwise ? 1 : 0;
      return "M " + baseSize / 2 + " " + baseSize / 2 + " m 0 -" + CX + " a " + CX + " " + CX + " 0 1 " + isClockWise + " 0, " + CX * 2 + " a " + CX + " " + CX + " 0 1 " + isClockWise + " 0, -" + CX * 2;
    }
  },
  created: function created() {
    uid += 1;
    this.gradientId = "omi-circle__gradient-" + uid;
  }
};

export { script as default };
