import { oneOf } from '../../utils/shared.js';

//
var DEFAULT_ROW = 3;
var DEFAULT_AVATAR_SIZE = 32;
var DEFAUTL_TITLE_WIDTT = 40;
var DEFAUTL_BUTTON_WIDTT = 100;
var BUTTON_ROUND = 'round';
var BUTTON_SQUARE = 'square';
var AVATAR_ROUND = 'round';
var AVATAR_SQUARE = 'square';
var script = {
  name: 'OmiSkeleton',
  props: {
    animate: {
      type: Boolean,
      default: true
    },
    avatar: {
      type: Boolean,
      default: false
    },
    titleWidth: {
      type: Number,
      default: DEFAUTL_TITLE_WIDTT
    },
    buttonWidth: {
      type: Number,
      default: DEFAUTL_BUTTON_WIDTT
    },
    avatarSize: {
      type: Number,
      default: DEFAULT_AVATAR_SIZE
    },
    title: {
      type: Boolean,
      default: true
    },
    loading: {
      type: Boolean,
      default: false
    },
    avatarShape: {
      type: String,
      default: AVATAR_ROUND,
      validator: function validator(value) {
        return oneOf(value, [AVATAR_SQUARE, AVATAR_ROUND]);
      }
    },
    buttonShape: {
      type: String,
      default: BUTTON_ROUND,
      validator: function validator(value) {
        return oneOf(value, [BUTTON_SQUARE, BUTTON_ROUND]);
      }
    },
    rows: {
      type: Number,
      default: DEFAULT_ROW
    }
  },
  computed: {
    titleStyles: function titleStyles() {
      return "width: " + this.titleWidth + "%";
    },
    buttonStyles: function buttonStyles() {
      return "width: " + this.buttonWidth + "%";
    },
    avatarStyles: function avatarStyles() {
      var avatarSize = this.avatarSize;
      return "width: " + avatarSize + "px; height: " + avatarSize + "px";
    },
    wrapperClass: function wrapperClass() {
      return {
        'omi-skeleton__animate': this.animate
      };
    },
    contentClass: function contentClass() {
      var buttonShape = this.buttonShape;
      return {
        'omi-skeleton__button--round': buttonShape === BUTTON_ROUND
      };
    },
    avatarClass: function avatarClass() {
      var avatarShape = this.avatarShape;
      return {
        'omi-skeleton__avatar--round': avatarShape === AVATAR_ROUND
      };
    }
  }
};

export { script as default };
