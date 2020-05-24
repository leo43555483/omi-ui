<template>
  <div class="omi-skeleton" :class="wrapperClass" v-if="loading">
    <div
      class="omi-skeleton-avatar"
      :class="avatarClass"
      :style="avatarStyles"
      v-if="avatar"
    >
    </div>
    <div class="omi-skeleton__body" :class="contentClass">
      <h3 class="omi-skeleton__title"
        v-if="title"
        :style="titleStyles"
      ></h3>
      <ul class="omi-skeleton__content" >
        <li v-for="row in rows" :key="row" :style="buttonStyles"></li>
      </ul>
    </div>
  </div>
</template>

<script>
import { oneOf } from '../../../src/utils/shared';

const DEFAULT_ROW = 3;
const DEFAULT_AVATAR_SIZE = 32;
const DEFAUTL_TITLE_WIDTT = 40;
const DEFAUTL_BUTTON_WIDTT = 100;

const BUTTON_ROUND = 'round';
const BUTTON_SQUARE = 'square';
const AVATAR_ROUND = 'round';
const AVATAR_SQUARE = 'square';

export default {
  name: 'OmiSkeleton',
  props: {
    animate: {
      type: Boolean,
      default: true,
    },
    avatar: {
      type: Boolean,
      default: false,
    },
    titleWidth: {
      type: Number,
      default: DEFAUTL_TITLE_WIDTT,
    },
    buttonWidth: {
      type: Number,
      default: DEFAUTL_BUTTON_WIDTT,
    },
    avatarSize: {
      type: Number,
      default: DEFAULT_AVATAR_SIZE,
    },
    title: {
      type: Boolean,
      default: true,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    avatarShape: {
      type: String,
      default: AVATAR_ROUND,
      validator(value) {
        return oneOf(value, [AVATAR_SQUARE, AVATAR_ROUND]);
      },
    },
    buttonShape: {
      type: String,
      default: BUTTON_ROUND,
      validator(value) {
        return oneOf(value, [BUTTON_SQUARE, BUTTON_ROUND]);
      },
    },
    rows: {
      type: Number,
      default: DEFAULT_ROW,
    },
  },
  computed: {
    titleStyles() {
      return `width: ${this.titleWidth}%`;
    },
    buttonStyles() {
      return `width: ${this.buttonWidth}%`;
    },
    avatarStyles() {
      const { avatarSize } = this;
      return `width: ${avatarSize}px; height: ${avatarSize}px`;
    },
    wrapperClass() {
      return {
        'omi-skeleton__animate': this.animate,
      };
    },
    contentClass() {
      const { buttonShape } = this;
      return {
        'omi-skeleton__button--round': buttonShape === BUTTON_ROUND,
      };
    },
    avatarClass() {
      const { avatarShape } = this;
      return {
        'omi-skeleton__avatar--round': avatarShape === AVATAR_ROUND,
      };
    },
  },
};
</script>
