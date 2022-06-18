/**
 * sortStrings - sorts array of string by two criteria "asc" or "desc"
 * @param {string[]} arr - the array of strings
 * @param {string} [param="asc"] param - the sorting type "asc" or "desc"
 * @returns {string[]}
 */
export function sortStrings(arr, param = 'asc') {
    if(param==='asc'){
    arr.sort((a,b)=>{
      return a.localeCompare(b,'kf',{caseFirst: 'upper' }) 
    })
      return arr 
    }
    if(param==='desc'){
    arr.sort((a,b)=>{
      return b.localeCompare(a,'kf',{caseFirst: 'lower' }) 
    })
      return arr
    }
    }
