<template>
  <form class="omi-form" :autocomplete="autocomplete">
    <slot />
  </form>
</template>

<script>
import { isFunction } from '../../../src/utils/shared';

export default {
  name: 'OmiForm',
  provide() {
    return {
      omiForm: this,
    };
  },
  data() {
    return {
      fields: [],
    };
  },
  props: {
    labelAlign: {
      type: String,
      default: null,
    },
    labelWith: {
      type: [String, Number],
      default: null,
    },
    showStatus: {
      type: Boolean,
      default: true,
    },
    firstValidate: {
      type: Boolean,
      default: false,
    },
    colon: {
      type: Boolean,
      default: true,
    },
    scrollToError: {
      type: Boolean,
      default: false,
    },
    showError: {
      type: String,
      default: '',
    },
    model: {
      type: Object,
    },
    autocomplete: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    onValidate(error, name) {
      this.$emit('validate', error, name);
    },
    resetValidate() {
      this.fields.forEach((field) => field.resetValidate());
    },
    validateField(name) {
      const [target] = this.fields.filter((field) => field.name === name);
      if (target) {
        return target.validate(null);
      }
      throw new Error('please pass in valid name from item!');
    },
    scrollToView(el) {
      el.scrollIntoView();
    },
    validateRace(callback) {
      const { fields } = this;
      const errors = [];
      return fields.reduce((promise, field) => promise.then(() => {
        if (!errors.length) {
          return field.validate().then((error) => {
            if (error) {
              errors.push(error);
              if (this.scrollToError) this.scrollToView(field.$el);
            }
          });
        }
        return Promise.resolve();
      }),
      Promise.resolve()).then(() => {
        let error = null;
        if (errors.length) {
          [error] = errors;
        }
        if (isFunction(callback)) callback(error);
        return error;
      });
    },
    validateAll(callback) {
      return new Promise((resolve) => {
        const { fields } = this;
        let errors = null;
        const validators = fields.map((field) => field.validate());
        Promise.all(validators).then((error) => {
          errors = error.filter((item) => item);
          if (this.scrollToError) {
            const { name } = errors[0];
            const [scorllField] = fields.filter((field) => field.name === name);
            this.scrollToView(scorllField.$el);
          }

          const result = errors.length ? errors : null;
          if (isFunction(callback)) callback(result);
          resolve(result);
        });
      });
    },
    validate(callback) {
      const { firstValidate } = this;
      return firstValidate ? this.validateRace(callback) : this.validateAll(callback);
    },
  },
};
</script>

<style>

</style>
