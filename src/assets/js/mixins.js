import storage from 'assets/js/storage';
import {SEARCH_HISTORY_KEYWORD_KEY} from 'pages/search/config';

export const searchMixin = {
  methods: {
    // vue推荐加上$_ 这样的前缀给mixins 混入的内部方法
    $_selectItem(keyword) {
      //没有获取到，就返回空的数组
      //splice有性能问题,所以这里用数组过滤filter
      let keywords = storage.get(SEARCH_HISTORY_KEYWORD_KEY, []);

      if (keywords.length !== 0){
        //val !== keyword为true,就保留下来
        keywords = keywords.filter(val => val !== keyword);
      }
      //unshift 数组的开头插入元素
      keywords.unshift(keyword);
      storage.set(SEARCH_HISTORY_KEYWORD_KEY, keywords);

      // location.href = `https://s.m.taobao.com/h5?event_submit_do_
      //   new_search_auction=1&_input_charset=utf-8&topSearch=1
      //   &atype=b&searchfrom=1&action=home%3Aredirect_app_action
      //   &from=1&sst=1&n=20&buying=buyitnow&q=${keyword}`;
    }
  }
};
