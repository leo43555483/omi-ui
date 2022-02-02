import '../../badge/index.js';
import touchMixin from '../../mixins/touch.js';
import panelMixin from '../../mixins/panel.js';
import providerMixin from '../../mixins/provider.js';
import barMixin from './mixins/bar.js';
import { unDef } from '../../utils/shared.js';
import Badge from '../../badge/src/index.vue.js';

//
var DEFAULT_ACTIVE_INDEX = 0;
var DEFAULT_TITLE_SCROLL_DURATION = 300;
var script = {
  name: 'OmiTabs',
  provide: function provide() {
    return {
      tabsParent: this
    };
  },
  mixins: [touchMixin, panelMixin, barMixin, providerMixin('tabsParent')],
  data: function data() {
    return {
      activeKey: DEFAULT_ACTIVE_INDEX,
      activeIndex: DEFAULT_ACTIVE_INDEX,
      inited: false
    };
  },
  components: {
    Badge: Badge
  },
  props: {
    titleScrollDuration: {
      type: Number,
      default: DEFAULT_TITLE_SCROLL_DURATION
    },
    swipleable: {
      type: Boolean,
      default: false
    },
    animated: {
      type: Boolean,
      default: false
    },
    value: {
      type: [String, Number],
      default: 0
    }
  },
  watch: {
    swipleable: function swipleable(_swipleable) {
      var _this = this;

      if (_swipleable) {
        this.$nextTick(function () {
          _this.bindTouchEvent();
        });
      }
    },
    value: function value(_value) {
      var _this2 = this;

      if (!unDef(_value)) {
        if (!this.inited) this.inited = true;
        this.show(this.animated, function () {
          var activeKey = _this2.activeKey,
              activeIndex = _this2.activeIndex,
              labels = _this2.labels;

          _this2.$emit('change', activeKey, labels[activeIndex].label);
        });
      }
    }
  },
  methods: {
    updateIndex: function updateIndex(currentIndex) {
      var _this$getActiveChild = this.getActiveChild(currentIndex),
          activeKey = _this$getActiveChild.activeKey;

      this.$emit('input', activeKey);
    },
    getActiveChild: function getActiveChild(index) {
      var child = this.children[index];
      return this.getActiveChildInfo(child);
    },
    isActive: function isActive(_ref) {
      var tabName = _ref.tabName;
      var activeKey = this.activeKey;
      return {
        'omi-tabs__bar--active': tabName === activeKey
      };
    },
    onClick: function onClick(_ref2) {
      var tabName = _ref2.tabName,
          disalbed = _ref2.disalbed,
          label = _ref2.label;
      if (disalbed) return;
      this.$emit('input', tabName);
      this.$emit('clickTab', tabName, label);
    },
    getChildIndex: function getChildIndex(child) {
      return this.children.indexOf(child);
    },
    setActive: function setActive(_ref3) {
      var activeKey = _ref3.activeKey,
          activeIndex = _ref3.activeIndex;
      if (unDef(activeKey) || unDef(activeIndex)) return;
      this.activeKey = activeKey;
      this.activeIndex = activeIndex;
    },
    getActiveChildInfo: function getActiveChildInfo(child) {
      if (!child) return {};
      return {
        activeIndex: child.getIndex,
        activeKey: child.tabName
      };
    },
    getActive: function getActive() {
      var _this3 = this;

      var _this$children$filter = this.children.filter(function (item) {
        return item.tabName === _this3.value;
      }),
          child = _this$children$filter[0];

      return this.getActiveChildInfo(child);
    },
    show: function show(animated, cb) {
      var _this4 = this;

      if (cb === void 0) {
        cb = function cb() {};
      }

      this.$nextTick(function () {
        _this4.setActive(_this4.getActive());

        _this4.scrollBarToView(animated);

        _this4.scrollPane();

        _this4.scrollLine();

        cb();
      });
    }
  },
  mounted: function mounted() {
    this.show(false);
  }
};

export { script as default };
