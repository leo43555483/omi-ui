export default function createMixin({
  type, classPrefix, checkParent, unbindParent,
}) {
  return {
    inject: {
      [checkParent]: {
        default: null,
      },
    },
    methods: {
      createClass(name) {
        return `${classPrefix}${name}`;
      },
    },
    computed: {
      parent() {
        if (this[unbindParent]) return null;
        return this[checkParent];
      },
      role() {
        return type;
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
        return [innerClass];
      },
      wrapperClasses() {
        return classPrefix;
      },
    },
    created() {
      if (this.indeterminate) return;
      if (this.parent) this.parent.children.push(this);
    },
  };
}
