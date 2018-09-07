<template>
    <!--基础组件，提供给页面插槽和分页器-->
    <swiper :options="swiperOption" :key="keyId">
      <slot></slot>
      <!--然后传个插槽参数给swipe-->
      <div class="swiper-pagination" v-if="pagination" slot="pagination"></div>
    </swiper>
</template>

<script>
  import {swiper} from 'vue-awesome-swiper';

  export default {
    name: 'MeSlider',
    components :{
      swiper
    },
    props: {
      /*幻灯片运动方向*/
      direction: {
        type: String,
        default: 'horizontal',
        /*需要有个验证，value就是传过来的值*/
        validator (value) {
          return [
            'horizontal',
            'vertical'
          ].indexOf(value) > -1;
        }
      },
      interval: {
        type: Number,
        default: 3000,
        validator(value) {
          return value >= 0;
        }
      },
      loop: {
        type: Boolean,
        default: true
      },
      pagination: {
        type: Boolean,
        default: true
      },
      data: {
        type: Array,
        /*这里不写成dafault:[]  是因为防止数据被共享,与data很类似*/
        default() {
          return [];
        }
      }
    },
    watch:{
      /*一旦数据发生变化，修改keyId的值*/
      data(newData) {
        if(newData.length === 0) return;
        this.swiperOption.loop = newData.length === 1 ? false: this.loop;
        this.keyId = Math.random();
      }
    },
    /*对于组件来说，它的data一定要是个函数，然后返回一个对象
    * 这样的话，组件在复用的时候就不会使用同一份数据了，能够
    * 保证组件的独立性*/
    data() {
      return {
        /*keyId默认值也是随机值*/
        keyId:Math.random()
      }
    },
    created() {
      this.init();
    },
    methods: {
      init() {
        this.swiperOption = {
          /*只有一张图片的话，就禁止左右滑动,轮播就失效了*/
          watchOverflow: true,
            direction: this.direction,
            autoplay: this.interval ? {
            delay: this.interval,
            /*一旦有交互，就会停止自动轮播,这里为false,表示不停止*/
            disableOnInteraction: false
          } : false,
            /*设置slide容器能够同时显示的slide数量*/
            slidesPerView: 1,

            loop: this.data.length <= 1 ? false : this.loop,
            pagination: {
            el: this.pagination ? '.swiper-pagination' : null
          }
        };
      }
    }
  };
</script>

<style lang="scss" scoped>
    .swiper-container{
      width: 100%;
      height: 100%;
    }
</style>
