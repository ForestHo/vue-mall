<template>
  <!--滚动条里面只有一个<swiper-slide>,所有可以滚动的内容
  都在<swiper-slide>里面,<swiper-slide>里面提供一个slot插槽
  也就是这个时候滚动条其实像一个容器组件，它提供了一个可以滚动的
  容器,然后内容都在这个容器里面-->
   <swiper :options="swiperOption" ref="swiper">
     <!--下拉-->
     <div class="mine-scroll-pull-down" v-if="pullDown">
       <!--这里用ref获取到loading组件对象-->
       <me-loading :text="pullDownText" inline ref="pullDownLoading">
       </me-loading>
     </div>
     <swiper-slide>
        <slot></slot>
     </swiper-slide>
     <!-- 上拉 -->
     <div class="mine-scroll-pull-up" v-if="pullUp">
       <me-loading :text="pullUpText" inline ref="pullUpLoading"/>
     </div>
     <!--提供一个根据参数来判断是否存在的滚动条-->
     <div class="swiper-scrollbar" v-if="scrollbar" slot="scrollbar"></div>
   </swiper>
</template>

<script>
  import {swiper,swiperSlide} from 'vue-awesome-swiper';
  import MeLoading from 'base/loading';
  import {
    PULL_DOWN_HEIGHT,
    PULL_DOWN_TEXT_INIT,
    PULL_DOWN_TEXT_START,
    PULL_DOWN_TEXT_ING,
    PULL_DOWN_TEXT_END,
    PULL_UP_HEIGHT,
    PULL_UP_TEXT_INIT,
    PULL_UP_TEXT_START,
    PULL_UP_TEXT_ING,
    PULL_UP_TEXT_END
  } from './config';

  export default {
    name: 'MeScroll',
    components: {
      swiper,
      swiperSlide,
      MeLoading
    },
    props: {
      scrollbar: {
        type: Boolean,
        default: true
      },
      data: {
        type: [Array, Object]
      },
      pullDown: {
        type: Boolean,
        default: false
      },
      pullUp: {
        type: Boolean,
        default: false
      }
    },
    watch: {
      data() {
        this.update();
      }
    },
    created(){ //这个生命周期钩子里面数据准备完毕，也可以调用methods里面的init方法
      this.init();
    },
    methods: {
      init() {
        this.pulling = false;
        this.pullDownText = PULL_DOWN_TEXT_INIT;
        this.pullUpText = PULL_DOWN_TEXT_INIT; //没有
        this.swiperOption = {
          direction: 'vertical',
          /*一页里面可以看到几张图片,auto自适应*/
          slidesPerView: 'auto',
          /*freeMode自由模式,不像幻灯片那样限制了滚动距离*/
          freeMode: true,
          /*计算并设置wrapper的高度*/
          setWrapperSize: true,
          scrollbar: {
          el: this.scrollbar ? '.swiper-scrollbar' : null,
            hide: true
        },
          /*给sliderMove事件绑定处理函数scroll*/
          on: {
            sliderMove: this.scroll,
            touchEnd: this.touchEnd,
            transitionEnd: this.scrollEnd // 向上滑动时监听scrollEnd
          }
        };
      },
      update() {
        // console.log(this.$refs.swiper);
        //数据改变了，或者说数据准备好了，但是并不能保证DOM渲染出来
        //所以Vue官方提供了$nextTick方法,这样就能保证DOM渲染完毕，此时再去更新数据
        this.$nextTick(() => {
          this.$refs.swiper && this.$refs.swiper.swiper.update();
        });
      },
      scrollToTop(speed, runcallback) {
        this.$refs.swiper && this.$refs.swiper.swiper.slideTo(0, speed, runcallback);
      },
      /*上面的update是提供给外部使用的,下面是内部使用的api*/
      scroll() {
        /*this.$refs.swiper是swiper组件,后面的swiper组件下的实例对象*/
        const swiper = this.$refs.swiper.swiper;
       /*swiper.translate的值 下拉时从0开始正向增大,往上滑 滚动条往下滚时，其值负向增大*/
        this.$emit('scroll', swiper.translate, swiper.swiper);
        // console.log(swiper.translate);
        /*正在上拉或者下拉过程中，直接返回*/
        if(this.pulling) return;

        if(swiper.translate > 0){//下拉
            if(!this.pullDown) {
              return;
            }
            if(swiper.translate > PULL_DOWN_HEIGHT){
                /*闪动bug，改变data里面pullDownText的值，重新渲染造成了闪动
                * 除了传值来改变一个组件的数据以外，还可以调用组件，用它提供的api
                * 来改变，scroll组件不是提供了update方法吗*/
                this.$refs.pullDownLoading.setText(PULL_DOWN_TEXT_START);
            }else{
                this.$refs.pullDownLoading.setText(PULL_DOWN_TEXT_INIT);
            }
        }else if (swiper.isEnd) { // 上拉,swiper.isEnd这里判断是否滚到底部
          //是否开启上拉功能
          if (!this.pullUp) {
            return;
          }
          //是否达到 上拉的触发条件
          const isPullUp = Math.abs(swiper.translate) +
            swiper.height - PULL_UP_HEIGHT > parseInt(swiper.$wrapperEl.css('height'));

          if (isPullUp) {
            this.$refs.pullUpLoading.setText(PULL_UP_TEXT_START);
          } else {
            this.$refs.pullUpLoading.setText(PULL_UP_TEXT_INIT);
          }
        }
      },
      scrollEnd() {
        this.$emit('scroll-end', this.$refs.swiper.swiper.translate, this.$refs.swiper.swiper,
          this.pulling);
      },
      touchEnd() {
        if(this.pulling) return;
        const swiper = this.$refs.swiper.swiper;

        if(swiper.translate > PULL_DOWN_HEIGHT){//下拉
          if(!this.pullDown) return;

          this.pulling = true;
          swiper.allowTouchMove = false;// 禁止触摸
          swiper.setTransition(swiper.params.speed);
          swiper.setTranslate(PULL_DOWN_HEIGHT);
          swiper.params.virtualTranslate = true;// 定住不给回弹
          this.$refs.pullDownLoading.setText(PULL_DOWN_TEXT_ING);
          this.$emit('pull-down', this.pullDownEnd);// 触发一个事件
        }else if (swiper.isEnd) { // 底部
          const totalHeight = parseInt(swiper.$wrapperEl.css('height'));
          const isPullUp = Math.abs(swiper.translate) + swiper.height - PULL_UP_HEIGHT > totalHeight;

          if (isPullUp) { // 上拉
            if (!this.pullUp) {
              return;
            }
            this.pulling = true;
            swiper.allowTouchMove = false; // 禁止触摸
            swiper.setTransition(swiper.params.speed);
            swiper.setTranslate(-(totalHeight + PULL_UP_HEIGHT - swiper.height));
            swiper.params.virtualTranslate = true; // 定住不给回弹
            this.$refs.pullUpLoading.setText(PULL_UP_TEXT_ING);
            this.$emit('pull-up', this.pullUpEnd);
          }
        }
      },
      pullDownEnd() {
        const swiper = this.$refs.swiper.swiper;
        this.pulling = false;
        this.$refs.pullDownLoading.setText(PULL_DOWN_TEXT_END);
        swiper.params.virtualTranslate = false;//可以回弹
        swiper.allowTouchMove = true;//可以触摸
        swiper.setTransition(swiper.params.speed);
        swiper.setTranslate(0);//让位置归0
        setTimeout(() => {
          this.$emit('pull-down-transition-end');
        }, swiper.params.speed);
      },
      pullUpEnd() {
        const swiper = this.$refs.swiper.swiper;
        this.pulling = false;
        this.$refs.pullUpLoading.setText(PULL_UP_TEXT_END);
        swiper.params.virtualTranslate = false;
        swiper.allowTouchMove = true;
      }
    }
  };
</script>

<style lang="scss" scoped>
    .swiper-container{
      overflow: hidden;
      width: 100%;
      height: 100%;
    }
  .swiper-slide{
    height: auto;
  }
  .mine-scroll-pull-down{
    position: absolute;
    left: 0;
    /*默认不可见*/
    bottom: 100%;
    width: 100%;
    height: 80px;
  }
  .mine-scroll-pull-up {
    top: 100%;
    height: 30px;
  }
</style>
