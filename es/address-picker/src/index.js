import '../../picker/index.js';
import { formateAddres, PROVINCE, CTIY, AREA } from './util.js';
import { unDef } from '../../utils/shared.js';
import Picker from '../../picker/src/index.js';

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
var DEFAULT_INDEX = 0;

var AddressPicker = function AddressPicker() {
  return {
    name: 'OmiAddressPicker',
    data: function data() {
      return {
        address: []
      };
    },
    props: {
      defaultIndex: {
        type: Number,
        default: DEFAULT_INDEX
      },
      data: {
        type: Object,
        default: null
      },
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
        handler: function handler() {
          this.formateData();
        },
        immediate: true
      }
    },
    methods: {
      onChange: function onChange() {
        for (var _len = arguments.length, params = new Array(_len), _key = 0; _key < _len; _key++) {
          params[_key] = arguments[_key];
        }

        this.$emit.apply(this, ['change'].concat(params));
      },
      formateData: function formateData() {
        if (!this.data) return;
        var provinceMap = {};
        var cityMap = {};
        var _this$data = this.data,
            provinceList = _this$data.provinceList,
            cityList = _this$data.cityList,
            areaList = _this$data.areaList;
        var provinces = formateAddres(provinceList, PROVINCE, provinceMap, null, null, unDef(cityList));
        var cities = formateAddres(cityList, CTIY, cityMap, PROVINCE, null, unDef(areaList));
        formateAddres(areaList, AREA, null, CTIY, function (node, code) {
          var provinceCode = code.province,
              cityCode = code.city,
              areaCode = code.area;
          var parentKey = "" + provinceCode + cityCode;
          var cityIndex = cityMap[parentKey];

          if (!unDef(cityIndex)) {
            cities[cityIndex].children.push(node);
          } else {
            cities.push(node);
            cityMap[areaCode] = cities.length - 1;
          }
        }, true);
        cities.forEach(function (city) {
          var parentCode = city.parentCode,
              selfCode = city.selfCode;
          var index = provinceMap[parentCode];

          if (!unDef(index) && !unDef(provinces[index]) && !unDef(provinces[index].children)) {
            provinces[index].children.push(city);
          } else {
            var isOverSea = parentCode * 1 >= 90;

            if (isOverSea) {
              var overSeaIndex = provinceMap['90'];
              provinces[overSeaIndex].children.push(city);
            } else {
              provinces.push(city);
              provinceMap[selfCode] = provinces.length - 1;
            }
          }
        });
        this.address = provinces;
      },

      /**
       * @vue2doc-exposed-api:getValues
       * @return {Array} values
       */
      getValues: function getValues() {
        return this.$refs.picker.getValues().map(function (_ref) {
          var label = _ref.label,
              value = _ref.value;
          return {
            label: label,
            value: value
          };
        });
      },

      /**
       * @vue2doc-exposed-api:isScrolling
       * @return {Boolean}
       */
      isScrolling: function isScrolling() {
        return this.$refs.picker.isScrolling();
      }
    },
    render: function render() {
      var _this = this;

      var h = arguments[0];
      return h(Picker, {
        "attrs": {
          "cascade": true,
          "data": this.address,
          "title": this.title,
          "confirmText": this.confirmText,
          "cancelText": this.cancelText,
          "defaultIndex": this.defaultIndex
        },
        "ref": "picker",
        "on": {
          "change": this.onChange
        },
        "props": _extends({}, {
          onConfirm: function onConfirm() {
            return _this.onConfirm();
          },
          onCancel: function onCancel() {
            return _this.onCancel();
          }
        })
      });
    }
  };
};

var AddressPicker$1 = AddressPicker();

export { AddressPicker$1 as default };
