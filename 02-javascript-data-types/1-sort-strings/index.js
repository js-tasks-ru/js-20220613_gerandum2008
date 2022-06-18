/**
 * sortStrings - sorts array of string by two criteria "asc" or "desc"
 * @param {string[]} arr - the array of strings
 * @param {string} [param="asc"] param - the sorting type "asc" or "desc"
 * @returns {string[]}
 */
export function sortStrings(arr, param = "asc") {
  let arrSort = [...arr];
  if (param === "asc") {
    arrSort.sort((a, b) => {
      return a.localeCompare(b, "kf", { caseFirst: "upper" });
    });
    return arrSort;
  }
  
  if (param === "desc") {
    arrSort.sort((a, b) => {
      return b.localeCompare(a, "kf", { caseFirst: "lower" });
    });
    return arrSort;
  }
}
