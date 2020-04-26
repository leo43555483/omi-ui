<template>
  <button
    class="omi-btn"
    :disabled="disabled"
    :type="nativeType"
    :class="buttonClass"
    v-on="$listeners"
  >
    <loading v-show="loading" size="20" class="omi-btn__loading" />
    <span class="omi-btn__text" v-if="showLoadingText">{{loadingText}}</span>
    <span class="omi-btn__text" v-else>
      <slot>{{text}}</slot>
    </span>
  </button>
</template>

<script>
import Loading from '../../loading';
import { oneOf, createClassMap } from '../../../src/utils/shared';

const BUTTON_SIZE = ['large', 'normal', 'small', 'mini'];
const BUTTON_TYPE = ['default', 'primary', 'danger', 'info', 'warning', 'success'];
const BUTTON_NATIVE_TYPE = ['submit', 'button', 'reset'];
const BUTTON_SHAPE = ['square', 'round'];
export default {
  name: 'OmiButton',
  props: {
    size: {
      type: String,
      validator(value) {
        return oneOf(value, BUTTON_SIZE);
      },
      default: 'normal',
    },
    nativeType: {
      type: String,
      validator(value) {
        return oneOf(value, BUTTON_NATIVE_TYPE);
      },
      default: 'button',
    },
    type: {
      type: String,
      validator(value) {
        return oneOf(value, BUTTON_TYPE);
      },
      default: 'primary',
    },
    block: {
      type: Boolean,
      default: false,
    },
    text: {
      type: String,
      default: '',
    },
    loadingText: {
      type: String,
      default: '',
    },
    round: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  components: { Loading },
  computed: {
    showLoadingText() {
      return this.loading && this.loadingText;
    },
    typeClassesMap() {
      return createClassMap('omi-btn__', BUTTON_TYPE);
    },
    sizeClassesMap() {
      return createClassMap('omi-btn__', BUTTON_SIZE);
    },
    shapeClassesMap() {
      return createClassMap('omi-btn__', BUTTON_SHAPE);
    },
    buttonClass() {
      const {
        type, size, typeClassesMap, sizeClassesMap, shapeClassesMap, block,
      } = this;
      const [square, round] = BUTTON_SHAPE;
      const shape = this.round ? round : square;
      const typeClass = typeClassesMap ? typeClassesMap[type] : null;
      const sizeClass = sizeClassesMap ? sizeClassesMap[size] : null;
      const shapeClass = shapeClassesMap ? shapeClassesMap[shape] : null;
      const blockClass = block ? 'omi-btn__block' : null;
      // const rippleClass = ripple ? 'omi-btn__ripple' : null;
      return [typeClass, sizeClass, shapeClass, blockClass];
    },
  },
};
</script>

<style>
</style>
