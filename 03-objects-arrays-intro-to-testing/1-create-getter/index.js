/**
 * createGetter - creates function getter which allows select value from object
 * @param {string} path - the strings path separated by dot
 * @returns {function} - function-getter which allow get value from object by set path
 */
export function createGetter(field) {
  const arr = field.split(".");
  return (event) => {
    let result = event;
    for (const key of arr) {
      if (result === undefined) break;
      result = result[key];
    }
    return result;
  };
}
