import groupMxin from '../../mixins/check-group.js';
import provider from '../../mixins/provider.js';

//
var script = {
  name: 'OmiCheckboxGroup',
  mixins: [groupMxin, provider('omiCheckGroup')],
  data: function data() {
    return {
      children: []
    };
  },
  props: {
    max: {
      type: [String, Number],
      default: -1
    }
  },
  watch: {
    value: function value(_value) {
      this.$emit('change', _value);
    }
  },
  methods: {
    toggle: function toggle(isCheck, value) {
      var index = this.getValueIndex(value);
      var model = [].concat(this.value);

      if (isCheck) {
        var max = this.max;
        if (this.value.length >= max && max >= 0) return;
        if (index === -1) model.push(value);
      } else if (isCheck === false) {
        if (index >= 0) model.splice(index, 1);
      }

      this.$emit('input', model);
    },
    getValueIndex: function getValueIndex(value) {
      return this.value.indexOf(value);
    },
    toggleAll: function toggleAll(isCheck) {
      if (isCheck === void 0) {
        isCheck = null;
      }

      if (isCheck === false) {
        this.$emit('input', []);
        return;
      }

      var children = this.children;
      var max = this.max; // toggle

      if (isCheck === null) {
        children = children.filter(function (child) {
          return !child.isChecked;
        });
      }

      if (max >= 0 && children.length > max) {
        children = children.slice(0, max);
      }

      var model = children.map(function (child) {
        return child.prop;
      });
      this.$emit('input', model);
    },
    isChecked: function isChecked(value) {
      return this.getValueIndex(value) >= 0;
    }
  }
};

export { script as default };
