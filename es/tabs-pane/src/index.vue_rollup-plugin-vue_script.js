import inject from '../../mixins/inject.js';

//
var script = {
  name: 'OmiTabsPane',
  mixins: [inject('tabsParent')],
  props: {
    dot: {
      type: Boolean,
      default: false
    },
    badgeText: {
      type: [String, Number],
      default: ''
    },
    badgeMaxNumber: {
      type: Number,
      default: null
    },
    label: {
      type: String,
      default: ''
    },
    name: {
      type: [String, Number],
      default: null
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    show: function show() {
      var parent = this.parent,
          tabName = this.tabName;
      if (!parent) return false;
      return parent.activeKey === tabName;
    },
    panelStyle: function panelStyle() {
      var parent = this.parent;
      if (!parent || parent.swipleable || parent.animated) return null;
      var show = this.show ? null : 'display: none';
      return show;
    },
    getIndex: function getIndex() {
      if (!this.parent) return -1;
      return this.parent.children.indexOf(this);
    },
    tabName: function tabName() {
      var name = this.name,
          getIndex = this.getIndex;
      return name !== null ? name : getIndex;
    }
  }
};

export { script as default };
