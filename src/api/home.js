import  axios from 'axios';
import {HOME_RECOMMEND_PAGE_SIZE, SUCC_CODE, TIMEOUT,jsonpOptions} from "./config";
import jsonp from 'assets/js/jsonp';

// 打乱数组顺序
const shuffle = (arr) => {
  const arrLength = arr.length;
  let i = arrLength;
  let rndNum;

  while (i--) {
    if (i !== (rndNum = Math.floor(Math.random() * arrLength))) {
      /*ES6的解构赋值，来直接交换两个数组的元素*/
      [arr[i], arr[rndNum]] = [arr[rndNum], arr[i]];
    }
  }
  return arr;
};
//获取幻灯片的数据-ajax
export const getHomeSlider = () => {
  return axios.get('http://www.imooc.com/api/home/slider',{
    timeout: TIMEOUT
  })
    .then(res => {
      if(res.data.code === SUCC_CODE){
        let sliders = res.data.slider;
        const slider = [sliders[Math.floor(Math.random() * sliders.length)]];
        // sliders = sliders.filter(() => Math.random() >= 0.5);
        sliders = shuffle(sliders.filter(() => Math.random() >= 0.5));
        if(sliders.length === 0){
          sliders = slider;
        }
        return sliders;
        // return res.data.slider;
      }
      throw new Error('没有成功获取到数据!');
    }).catch(err => {
      //这个catch可以捕获到code !== 0时主动抛出的错误
      //如果有超时或者网络错误,一样可以在这里捕获到
      if (err) {
        console.log(err);
      }
      //  错误处理的方式有很多种,比如重新刷新
      return [
        {
          linkUrl: 'https://www.imooc.com',
          picUrl: require('assets/img/404.png')
        }
      ];
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
export const getHomeRecommend = (page = 1,psize = HOME_RECOMMEND_PAGE_SIZE) => {
  const url = 'https://ju.taobao.com/json/tg/ajaxGetItemsV2.json';
  const params = {
    page,
    psize,
    type: 0,
    frontCatId: ''
  };
  return jsonp(url, params, jsonpOptions).then(res => {
    console.log(res);
    if(res.code === '200'){
      return res;
    }
    throw new Error('没有成功获取到数据!');
  }).catch(err => {
    //这个catch可以捕获到code !== 0时主动抛出的错误
    //如果有超时或者网络错误,一样可以在这里捕获到
    if (err) {
      console.log(err);
    }
    //  catch虽然是捕获错误的，但是你只要不在catch里面手动抛出错误，
    //  那么就可以接着链式调用下去，
  });
  // }).then(data => {
  //   return new Promise(resolve => {
  //     setTimeout(() => {
  //       resolve(data);
  //     },1000);
  //   });
  // });;
}
