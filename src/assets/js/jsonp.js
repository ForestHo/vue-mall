import jsonp from 'jsonp';

const parseParam = param => {
  let params = [];
  for(const key in param){
    //这里的param不要写成params了，亲!!!
    params.push([key, param[key]]);
  }
  /*map() 方法创建一个新数组，其结果是该数组中的每个元素
  都调用一个提供的函数后返回的结果。*/
  /* page=1&psize=20*/
  // console.log(params);
  return params.map(value => value.join('=')).join('&');
};

export default (url, data, options) => {
  url += (url.indexOf('?') < 0 ? '?':'&') + parseParam(data);
  return new Promise((resolve, reject) => {
    jsonp(url, options, (err, data) => {
      if(err){
        reject(err);
      }else{
        resolve(data);
      }
    })
  });
};
