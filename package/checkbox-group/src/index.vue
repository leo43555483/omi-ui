<template>
  <div class="omi-checkbox-group" :class="{'omi-checkbox-horizontal': horizontal}">
    <slot />
  </div>
</template>

<script>
import groupMxin from '../../mixins/check-group';

export default {
  name: 'OmiCheckboxGroup',
  mixins: [groupMxin],
  provide() {
    return {
      omiCheckGroup: this,
    };
  },
  data() {
    return {
      children: [],
    };
  },
  props: {
    max: {
      type: [String, Number],
      default: -1,
    },
  },
  watch: {
    value(value) {
      this.$emit('change', value);
    },
  },
  methods: {
    toggle(isCheck, value) {
      const index = this.getValueIndex(value);
      const model = [].concat(this.value);
      if (isCheck) {
        const { max } = this;
        if (this.value.length >= max && max >= 0) return;
        if (index === -1) model.push(value);
      } else if (isCheck === false) {
        if (index >= 0) model.splice(index, 1);
      }
      this.$emit('input', model);
    },
    getValueIndex(value) {
      return this.value.indexOf(value);
    },
    toggleAll(isCheck = null) {
      if (isCheck === false) {
        this.$emit('input', []);
        return;
      }
      let { children } = this;
      const { max } = this;
      // toggle
      if (isCheck === null) {
        children = children.filter((child) => !child.isChecked);
      }
      if (max >= 0 && children.length > max) {
        children = children.slice(0, max);
      }
      const model = children.map((child) => child.prop);
      this.$emit('input', model);
    },
    isChecked(value) {
      return this.getValueIndex(value) >= 0;
    },
  },
};
</script>
