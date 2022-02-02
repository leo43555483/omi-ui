//
//
//
//
var script = {
  name: 'OmiIcon',
  props: {
    type: {
      type: String,
      default: '',
      required: true
    },
    size: {
      type: [String, Number],
      default: null
    }
  },
  computed: {
    iconSize: function iconSize() {
      return "font-size: " + this.size + "px";
    },
    iconClass: function iconClass() {
      return ["omi-" + this.type];
    }
  }
};

export { script as default };
