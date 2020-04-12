export default {
  inject: {
    omiFormItem: {
      default: null,
    },
  },
  methods: {
    validateTriggerOn(trigger) {
      if (this.omiFormItem) {
        this.omiFormItem.validate(trigger);
      }
    },
  },
};
