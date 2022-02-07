import groupMxin from '../../mixins/check-group.js';
import provider from '../../mixins/provider.js';

//
var script = {
  name: 'OmiRadioGroup',
  mixins: [groupMxin, provider('omiRadioGroup')],
  // provide() {
  //   return {
  //     omiRadioGroup: this,
  //   };
  // },
  props: {
    value: {
      type: [String, Number, Boolean],
      default: null
    }
  },
  watch: {
    value: function value(_value) {
      this.$emit('change', _value);
    }
  },
  methods: {
    isChecked: function isChecked(value) {
      return value === this.value;
    },
    toggle: function toggle(checked, prop) {
      if (checked === false || prop === this.vlue) return;
      this.$emit('input', prop);
    }
  }
};

export { script as default };
