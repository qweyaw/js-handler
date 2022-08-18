// 1. 声明和初始化数组

let arr1 = new Array(5).fill(0);
let arr2 = Array(5)
  .fill(0)
  .map(() => Array(5).fill(0));
console.log(arr1); // [ 0, 0, 0, 0, 0 ]
console.log(arr2);
/* 
  [
    [ 0, 0, 0, 0, 0 ],
    [ 0, 0, 0, 0, 0 ],
    [ 0, 0, 0, 0, 0 ],
    [ 0, 0, 0, 0, 0 ],
    [ 0, 0, 0, 0, 0 ]
  ]
*/

// 2. 找出总和、最小值和最大值
let arr3 = [2, 5, 9, 4, 1];
let sum = arr3.reduce((a, b) => a + b);
let max = arr3.reduce((a, b) => (a > b ? a : b));
let min = arr3.reduce((a, b) => (a < b ? a : b));
console.log(sum, max, min); // 21 9 1

// 3. 对字符串、数字或对象数组进行排序
const stringArr = ["Joe", "Kapil", "Steve", "Musk"];
console.log(stringArr.sort()); // [ 'Joe', 'Kapil', 'Musk', 'Steve' ]
console.log(stringArr.reverse()); // [ 'Steve', 'Musk', 'Kapil', 'Joe' ]

const array = [40, 100, 1, 5, 25, 10];
console.log(array.sort((a, b) => a - b)); // 1, 5, 10, 25, 40, 100 ]
console.log(array.sort((a, b) => b - a)); // [ 100, 40, 25, 10, 5, 1 ]

const objectArr = [
  { first_name: "Lazslo", last_name: "Jamf" },
  { first_name: "Pig", last_name: "Bodine" },
  { first_name: "Pirate", last_name: "Prentice" },
];
console.log(objectArr.sort((a, b) => a.last_name.localeCompare(b.last_name)));
/* 
  [
    { first_name: 'Pig', last_name: 'Bodine' },
    { first_name: 'Lazslo', last_name: 'Jamf' },
    { first_name: 'Pirate', last_name: 'Prentice' }
  ]
*/

// 4. 从数组中过滤出虚假值
const array1 = [3, 0, 6, 7, "", false];
console.log(array1.filter(Boolean)); // [3, 6, 7]

// 5. 对各种条件使用逻辑运算符
function doSomething(arg1) {
  arg1 = arg1 || 10;
  return arg1;
}
let foo = 10;
console.log(foo === 10 && doSomething()); // // 10
console.log(foo === 5 || doSomething()); // 10

// 6. 删除重复值
const array2 = [5, 4, 7, 8, 9, 2, 7, 5];
const res = array2.filter((item, index, arr) => arr.indexOf(item) === index);

const res1 = [...new Set(array2)];
console.log(res, res1); // [ 5, 4, 7, 8, 9, 2 ] [ 5, 4, 7, 8, 9, 2 ]

// 7. 创建计数器对象映射
let string = "kapilalipak";
const table = {};
for (const char of string) {
  table[char] = table[char] + 1 || 1;
}
console.log(table); // { k: 2, a: 3, p: 2, i: 2, l: 2 }

const countMap = new Map();
for (let i = 0; i < string.length; i++) {
  if (countMap.has(string[i])) {
    countMap.set(string[i], countMap.get(string[i]) + 1);
  } else {
    countMap.set(string[i], 1);
  }
}
console.log(countMap); // Map { 'k' => 2, 'a' => 3, 'p' => 2, 'i' => 2, 'l' => 2 }

// 8. 将Object属性转成属性数组
const obj = { a: 1, b: 2, c: 3 };
console.log(Object.entries(obj)); // [ [ 'a', 1 ], [ 'b', 2 ], [ 'c', 3 ] ]
console.log(Object.keys(obj)); // [ 'a', 'b', 'c' ]
console.log(Object.values(obj)); // [ 1, 2, 3 ]

// 9. url 获取参数 并转为对象
const getParameters = (URL) =>
  JSON.parse(
    `{"${decodeURI(URL.split("?")[1])
      .replace(/"/g, '\\"')
      .replace(/&/g, '","')
      .replace(/=/g, '":"')}"}`
  );

console.log(
  getParameters("https://www.google.com.hk/search?q=js+md&newwindow=1") //{ q: 'js+md', newwindow: '1' }
);

// 10 检查对象是否为空
function isEmpty(obj) {
  return Reflect.ownKeys(obj).length === 0 && obj.constructor === Object;
}

console.log(isEmpty({})); // true
console.log(isEmpty({ a: 1 })); // false
