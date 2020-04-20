<template>
  <div class="omi-collapse">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'OmiCollapse',
  data() {
    return {
      children: [],
    };
  },
  provide() {
    return {
      parent: this,
    };
  },
  props: {
    value: {
      type: Array,
      default: () => [],
    },
    accordion: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    hasName(name) {
      return this.value.indexOf(name) > -1;
    },
    open(isOpen, name) {
      const { value, accordion } = this;
      let list = [].concat(value);
      if (isOpen) {
        if (!this.hasName(name)) list.push(name);
        if (accordion) list = list.filter((item) => item === name);
      } else {
        list = value.filter((item) => item !== name);
      }
      this.$emit('input', list);
    },
  },
};
</script>
