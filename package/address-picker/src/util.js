import { isFunction } from '../../../src/utils/shared';

export const PROVINCE = 'province';
export const CTIY = 'city';
export const AREA = 'area';

const { hasOwnProperty } = Object.prototype;
const getAddressCode = (code) => {
  let codeString = `${code}`;
  const re = /^(\d{2})(\d{2})(\d{2})$/;
  if (codeString.length < 6) {
    const index = 6 - codeString.length - 1;
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i <= index; i++) {
      codeString += '0';
    }
  }
  const [originCode, ...address] = re.exec(codeString);
  const [province, city, area] = address;
  return {
    [PROVINCE]: province,
    [CTIY]: city,
    [AREA]: area,
    originCode,
  };
};
export function generateCascade() { }
export function formateAddres(list, type, map, parentKey, cb, isLeaf = false) {
  return Object.keys(list).map((code, index) => {
    const label = list[code];
    const addressCode = getAddressCode(code);
    if (map && !hasOwnProperty.call(map, addressCode[type])) {
      const mapKey = parentKey ? `${addressCode[parentKey]}${addressCode[type]}` : `${addressCode[type]}`;
      map[mapKey] = index;
    }
    const payload = {
      label,
      value: code,
      parentCode: addressCode[parentKey],
      selfCode: addressCode[type],
      originCode: addressCode.originCode,
    };
    if (!isLeaf) payload.children = [];
    if (isFunction(cb)) return cb(payload, addressCode);
    return payload;
  });
}
