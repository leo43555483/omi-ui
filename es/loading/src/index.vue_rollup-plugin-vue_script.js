import { getSizeString } from '../../utils/shared.js';

//
var script = {
  name: 'OmiLoading',
  data: function data() {
    return {
      showIndex: 0
    };
  },
  props: {
    // 内部使用
    lazyShow: {
      type: Boolean,
      default: false
    },
    spinner: {
      type: Boolean,
      default: false
    },
    size: {
      type: [String, Number],
      default: null
    },
    color: {
      type: String,
      default: null
    },
    loadingText: {
      type: String,
      default: null
    }
  },
  methods: {
    show: function show(index) {
      if (!this.spinner) return;
      this.showIndex = index;
    },
    lazyClass: function lazyClass(index) {
      if (this.lazyShow && index > this.showIndex) return 'omi-loading__item--lazy';
      return null;
    }
  },
  computed: {
    wrapperClasses: function wrapperClasses() {
      var loadingText = this.loadingText,
          lazyShow = this.lazyShow;
      return {
        'omi-loading__vertical': loadingText,
        'omi-loading__lazy': lazyShow
      };
    },
    customStyles: function customStyles() {
      if (this.lazyShow && this.spinner) return 'animation-name: none';

      var _getSizeString = getSizeString(this.size),
          size = _getSizeString[0];

      size = size ? "width: " + size + "px; height: " + size + "px;" : null;
      var step = this.spinner ? 'animation-timing-function: steps(12);' : null;
      return size + " " + this.customColor + " " + step;
    },
    customColor: function customColor() {
      return "color:" + this.color + ";";
    }
  }
};

export { script as default };
