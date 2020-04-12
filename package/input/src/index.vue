<template>
  <div class="omi-input">
    <input
      class="omi-input__inner"
      :type="type"
      v-on="listeners"
      v-bind="$attrs"
      :value="value"
    />
  </div>
</template>

<script>
import { oneOf, isKorean } from '../../../src/utils/shared';
import filedMixin from '../../mixins/field';

const INPUT_TYPE = ['text', 'textarea', 'password', 'url', 'email', 'date', 'number', 'tel', 'search'];
export default {
  name: 'OmiInput',
  mixins: [filedMixin],
  inheritAttrs: false,
  data() {
    return {
      isComposing: false,
    };
  },
  methods: {
    onInput(e) {
      if (this.isComposing) return;
      this.$emit('input', e.target.value);
    },
    onKeyPress(e) {
      if (this.type === 'search' && e.keyCode === 13) {
        this.blur();
      }
      this.$emit('keypress', e);
    },
    onFocus(e) {
      this.$emit('focus', e);
    },
    onBlur(e) {
      this.$emit('blur', e);
      this.validateTriggerOn('blur');
    },
    onCompositionUpdate(e) {
      const text = e.target.value;
      const lastCharacter = text[text.length - 1] || '';
      this.isComposing = !isKorean(lastCharacter);
    },
    onCompositionStart() {
      this.isComposing = true;
    },
    onCompositionEnd(e) {
      if (this.isComposing) {
        this.isComposing = false;
        this.onInput(e);
      }
    },
  },
  watch: {
    value() {
      this.validateTriggerOn('change');
    },
  },
  props: {
    type: {
      validator(value) {
        return oneOf(value, INPUT_TYPE);
      },
      default: 'text',
    },
    value: {
      type: [String, Number],
      default: '',
    },
  },
  computed: {
    listeners() {
      return {
        ...this.$listeners,
        input: this.onInput,
        focus: this.onFocus,
        blur: this.onBlur,
        keypress: this.onKeyPress,
        compositionstart: this.onCompositionStart,
        compositionupdate: this.onCompositionUpdate,
        compositionend: this.onCompositionEnd,
      };
    },
  },
};
</script>

<style>

</style>
