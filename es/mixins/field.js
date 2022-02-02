var filedMixin = {
  inject: {
    omiFormItem: {
      default: null
    }
  },
  methods: {
    validateTriggerOn: function validateTriggerOn(trigger) {
      if (this.omiFormItem) {
        this.omiFormItem.validate(trigger);
      }
    }
  }
};

export { filedMixin as default };
