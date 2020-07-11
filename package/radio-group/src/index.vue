<template>
  <div class="omi-radio-group" :class="{'omi-checkbox-horizontal': horizontal}">
    <slot />
  </div>
</template>

<script>
import groupMxin from '../../mixins/check-group';
import provideMixin from '../../mixins/provider';

export default {
  name: 'OmiRadioGroup',
  mixins: [groupMxin, provideMixin('omiRadioGroup')],
  // provide() {
  //   return {
  //     omiRadioGroup: this,
  //   };
  // },
  props: {
    value: {
      type: [String, Number, Boolean],
      default: null,
    },
  },
  watch: {
    value(value) {
      this.$emit('change', value);
    },
  },
  methods: {
    isChecked(value) {
      return value === this.value;
    },
    toggle(checked, prop) {
      if (checked === false || prop === this.vlue) return;
      this.$emit('input', prop);
    },
  },
};
</script>
