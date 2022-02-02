import { isKorean, isFunction } from '../utils/shared';

export default {
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
        this.$emit('search', e);
      }
    },
    onFocus(e) {
      this.$emit('focus', e);
    },
    onBlur(e) {
      this.$emit('blur', e);
      if (isFunction(this.validateTriggerOn)) this.validateTriggerOn('blur');
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
