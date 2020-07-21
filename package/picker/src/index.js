import Colums, { DEFAULT_ITEM_HEIGHT, DEFAULT_DURATION, MAX_VISIBLE_ITEM } from './Colums';
import {
  isNumber, isArray, getUid, unDef,
} from '../../../src/utils/shared';
import provideMixin from '../../mixins/provider';

const genUid = getUid();

const DEFAULT_INDEX = 0;
const Picker = () => ({
  name: 'OmiPicker',
  mixins: [provideMixin('omiPicker')],
  data() {
    return {
      colums: [],
      isSetting: false,
    };
  },
  props: {
    title: {
      type: String,
      default: '',
    },
    confirmText: {
      type: String,
      default: '',
    },
    cancelText: {
      type: String,
      default: '',
    },
    itemHeight: {
      type: Number,
      default: DEFAULT_ITEM_HEIGHT,
    },
    duration: {
      type: Number,
      default: DEFAULT_DURATION,
    },
    cascade: {
      type: Boolean,
      default: false,
    },
    data: {
      type: Array,
      default: () => [],
    },
    valueKey: {
      type: String,
      default: '',
    },
    labelKey: {
      type: String,
      default: '',
    },
    defaultIndex: {
      type: [Array, Number],
      default: () => [DEFAULT_INDEX],
      validator(values) {
        if (!isArray(values)) return true;
        return values.every((value) => isNumber(value * 1));
      },
    },
    onConfirm: {
      type: Function,
      default: () => {},
    },
    onCancel: {
      type: Function,
      default: () => {},
    },
  },
  watch: {
    data: {
      handler(data) {
        this.flattenData(data);
      },
      immediate: true,
    },
  },
  methods: {
    formateColumPayload(node, columIndex) {
      const { valueKey, labelKey } = this;
      const data = node.children.map((item) => ({
        label: item[labelKey] || item.label || null,
        value: item[valueKey] || item.value || null,
        uid: item.key || genUid(`colum-${columIndex}`),
      }));
      const defaultIndex = this.getDefaultIndex(node, columIndex);

      return {
        data,
        defaultIndex,
        uid: `colum-${columIndex}`,
      };
    },
    getActiveIndexs() {
      return this.children.map((child) => child.currentIndex);
    },
    getDefaultIndex(parent, colum) {
      const { defaultIndex } = this;
      const index = isArray(defaultIndex) ? defaultIndex[colum] : defaultIndex;
      return parent.defaultIndex || index || DEFAULT_INDEX;
    },
    formatCascade() {
      const { formateColumPayload } = this;
      let i = 0;
      const colums = [];
      let parent = { children: this.data };
      while (parent && isArray(parent.children)) {
        const columNode = formateColumPayload(parent, i);
        colums.push(columNode);
        const { children } = parent;
        const { defaultIndex } = columNode;
        parent = !unDef(children[defaultIndex]) ? children[defaultIndex] : children[DEFAULT_INDEX];
        i += 1;
      }
      return colums;
    },
    formatColum() {
      const { data, formateColumPayload } = this;
      return data.map((colum, columIndex) => {
        const node = { children: colum };
        return formateColumPayload(node, columIndex);
      });
    },
    flattenData() {
      if (this.cascade) {
        this.colums = this.formatCascade();
        return;
      }
      this.colums = this.formatColum();
    },
    // test
    getChildAfterTransition(index) {
      return this.children[index].afterTransition;
    },
    // // test
    // getChildActiveIndex(index) {
    //   return this.children[index].currentIndex;
    // },
    // // test
    // getChildMoving(index) {
    //   return this.children[index].isMoving;
    // },
    // // test
    // getTarget(index) {
    //   return this.children[index].targetIndex;
    // },
    // // test
    // getInited(index) {
    //   return this.children[index].inited;
    // },
    updateCascade(columIndex) {
      const { data, getActiveIndexs } = this;
      const activeIndexs = getActiveIndexs();
      let i = 0;
      let parent = { children: data };
      while (i <= columIndex && isArray(parent.children)) {
        parent = parent.children[activeIndexs[i]];
        i += 1;
      }
      while (parent && isArray(parent.children)) {
        const defaultIndex = this.getDefaultIndex(parent, i);
        this.updateData(parent, i);
        parent = parent.children[defaultIndex];
        i += 1;
      }
    },
    onChange(columIndex) {
      if (this.cascade) this.updateCascade(columIndex);
      this.$nextTick(() => {
        this.$nextTick(() => {
          if (this.isSetting) return;
          const values = this.getValues().map(({ uid, ...rest }) => ({ ...rest }));
          this.$emit('change', values, columIndex);
        });
      });
    },
    getColums() {
      return this.colums.map((colum, index) => (
        <Colums
          data={colum.data}
          key={colum.uid}
          defaultIndex={colum.defaultIndex}
          className={colum.className}
          duration={this.duration}
          onChange={() => this.onChange(index)}
          duration={this.duration}
        />
      ));
    },

    updateData(colum, columIndex) {
      this.$nextTick(() => {
        const columNode = this.formateColumPayload(colum, columIndex);
        this.colums.splice(columIndex, 1, columNode);
      });
    },
    /**
     * @vue2doc-exposed-api:updateColum
     * @param {Array} colum
     * @param {Number} columIndex
     */
    updateColum(colum, columIndex = 0) {
      if (!isArray(colum)) {
        throw new Error('[omi]:colum should be an array');
      }
      const node = { children: colum };
      this.updateData(node, columIndex);
      this.$nextTick(() => {
        if (this.cascade) this.updateCascade(columIndex);
      });
    },
    /**
     * @vue2doc-exposed-api:getValues
     * @return {Array} values
     */
    getValues() {
      return this.children.map((child) => child.getActiveValue());
    },
    /**
     * @vue2doc-exposed-api:setValues
     * @param {Array|Any} values
     * @param {Number} columIndex
     */
    setValues(values, columIndex) {
      this.$nextTick(() => {
        const { children } = this;
        if (isArray(values)) {
          // eslint-disable-next-line max-len
          values
            .reduce(
              (pre, value, index) => pre.then(() => {
                this.isSetting = true;
                return children[index].setActiveValue(value);
              }),
              Promise.resolve(),
            )
            .then(() => {
              this.isSetting = false;
            });
        } else if (isNumber(columIndex)) {
          children[columIndex].setActiveValue(values);
        }
      });
    },
    /**
     * @vue2doc-exposed-api:isScrolling
     * @return {Boolean}
     */
    isScrolling() {
      return this.isMoving;
    },
    getHeader() {
      const { confirmText, cancelText, title } = this;
      if (unDef(confirmText) && unDef(cancelText) && unDef(title)) return null;
      return (
        <div class="omi-picker__header">
          {cancelText && (
            <div class="omi-picker__cancel" onClick={this.handleCancel}>
              {this.cancelText}
            </div>
          )}
          {title && <div class="omi-picker__title">{title}</div>}
          {confirmText && (
            <div class="omi-picker__confirm" onClick={this.handleConfirm}>
              {this.confirmText}
            </div>
          )}
        </div>
      );
    },
    handleConfirm() {
      this.onConfirm();
    },
    handleCancel() {
      this.onCancel();
    },
  },
  computed: {
    maskStyles() {
      const { itemHeight } = this;
      const columHeight = itemHeight * MAX_VISIBLE_ITEM;
      return `background-size: 100% ${(columHeight - itemHeight) / 2}px`;
    },
    cursorStyles() {
      return `height: ${this.itemHeight}px`;
    },
    isMoving() {
      return this.children.some((child) => child.isMoving);
    },
  },
  render() {
    return (
      <div class="omi-picker">
        {this.getHeader()}
        <div class="omi-picker-colums__wrapper">
          {this.getColums()}
          <div class="omi-picker-colums__mask" style={this.maskStyles}></div>
          <div class="omi-picker-colums__cursor omi-picker-border__top-bottom" style={this.cursorStyles}></div>
        </div>
      </div>
    );
  },
});
export default Picker();
