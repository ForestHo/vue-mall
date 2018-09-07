// 函数节流
export const debounce = (func, delay = 300) => {
  let timer = null;
// 这里用到了ES6的剩余参数
  return function (...args) {
    timer && clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    },delay);
  }
};
