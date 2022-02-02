'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var shared = require('../../utils/shared.js');

var PROVINCE = 'province';
var CTIY = 'city';
var AREA = 'area';
var hasOwnProperty = Object.prototype.hasOwnProperty;

var getAddressCode = function getAddressCode(code) {
  var _ref;

  var codeString = "" + code;
  var re = /^(\d{2})(\d{2})(\d{2})$/;

  if (codeString.length < 6) {
    var index = 6 - codeString.length - 1; // eslint-disable-next-line no-plusplus

    for (var i = 0; i <= index; i++) {
      codeString += '0';
    }
  }

  var _re$exec = re.exec(codeString),
      originCode = _re$exec[0],
      address = _re$exec.slice(1);

  var province = address[0],
      city = address[1],
      area = address[2];
  return _ref = {}, _ref[PROVINCE] = province, _ref[CTIY] = city, _ref[AREA] = area, _ref.originCode = originCode, _ref;
};
function formateAddres(list, type, map, parentKey, cb, isLeaf) {
  if (isLeaf === void 0) {
    isLeaf = false;
  }

  if (shared.unDef(list)) return [];
  return Object.keys(list).map(function (code, index) {
    var label = list[code];
    var addressCode = getAddressCode(code);

    if (map && !hasOwnProperty.call(map, addressCode[type])) {
      var mapKey = parentKey ? "" + addressCode[parentKey] + addressCode[type] : "" + addressCode[type];
      map[mapKey] = index;
    }

    var payload = {
      label: label,
      value: code,
      parentCode: addressCode[parentKey],
      selfCode: addressCode[type],
      originCode: addressCode.originCode
    };
    if (!isLeaf) payload.children = [];
    if (shared.isFunction(cb)) return cb(payload, addressCode);
    return payload;
  });
}

exports.AREA = AREA;
exports.CTIY = CTIY;
exports.PROVINCE = PROVINCE;
exports.formateAddres = formateAddres;
