/**
 * omit - creates an object composed of enumerable property fields
 * @param {object} obj - the source object
 * @param {...string} fields - the properties paths to omit
 * @returns {object} - returns the new object
 */
export const omit = (obj, ...fields) => {
  let arr = Object.entries(obj);
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < fields.length; j++) {
      if (arr[i][0] === fields[j]) {
        arr.splice(i, 1);
      }
    }
  }

  return Object.fromEntries(arr);
};
