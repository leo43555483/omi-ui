import Colums, { DEFAULT_ITEM_HEIGHT, DEFAULT_DURATION, MAX_VISIBLE_ITEM } from './Colums.js';
import { isArray, isNumber, unDef, getUid } from '../../utils/shared.js';
import providerMixin from '../../mixins/provider.js';

var _excluded = ["uid"];

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
var genUid = getUid();
var DEFAULT_INDEX = 0;

var Picker = function Picker() {
  return {
    name: 'OmiPicker',
    mixins: [providerMixin('omiPicker')],
    data: function data() {
      return {
        colums: [],
        isSetting: false
      };
    },
    props: {
      title: {
        type: String,
        default: ''
      },
      confirmText: {
        type: String,
        default: ''
      },
      cancelText: {
        type: String,
        default: ''
      },
      itemHeight: {
        type: Number,
        default: DEFAULT_ITEM_HEIGHT
      },
      duration: {
        type: Number,
        default: DEFAULT_DURATION
      },
      cascade: {
        type: Boolean,
        default: false
      },
      data: {
        type: Array,
        default: function _default() {
          return [];
        }
      },
      valueKey: {
        type: String,
        default: ''
      },
      labelKey: {
        type: String,
        default: ''
      },
      defaultIndex: {
        type: [Array, Number],
        default: function _default() {
          return [DEFAULT_INDEX];
        },
        validator: function validator(values) {
          if (!isArray(values)) return true;
          return values.every(function (value) {
            return isNumber(value * 1);
          });
        }
      },
      onConfirm: {
        type: Function,
        default: function _default() {}
      },
      onCancel: {
        type: Function,
        default: function _default() {}
      }
    },
    watch: {
      data: {
        handler: function handler(data) {
          this.flattenData(data);
        },
        immediate: true
      }
    },
    methods: {
      formateColumPayload: function formateColumPayload(node, columIndex) {
        var valueKey = this.valueKey,
            labelKey = this.labelKey;
        var data = node.children.map(function (item) {
          return {
            label: item[labelKey] || item.label || null,
            value: item[valueKey] || item.value || null,
            uid: item.key || genUid("colum-" + columIndex)
          };
        });
        var defaultIndex = this.getDefaultIndex(node, columIndex);
        return {
          data: data,
          defaultIndex: defaultIndex,
          uid: "colum-" + columIndex
        };
      },
      getActiveIndexs: function getActiveIndexs() {
        return this.children.map(function (child) {
          return child.currentIndex;
        });
      },
      getDefaultIndex: function getDefaultIndex(parent, colum) {
        var defaultIndex = this.defaultIndex;
        var index = isArray(defaultIndex) ? defaultIndex[colum] : defaultIndex;
        return parent.defaultIndex || index || DEFAULT_INDEX;
      },
      formatCascade: function formatCascade() {
        var formateColumPayload = this.formateColumPayload;
        var i = 0;
        var colums = [];
        var parent = {
          children: this.data
        };

        while (parent && isArray(parent.children)) {
          var columNode = formateColumPayload(parent, i);
          colums.push(columNode);
          var _parent = parent,
              children = _parent.children;
          var defaultIndex = columNode.defaultIndex;
          parent = !unDef(children[defaultIndex]) ? children[defaultIndex] : children[DEFAULT_INDEX];
          i += 1;
        }

        return colums;
      },
      formatColum: function formatColum() {
        var data = this.data,
            formateColumPayload = this.formateColumPayload;
        return data.map(function (colum, columIndex) {
          var node = {
            children: colum
          };
          return formateColumPayload(node, columIndex);
        });
      },
      flattenData: function flattenData() {
        if (this.cascade) {
          this.colums = this.formatCascade();
          return;
        }

        this.colums = this.formatColum();
      },
      updateCascade: function updateCascade(columIndex) {
        var data = this.data,
            getActiveIndexs = this.getActiveIndexs;
        var activeIndexs = getActiveIndexs();
        var i = 0;
        var parent = {
          children: data
        };

        while (i <= columIndex && isArray(parent.children)) {
          parent = parent.children[activeIndexs[i]];
          i += 1;
        }

        while (parent && isArray(parent.children)) {
          var defaultIndex = this.getDefaultIndex(parent, i);
          this.updateData(parent, i);
          parent = parent.children[defaultIndex];
          i += 1;
        }
      },
      onChange: function onChange(columIndex) {
        var _this = this;

        if (this.cascade) this.updateCascade(columIndex);
        this.$nextTick(function () {
          _this.$nextTick(function () {
            if (_this.isSetting) return;

            var values = _this.getValues().map(function (_ref) {
              _ref.uid;
                  var rest = _objectWithoutPropertiesLoose(_ref, _excluded);

              return _extends({}, rest);
            });

            _this.$emit('change', values, columIndex);
          });
        });
      },
      getColums: function getColums() {
        var _this2 = this;

        var h = this.$createElement;
        return this.colums.map(function (colum, index) {
          var _attrs;

          return h(Colums, {
            "attrs": (_attrs = {
              "data": colum.data,
              "defaultIndex": colum.defaultIndex,
              "className": colum.className,
              "duration": _this2.duration
            }, _attrs["duration"] = _this2.duration, _attrs["itemHeight"] = _this2.itemHeight, _attrs),
            "key": colum.uid,
            "on": {
              "change": function change() {
                return _this2.onChange(index);
              }
            }
          });
        });
      },
      updateData: function updateData(colum, columIndex) {
        var _this3 = this;

        this.$nextTick(function () {
          var columNode = _this3.formateColumPayload(colum, columIndex);

          _this3.colums.splice(columIndex, 1, columNode);
        });
      },

      /**
       * @vue2doc-exposed-api:updateColum
       * @param {Array} colum
       * @param {Number} columIndex
       */
      updateColum: function updateColum(colum, columIndex) {
        var _this4 = this;

        if (columIndex === void 0) {
          columIndex = 0;
        }

        if (!isArray(colum)) {
          throw new Error('[omi]:colum should be an array');
        }

        var node = {
          children: colum
        };
        this.updateData(node, columIndex);
        this.$nextTick(function () {
          if (_this4.cascade) _this4.updateCascade(columIndex);
        });
      },

      /**
       * @vue2doc-exposed-api:getValues
       * @return {Array} values
       */
      getValues: function getValues() {
        return this.children.map(function (child) {
          return child.getActiveValue();
        });
      },

      /**
       * @vue2doc-exposed-api:setValues
       * @param {Array|Any} values
       * @param {Number} columIndex
       */
      setValues: function setValues(values, columIndex) {
        var _this5 = this;

        this.$nextTick(function () {
          var children = _this5.children;

          if (isArray(values)) {
            values.reduce(function (pre, value, index) {
              return pre.then(function () {
                if (!_this5.isSetting) _this5.isSetting = true;
                return children[index].setActiveValue(value);
              });
            }, Promise.resolve()).then(function () {
              _this5.isSetting = false;
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
      isScrolling: function isScrolling() {
        return this.isMoving;
      },
      getHeader: function getHeader() {
        var h = this.$createElement;
        var confirmText = this.confirmText,
            cancelText = this.cancelText,
            title = this.title;
        if (unDef(confirmText) && unDef(cancelText) && unDef(title)) return null;
        return h("div", {
          "class": "omi-picker__header"
        }, [cancelText && h("div", {
          "class": "omi-picker__cancel",
          "on": {
            "click": this.handleCancel
          }
        }, [this.cancelText]), title && h("div", {
          "class": "omi-picker__title"
        }, [title]), confirmText && h("div", {
          "class": "omi-picker__confirm",
          "on": {
            "click": this.handleConfirm
          }
        }, [this.confirmText])]);
      },
      handleConfirm: function handleConfirm() {
        this.onConfirm();
      },
      handleCancel: function handleCancel() {
        this.onCancel();
      }
    },
    computed: {
      maskStyles: function maskStyles() {
        var itemHeight = this.itemHeight;
        var columHeight = itemHeight * MAX_VISIBLE_ITEM;
        return "background-size: 100% " + (columHeight - itemHeight) / 2 + "px";
      },
      cursorStyles: function cursorStyles() {
        return "height: " + this.itemHeight + "px";
      },
      isMoving: function isMoving() {
        return this.children.some(function (child) {
          return child.isMoving;
        });
      }
    },
    render: function render() {
      var h = arguments[0];
      return h("div", {
        "class": "omi-picker"
      }, [this.getHeader(), h("div", {
        "class": "omi-picker-colums__wrapper"
      }, [this.getColums(), h("div", {
        "class": "omi-picker-colums__mask",
        "style": this.maskStyles
      }), h("div", {
        "class": "omi-picker-colums__cursor omi-picker-border__top-bottom",
        "style": this.cursorStyles
      })])]);
    }
  };
};

var Picker$1 = Picker();

export { Picker$1 as default };
