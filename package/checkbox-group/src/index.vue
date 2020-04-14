<template>
  <div class="omi-checkbox-group">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'OmiCheckboxGroup',
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
    value: {
      type: Array,
      default: () => [],
    },
    max: {
      type: [String, Number],
      default: null,
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
        if (this.value.length >= max && max) return;
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
      // toggle
      if (isCheck === null) {
        children = children.filter((child) => !child.isChecked);
        console.log('togggle', children);
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

<style>

</style>
