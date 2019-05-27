/* eslint-disable no-new-object */
/*eslint valid-jsdoc: "error"*/
/*eslint "require-jsdoc": ["error", { "require": { "FunctionDeclaration": true, "MethodDefinition": true, "ClassDeclaration": true, "ArrowFunctionExpression": true, "FunctionExpression": true } }]*/

/**
 * Updating object immutably
 * @param {Object} oldObject, na old object that need to change 
 * @param {Object} newValue, new value of the whole object, or just some child attribute of the oldObject
 * @return {Object} returning a new object 
 */
export const updateObject = (oldObject={}, newValue={}) => {
  return {
    ...oldObject,
    ...newValue
  }
}

/**
 * Update every property in an Object with the same value
 * @param {Object} object that contain property  
 * @param {*} value any that should be placed as every property in the object
 * @return {Object} upated object which is all the properties has same value as param value 
 */
export const propertySetter = (object, value) => {
  let res = new Object()
  for (const key in object) {
    res[key] = value
  }
  return res
}

/**
 * Pick some attributes of an Object
 * @param {Object} obj, the parent Object 
 * @param {Array} keys, attributes name of the parent object
 * @return {Object} returning a new object from the reduced array map
 */
export const pick = (obj, keys) => {
  return keys.map(k => k in obj ? {[k]: obj[k]} : {})
    .reduce((res, o) => Object.assign(res, o), {})
}

/**
 * Reject or Remove some attributes of an object, it use the pick method
 * @param {Object} obj, the parent object 
 * @param {Array} keys, attributes name of the parent object that will be removed
 * @return {Object} returning a new object which is no longer contain the keys attributes
 */
export const reject = (obj, keys) => {
  const vkeys = Object.keys(obj)
    .filter(k => !keys.includes(k))
  return pick(obj, vkeys)
}

/**
 * Console logging data
 * @param {*} data, anything that gonna print out in browser console
 * @param {String} marker, string that represent or identify the current logged data
 * @return {Action} return none, just act logging
 */
export const clog = (data=null, marker=null) => {
  /* eslint-disable-next-line */
  (marker) ? console.log(marker, data) : console.log(data);
}

/**
 * Get a random number of some range
 * @param {Number} min, minimum random number could starts 
 * @param {Number} max  maximum random number could ends
 * @return {Number} return a random number in range of the given params
 */
export const randomNumber = (min=0, max=10) => {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

/**
 * Picking random value of an array index
 * @param {Array} arr , the array 
 * @param {Number} get, optional number of the random value should returns
 * @return {*} could return any items that contains in the array 
 */
export const pickRandom = (arr, get=null) => {
  if (arr.length > 0) {
    if (get) {
      let results = []
      for (let i=0; i<get; i++) {
        let index = Math.floor(Math.random() * (arr.length))
        results.push(arr[index])
      }
      return results
    } else {
      let index = Math.floor(Math.random() * (arr.length))
      return arr[index]
    }
  }
  return null
}

/**
 * Parsing String of json to object or array
 * @param {String} str, json string
 * @return {Object} return object or array 
 */
export const parse = (str) => {
  try {
    return JSON.parse(str)
  } catch(e) {
    return false
  }
}

/**
 * Reset properties in the object as the indexing params and return new object 
 * @param {Object} obj, old object that will re-set
 * @param {Array} indexing, array contains numbers that represent index of the new object
 * @return {Object} new object that has re-indexed properties of the param object, will return the old object, if indexing length <= 1
 */
export const reindexProperty = (obj, indexing) => {
  let objKeys = Object.keys(obj)
  let results = {}
  if (indexing.length > 1) {
    for (let st = 0; st < objKeys.length; st++) {
      let gonnaBStore = objKeys[indexing[st]]
      results[gonnaBStore] = obj[gonnaBStore]
    }
    return results
  }
  return obj
}

/**
 * Reset properties in the object as the indexing params and return new object 
 * @param {Object} obj, object that will be cheked wether it's empty or not
 * @return {Boolena} true or false
 */
export const isObjectEmpty = (obj) => {
  for(var prop in obj) {
    if(obj.hasOwnProperty(prop))
      return false
  }
  return JSON.stringify(obj) === JSON.stringify({})
}

/**
 * @param {String} string, String param
 * @return {String} String with Uppercase First Letter 
 */
export const ucFirst = (string) => {
  let ucFL = string.charAt(0).toUpperCase()
  let wFL = string.slice(1)
  return ucFL + wFL
}

/**
 * @param {Array} pieces, Array that should combine as String
 * @param {String} glue, String that affix array 
 * @return {String} glued pieces
 */
export const implode = (pieces, glue) => {
  return pieces.join(glue)
}

/**
 * 
 * @param {String} email email string 
 * @return {Boolean} is it true on email format or not 
 */
export const validateEmail = (email) => {
  var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(String(email).toLowerCase())
}

/**
 *  @param {String} passwd inputted password string 
 *  @param {String} cpasswd inputted confimation password string 
 *  @return {Boolean} is password match or not 
 */
export const passwordMatch = (passwd, cpasswd) => passwd === cpasswd 

/**
 * @param {String} date_param the param date
 * @return {String} new format as yyyy-mm-dd hh:mm:ss
 */
export const dateGlobalFormat = (date_param) => {
  const fullyear = date_param.getFullYear()
  const month = ((`${date_param.getMonth() + 1}`.length) > 1) ? (date_param.getMonth() + 1) : `0${(date_param.getMonth() + 1)}`
  const date = (`${date_param.getDate()}`.length > 1) ? date_param.getDate() : `0${date_param.getDate()}`
  let formatted_date = `${fullyear}-${month}-${date} ${date_param.getHours()}:${date_param.getMinutes()}:${date_param.getSeconds()}` 
  return formatted_date
}

/**
 * @param {Object} FormData the form to log
 * @return {Boolean} just to console
 */
export const logFormData = (FormData) => {
  for(var pair of FormData.entries()) {
    /* eslint-disable-next-line */
    console.log(pair[0]+ ', '+ pair[1]) 
  }
}