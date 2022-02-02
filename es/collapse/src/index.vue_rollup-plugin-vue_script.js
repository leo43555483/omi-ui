//
//
//
//
//
//
var script = {
  name: 'OmiCollapse',
  data: function data() {
    return {
      children: []
    };
  },
  provide: function provide() {
    return {
      parent: this
    };
  },
  props: {
    value: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    accordion: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    hasName: function hasName(name) {
      return this.value.indexOf(name) > -1;
    },
    open: function open(isOpen, name) {
      var value = this.value,
          accordion = this.accordion;
      var list = [].concat(value);

      if (isOpen) {
        if (!this.hasName(name)) list.push(name);
        if (accordion) list = list.filter(function (item) {
          return item === name;
        });
      } else {
        list = value.filter(function (item) {
          return item !== name;
        });
      }

      this.$emit('input', list);
    }
  }
};

export { script as default };
