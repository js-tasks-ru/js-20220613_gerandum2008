/**
 * trimSymbols - removes consecutive identical symbols if they quantity bigger that size
 * @param {string} string - the initial string
 * @param {number} size - the allowed size of consecutive identical symbols
 * @returns {string} - the new string without extra symbols according passed size
 */
export function trimSymbols(string, size) {
  if (size === 0) return "";
  if (size === undefined) return string;
  const firstSlice = string.slice(0, size);
  const rest = [...string.slice(size)];
  return rest.reduce((obj, key) => {
    if (!obj.endsWith(key.repeat(size))) {
      obj += key;
    }
    return obj;
  }, firstSlice);
}
