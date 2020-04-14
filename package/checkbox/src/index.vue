<template>
  <div :role="role" :aria-checked="isChecked" :class="wrapperClasses" @click="onClick">
    <div :class="inputClasses">
      <div :class="innerClasses">
        <i class="omi-icon">1</i>
      </div>
    </div>
    <slot>
      <span v-if="text">{{text}}</span>
    </slot>
  </div>
</template>

<script>
import createCheckMixin from '../../mixins/check';

export default {
  name: 'OmiCheckbox',
  mixins: [createCheckMixin({
    type: 'checkbox',
    classPrefix: 'omi-checkbox',
    checkParent: 'omiCheckGroup',
    unbindParent: 'indeterminate',
  })],
  watch: {
    value(value) {
      this.$emit('change', value);
    },
  },
  props: {
    indeterminate: {
      type: Boolean,
      default: false,
    },
    prop: {
      type: [String, Number, Boolean],
      default: null,
    },
    value: {
      type: Boolean,
      default: false,
    },
    text: {
      type: String,
      default: '',
    },
    square: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    onClick(e) {
      e.stopPropagation();
      this.check();
    },
    check(isChecked = !this.isChecked) {
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.isChecked = isChecked;
      });
    },
  },
  computed: {
    isChecked: {
      get() {
        if (this.parent) {
          return this.parent.isChecked(this.prop);
        }
        return this.value;
      },
      set(isCheck) {
        const { parent } = this;
        if (parent) {
          this.parent.toggle(isCheck, this.prop);
        }
        this.$emit('input', isCheck);
      },
    },
  },
  beforeDestroy() {
    if (this.timer) clearTimeout(this.timer);
  },
};
</script>

<style>

</style>
