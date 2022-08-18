// 1. 数据类型判断

function typeOf(param) {
  let res = Object.prototype.toString.call(param);
  console.log(res);
  res = res.substring(8, res.length - 1).toLowerCase();
  return res;
}
console.log(typeOf([])); // 'array'
console.log(typeOf(new Date())); // 'date'

// 2. 生成随机十六进制颜色值
const randomHexColor = () => {
  return `#${Math.floor(Math.random() * 0xffffff)
    .toString(16)
    .padEnd(6, "0")}`;
};
console.log(randomHexColor()); // #fbc2b0

// 3. 检查当前选项卡是否在后台
const isTabActive = () => !document.hidden;

// 4. 检查元素是否处于焦点
const eleIsFocus = () => el === document.activeElement;

// 5. 检查设备类型
const judgeDeviceType = () =>
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|OperaMini/i.test(
    navigator.userAgent
  )
    ? "Mobile"
    : "PC";

// 6. 文字复制到剪贴板
const copyText = async (text) => await navigator.clipboard.writeText(text);

// 7. 获取选定的文本
const getSelectedText = () => window.getSelection().toString();

// 8. 查询某天是否为工作日
const isWeekDay = (date) => date.getDay() % 6 === 0;
console.log(isWeekDay(new Date(2022, 8, 18))); // true

// 9. 转换华氏/摄氏
// 华氏温度转换为摄氏温度
const fahrenheitToCelsius = (fahrenheit) => ((fahrenheit - 32) * 5) / 9;
// 摄氏温度转华氏温度
const celsiusToFahrenheit = (celsius) => (celsius * 9) / 5 + 32;

// 10. 两日期之间相差天数
const dayDiff = (date1, date2) =>
  Math.ceil(Math.abs(date1.getTime() - date2.getTime()) / 86400000);
console.log(dayDiff(new Date(2022, 6, 10), new Date(2022, 8, 16))); // 68

// 11. RGB 转 十六进制
const rgbToHex = (r, g, b) =>
  "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
console.log(rgbToHex(255, 255, 255)); // #ffffff

// 12. 数组平均值
const average = (arr) => arr.reduce((a, b) => a + b) / arr.length;
console.log(average([3, 5, 9, 3])); // 5
