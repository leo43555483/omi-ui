import { getSizeString } from '../../src/utils/shared';
import Icon from '../icon';

export default function createMixin({
  type, classPrefix, checkParent, unbindParent,
}) {
  return {
    inject: {
      [checkParent]: {
        default: null,
      },
    },
    watch: {
      value(value) {
        this.$emit('change', value);
      },
    },
    props: {
      activeColor: {
        type: String,
        default: null,
      },
      disable: {
        type: Boolean,
        default: false,
      },
      prop: {
        type: [String, Number, Boolean],
        default: null,
      },
      value: {
        type: Boolean,
        default: false,
      },
      text: {
        type: String,
        default: '',
      },
      size: {
        type: [String, Number],
        default: null,
      },
      square: {
        type: Boolean,
        default: false,
      },
    },
    methods: {
      getSlots(slotName) {
        return this.$slots[slotName];
      },
      createClass(name) {
        return `${classPrefix}${name}`;
      },
      onClick(e) {
        e.stopPropagation();
        if (this.isDisabled) return;
        this.check();
      },
      /**
       * @vue2doc-exposed-api:check
       * @param {Boolean}
       */
      check(isChecked = !this.isChecked) {
        clearTimeout(this.timer);
        this.timer = setTimeout(() => {
          this.isChecked = isChecked;
        });
      },
      getCheckIcon() {
        const defaultIcon = (
          <div class={this.innerClasses} style={this.innerStyles}>
            {<Icon type="right" />}
          </div>
        );
        return this.getSlots('icon') || defaultIcon;
      },
    },
    computed: {
      parent() {
        if (unbindParent && this[unbindParent]) return null;
        return this[checkParent];
      },
      innerStyles() {
        const color = this.customColor;
        return `background-color: ${color}`;
      },
      customColor() {
        const {
          isDisabled, activeColor, isChecked, parent,
        } = this;
        const color = activeColor || (parent && parent.activeColor);
        if (color && isChecked && !isDisabled) return color;
        return null;
      },
      inputClasses() {
        const { square, isChecked } = this;
        const checkedClass = this.createClass('__checked');
        const squareClass = this.createClass('__square');
        const inputClass = this.createClass('__input');

        return {
          [inputClass]: true,
          [checkedClass]: isChecked,
          [squareClass]: square,
        };
      },
      innerClasses() {
        const innerClass = this.createClass('__inner');
        return ['omi-icon__wrapper', innerClass];
      },
      wrapperClasses() {
        const { isDisabled } = this;
        const disableClass = isDisabled ? 'omi-check__disable' : null;
        return [classPrefix, disableClass];
      },
      inputStyles() {
        const [size] = getSizeString(this.size);
        const { customColor } = this;
        if (size) return `font-size:${size}px; border-color: ${customColor}`;
        return null;
      },
      tabindex() {
        if (this.isDisabled || (type === 'radio' && !this.isChecked)) {
          return -1;
        }
        return 0;
      },
      isDisabled() {
        const { disable, parent } = this;
        return disable || (parent && parent.disable);
      },
      isChecked: {
        get() {
          if (this.parent) {
            return this.parent.isChecked(this.prop);
          }
          return this.value;
        },
        set(isCheck) {
          const { parent } = this;
          this.$emit('input', isCheck);
          if (parent) {
            this.parent.toggle(isCheck, this.prop);
          }
        },
      },
    },
    mounted() {
      if (this.indeterminate) return;
      const { parent } = this;
      const has = parent.children.indexOf(this) >= 0;
      if (parent && parent.children && !has) parent.children.push(this);
    },
    beforeDestroy() {
      if (this.timer) clearTimeout(this.timer);
    },
    render() {
      const { text } = this;
      return (
        <div
          role={type}
          aria-checked={this.isChecked}
          class={this.wrapperClasses}
          onClick={this.onClick}
          tabindex={this.tabindex}
        >
          <div class={this.inputClasses} style={this.inputStyles}>
            {this.getCheckIcon()}
          </div>
          <div class={`${classPrefix}__text`}>
            {this.getSlots('default') || (text && <span>{text}</span>)}
          </div>
        </div>
      );
    },
  };
}
