import { getSizeString } from '../utils/shared.js';
import inject from './inject.js';
import '../icon/index.js';
import Icon from '../icon/src/index.vue.js';

function createMixin(_ref) {
  var type = _ref.type,
      classPrefix = _ref.classPrefix,
      checkParent = _ref.checkParent,
      unbindParent = _ref.unbindParent;
  return {
    mixins: [inject(checkParent, unbindParent)],
    watch: {
      value: function value(_value) {
        this.$emit('change', _value);
      }
    },
    props: {
      activeColor: {
        type: String,
        default: null
      },
      disable: {
        type: Boolean,
        default: false
      },
      prop: {
        type: [String, Number, Boolean],
        default: null
      },
      value: {
        type: Boolean,
        default: false
      },
      text: {
        type: String,
        default: ''
      },
      size: {
        type: [String, Number],
        default: null
      },
      square: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      getSlots: function getSlots(slotName) {
        return this.$slots[slotName];
      },
      createClass: function createClass(name) {
        return "" + classPrefix + name;
      },
      onClick: function onClick(e) {
        e.stopPropagation();
        if (this.isDisabled) return;
        this.check();
      },

      /**
       * @vue2doc-exposed-api:check
       * @param {Boolean}
       */
      check: function check(isChecked) {
        var _this = this;

        if (isChecked === void 0) {
          isChecked = !this.isChecked;
        }

        clearTimeout(this.timer);
        this.timer = setTimeout(function () {
          _this.isChecked = isChecked;
        });
      },
      getCheckIcon: function getCheckIcon() {
        var h = this.$createElement;
        var defaultIcon = h("div", {
          "class": this.innerClasses,
          "style": this.innerStyles
        }, [h(Icon, {
          "attrs": {
            "type": "right"
          }
        })]);
        return this.getSlots('icon') || defaultIcon;
      }
    },
    computed: {
      innerStyles: function innerStyles() {
        var color = this.customColor;
        return "background-color: " + color;
      },
      customColor: function customColor() {
        var isDisabled = this.isDisabled,
            activeColor = this.activeColor,
            isChecked = this.isChecked,
            parent = this.parent;
        var color = activeColor || parent && parent.activeColor;
        if (color && isChecked && !isDisabled) return color;
        return null;
      },
      inputClasses: function inputClasses() {
        var _ref2;

        var square = this.square,
            isChecked = this.isChecked;
        var checkedClass = this.createClass('__checked');
        var squareClass = this.createClass('__square');
        var inputClass = this.createClass('__input');
        return _ref2 = {}, _ref2[inputClass] = true, _ref2[checkedClass] = isChecked, _ref2[squareClass] = square, _ref2;
      },
      innerClasses: function innerClasses() {
        var innerClass = this.createClass('__inner');
        return ['omi-icon__wrapper', innerClass];
      },
      wrapperClasses: function wrapperClasses() {
        var isDisabled = this.isDisabled;
        var disableClass = isDisabled ? 'omi-check__disable' : null;
        return [classPrefix, disableClass];
      },
      inputStyles: function inputStyles() {
        var _getSizeString = getSizeString(this.size),
            size = _getSizeString[0];

        var customColor = this.customColor;
        if (size) return "font-size:" + size + "px; border-color: " + customColor;
        return null;
      },
      tabindex: function tabindex() {
        if (this.isDisabled || type === 'radio' && !this.isChecked) {
          return -1;
        }

        return 0;
      },
      isDisabled: function isDisabled() {
        var disable = this.disable,
            parent = this.parent;
        return disable || parent && parent.disable;
      },
      isChecked: {
        get: function get() {
          if (this.parent) {
            return this.parent.isChecked(this.prop);
          }

          return this.value;
        },
        set: function set(isCheck) {
          var parent = this.parent;
          this.$emit('input', isCheck);

          if (parent) {
            this.parent.toggle(isCheck, this.prop);
          }
        }
      }
    },
    beforeDestroy: function beforeDestroy() {
      if (this.timer) clearTimeout(this.timer);
    },
    render: function render() {
      var h = arguments[0];
      var text = this.text;
      return h("div", {
        "attrs": {
          "role": type,
          "aria-checked": this.isChecked,
          "tabindex": this.tabindex
        },
        "class": this.wrapperClasses,
        "on": {
          "click": this.onClick
        }
      }, [h("div", {
        "class": this.inputClasses,
        "style": this.inputStyles
      }, [this.getCheckIcon()]), h("div", {
        "class": classPrefix + "__text"
      }, [this.getSlots('default') || text && h("span", [text])])]);
    }
  };
}

export { createMixin as default };
