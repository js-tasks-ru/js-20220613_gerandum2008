/**
 * omit - creates an object composed of enumerable property fields
 * @param {object} obj - the source object
 * @param {...string} fields - the properties paths to omit
 * @returns {object} - returns the new object
 */
export const omit = (obj, ...fields) => {
  let arr = Object.entries(obj);
  for (let i = arr.length - 1; 0 <= i; --i) {
    for (let k of fields) {
      if (arr[i][0] === k) {
        arr.splice(i, 1);
      }
    }
  }
  return Object.fromEntries(arr);
};
