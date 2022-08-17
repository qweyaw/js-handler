/*
 * @Description: js handler 
 * @Author: Amy
 */

// 1. 数据类型判断

function typeOf (param) {
    let res = Object.prototype.toString.call(param);
    console.log(res)
    res = res.substring(8, res.length - 1).toLowerCase();
    return res
}
console.log(typeOf([])) // 'array'
console.log(typeOf(new Date())) // 'date'

// 2. 数组去重
// ES5
function unique (arr) {
    let res = arr.filter(function (item, index, array) {
        return array.indexOf(item) === index
    })
    return res
}
console.log(unique([1,3,5,2,2,5])) // [1,3,5,2]

// ES6
function unique2 (arr) {
    return Array.from(new Set(arr))
}
console.log(unique([1,3,5,2,2,5])) // [1,3,5,2]
