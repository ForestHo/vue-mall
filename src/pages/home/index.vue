<template>
    <div class="home">
        <header class="g-header-container">
          <home-header :class="{'header-transition': isHeaderTransition }" ref="header"/>
        </header>
        <!--<me-scroll></me-scroll>-->
        <me-scroll
          :data="recommends"
          pullDown
          pullUp
          @pull-up="pullToLoadMore"
          @pull-down="pullToRefresh"
          @scroll="scroll"
          @scroll-end="scrollEnd"
          @pull-down-transition-end="pullDownTransitionEnd"
          ref="scroll"
        >
          <home-slider ref="slider"/>
          <home-nav></home-nav>
          <home-recommend @loaded="getRecommends" ref="recommend"/>
          <!--<home-recommend/>-->
        </me-scroll>
        <div class="g-backtop-container">
          <me-backtop :visible="isBacktopVisiable" @backtop="backToTop"/>
        </div>
        <router-view></router-view>
    </div>
</template>

<script>
  import HomeHeader from './header';
  import HomeSlider from './slider';
  import MeScroll from 'base/scroll';
  import HomeNav from './nav';
  import HomeRecommend from './recommend';
  import MeBacktop from 'base/backtop';
  import {HEADER_TRANSITION_HEIGHT} from './config';

  export default {
    name: 'Home',
    components: {
      HomeHeader,
      HomeSlider,
      MeScroll,
      MeBacktop,
      HomeNav,
      HomeRecommend
    },
    data() {
      return {
        // getRecommends: [],
        recommends: [],
        isBacktopVisiable: false,
        isHeaderTransition: false
      };
    },
    methods: {
      updataScroll() {

      },
      getRecommends(recommends) {
        this.recommends = recommends;
      },
      pullToRefresh(end) {
        //this.$refs.slider.update()返回一个promise对象
        this.$refs.slider.update().then(end);
          // setTimeout(()=>{
          //   console.log('refresh end');
          //   end();
          // },2000);
      },
      pullToLoadMore(end) {
        this.$refs.recommend.update().then(end).catch(err => {
          if(err){
            console.log(err);
          }
          end();
        //  处理没有更多数据的情况
        //  禁止加载更多数据
        //  替换上拉时的loading,改为没有更多数据了
        });
        // setTimeout(()=>{
        //   console.log('up refresh end');
        //   end();
        // },1000);
      },
      scroll(translate) {
        //手滑动时 触发
        this.changeHeaderStatus(translate);
      },
      scrollEnd(translate, scroll, pulling) {
        if(!pulling){
          //手松开,滚动完成之后还去触发
          this.changeHeaderStatus(translate);
        }
        this.isBacktopVisiable = translate < 0 && -translate > scroll.height;
      },
      backToTop(){
        this.$refs.scroll && this.$refs.scroll.scrollToTop();
      },
      changeHeaderStatus(translate) {
        if(translate > 0){//上拉
          this.$refs.header.hide();
          return;
        }
        this.$refs.header.show();

        this.isHeaderTransition = -translate > HEADER_TRANSITION_HEIGHT;
      },
      pullDownTransitionEnd() {
        this.$refs.header.show();
      }
    }
  };
</script>

<style lang="scss" scoped>
  @import "~assets/scss/mixins";
    .home{
      overflow: hidden;
      width: 100%;
      height: 100%;
      background-color: $bgc-theme;
    }
</style>
