import  axios from 'axios';
import {SUCC_CODE, TIMEOUT} from "./config";

const CancelToken = axios.CancelToken;
let cancel;

//获取内容的数据-ajax
export const getCategoryContent = (id) => {
  /*当前一次请求并没有完成，就cancel掉,如果完成了，什么都不做*/
  cancel && cancel('取消了前一次的请求!');
  cancel = null;

  return axios.get(`http://www.imooc.com/api/category/content/${id}`, {
    timeout: TIMEOUT,
    cancelToken: new CancelToken(function executor(c) {
      cancel = c;
    })
  })
    .then(res => {
      if(res.data.code === SUCC_CODE){
        console.log(res);
        return res.data.content;
      }
      throw new Error('没有成功获取到数据!');
    }).catch(err => {
      if(axios.isCancel(err)){//取消前一次的请求
        console.log(err);
      }else{
        //handle error
        console.log(err);
      }
      //这个catch可以捕获到code !== 0时主动抛出的错误
      //如果有超时或者网络错误,一样可以在这里捕获到
      // if (err) {
      //   console.log(err);
      // }
      //  错误处理的方式有很多种,比如重新刷新
      // return [
      //   {
      //     linkUrl: 'https://www.imooc.com',
      //     picUrl: require('assets/img/404.png')
      //   }
      // ];
      //  catch虽然是捕获错误的，但是你只要不在catch里面手动抛出错误，
      //  那么就可以接着链式调用下去，
    });
  // }).then(data => {
  //     return new Promise(resolve => {
  //       setTimeout(() => {
  //         // console.log('test');
  //         resolve(data);
  //       },1000);
  //     });
  // });
//  按照之前的操作,成功获取到数据,我们会传回调函数然后来执行相应的操作，
//  但是现在呢,特别是ES6以后,都会使用promise来代替原来的回调，promise
//  其实就是解决异步问题的解决办法，它可以解决之前"回调地狱"的问题,而
//  axios本身返回的就是一个promise对象

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
