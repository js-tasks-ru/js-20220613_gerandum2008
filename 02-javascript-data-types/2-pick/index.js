/**
 * pick - Creates an object composed of the picked object properties:
 * @param {object} obj - the source object
 * @param {...string} fields - the properties paths to pick
 * @returns {object} - returns the new object
 */
export const pick = (obj, ...fields) => {
    return Object.fromEntries(Object.entries(obj).filter(([key,value])=>{
        for(let i=0;i<fields.length;i++){
          if(key===fields[i]){
            return [key,value]
          }
        }
      }))
};
