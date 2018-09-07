import  axios from 'axios';
import jsonp from 'assets/js/jsonp';
import {jsonpOptions, TIMEOUT} from "./config";

//获取内容的数据-ajax
export const getSearchHotKeyword = () => {
  return axios.get('https://so.m.jd.com/ware/hotKeyWord.action?_format_=json', {
    timeout: TIMEOUT
  })
    .then(res => {
      res = JSON.parse(res.data.hotKeyWord);
      if(res && res.owner){//succeed
        return res.owner;
      }
      throw new Error('没有成功获取到数据!');
    }).catch(err => {
     if (err) {
        console.log(err);
      }
    }).then(res => {
      return new Promise(resolve => {
        setTimeout(() => {
          resolve(res);
        }, 1000);
      });
  });
//  按照之前的操作,成功获取到数据,我们会传回调函数然后来执行相应的操作，
//  但是现在呢,特别是ES6以后,都会使用promise来代替原来的回调，promise
//  其实就是解决异步问题的解决办法，它可以解决之前"回调地狱"的问题,而
//  axios本身返回的就是一个promise对象

};

//获取搜索结果数据--jsonp
export const getSearchResult = keyword => {
  const url = 'https://suggest.taobao.com/sug';
  const params = {
    q: keyword,
    code: 'utf-8',
    area: 'c2c',
    nick: '',
    sid: null
  };

  // jsonpOptions.timeout = 100;
  return jsonp(url, params ,jsonpOptions).then(res => {
    if(res.result) {
      return res.result;
    }

    throw new Error('没有成功获取到数据！');
  }).catch(err => {
    if(err) {
      console.log(err);
    }
  }).then(res => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(res);
      }, 1000);
    });
  });
};

//获取热门推荐数据--jsonp
//传两个参数，page=1，默认第一页，psize=20，默认20条
// export const getHomeRecommend = (page = 1,psize = HOME_RECOMMEND_PAGE_SIZE) => {
//   const url = 'https://ju.taobao.com/json/tg/ajaxGetItemsV2.json';
//   const params = {
//     page,
//     psize,
//     type: 0,
//     frontCatId: ''
//   };
//   return jsonp(url, params, jsonpOptions).then(res => {
//     console.log(res);
//     if(res.code === '200'){
//       return res;
//     }
//     throw new Error('没有成功获取到数据!');
//   }).catch(err => {
//     //这个catch可以捕获到code !== 0时主动抛出的错误
//     //如果有超时或者网络错误,一样可以在这里捕获到
//     if (err) {
//       console.log(err);
//     }
//     //  catch虽然是捕获错误的，但是你只要不在catch里面手动抛出错误，
//     //  那么就可以接着链式调用下去，
//   });
//   // }).then(data => {
//   //   return new Promise(resolve => {
//   //     setTimeout(() => {
//   //       resolve(data);
//   //     },1000);
//   //   });
//   // });;
// }
