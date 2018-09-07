<template>
  <!--这里不作为一个对象传递过去，而是分开去传递参数
  分开传有几个好处,分开 便于数据校验，分开传语义化更清晰，
  对象很难进行校验-->
  <!--组件就是自定义标签-->
  <div class="slider-wrapper">
    <!--sliders不存在显示loading-->
    <me-loading v-if="!sliders.length"></me-loading>
    <!--v-if="sliders.length"-->
    <me-slider
      :data="sliders"
     :direction="direction"
     :loop="loop"
     :interval="interval"
     :pagination="pagination"
     v-else
   >
     <swiper-slide
      v-for="(item, index) in sliders"
      :key="index"
     >
       <a :href="item.linkUrl" class="slider-link">
         <img :src="item.picUrl" class="slider-img">
       </a>
     </swiper-slide>
   </me-slider>
  </div>
</template>

<script>
  /*在MeSlider基础组件上包装一层，填充相关的数据
  * 变成业务组件*/
  import MeSlider from 'base/slider';
  import {swiperSlide} from 'vue-awesome-swiper';
  /* from后面要改成单引号，不然校验通过不了*/
  import {sliderOptions} from './config';
  import {getHomeSlider} from '../../api/home';
  import MeLoading from 'base/loading'

  export default {
    name: 'HomeSlider',
    components: {
      MeSlider,
      MeLoading,
      swiperSlide
    },
    data() {
      /*在js里面,本地图片一定要通过require引入*/
      return {
        direction: sliderOptions.direction,
        loop: sliderOptions.loop,
        interval: sliderOptions.interval,
        pagination: sliderOptions.pagination,
        sliders: []
      // {
      //  'linkUrl':'https://www.imooc.com',
      //  'picUrl':require('./1.jpg')
      // },
      // {
      //  'linkUrl':'https://www.imooc.com',
      //  'picUrl':require('./2.jpg')
      // },
      // {
      //  'linkUrl':'https://www.imooc.com',
      //  'picUrl':require('./3.jpg')
      // },
      // {
      //  'linkUrl':'https://www.imooc.com',
      //  'picUrl':require('./4.jpg')
      // }
      }
    },
    /*一般都会在created里面获取远程数据*/
    created() {
     this.getSliders();
    },
    methods: {
        //外部可以使用的API
        update(){
          return this.getSliders();
        },
        getSliders() {
          return getHomeSlider().then(data => {
            // console.log(data);
            this.sliders = data;
          });
        }

    }
  };
</script>

<style lang="scss" scoped>
    .slider-wrapper{
      height: 183px;
    }
    .slider-link{
      display: block;
    }
    .slider-link,
    .slider-img{
      width: 100%;
      height: 100%;
    }
</style>
