<template>
  <div class="content-wrapper" :key="keyId">
    <!--loading图标-->
    <div class="loading-container" v-if="isLoading">
      <!--<me-loading/>-->
      <div class="loading-wrapper">
        <me-loading/>
      </div>
    </div>
    <me-scroll ref="scroll" v-else>
      <div class="content">
        <!--banner图-->
        <div class="pic" v-if="content.banner">
          <a :href="content.banner.linkUrl" class="pic-link">
            <img @load="updateScroll" :src="content.banner.picUrl" alt="" class="pic-img">
          </a>
        </div>
        <div
          class="section"
          v-for="(section, index) in content.data"
          :key="index"
        >
          <h4 class="section-title">{{section.name}}</h4>
          <ul class="section-list">
            <li
              class="section-item"
              v-for="(item, i) in section.itemList"
              :key="i"
            >
              <a :href="item.linkUrl" class="section-link">
                <p class="section-pic" v-if="item.picUrl">
                  <!--有图片的地方，就考虑延时加载-->
                  <!--<img v-lazyload="item.picUrl" alt="" class="section-img">-->
                  <img v-lazy="item.picUrl" alt="" class="section-img">
                  <!--<img src="item.picUrl" alt="" class="section-img">-->
                </p>
                <p class="section-name">{{item.name}}</p>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </me-scroll>
    <div class="g-backtop-container">
      <me-backtop @backtop="backToTop" :visible="isBacktopVisiable"/>
    </div>
  </div>
</template>

<script>
  import MeLoading from 'base/loading';
  import MeScroll from 'base/scroll';
  import MeBacktop from 'base/backtop';
  import {getCategoryContent} from 'api/category';
  import storage from 'assets/js/storage';
  import {CATEGORY_CONTENT_KEY,CATEGORY_CONTENT_UPDATE_TIME_INTERVAL} from './config'

  export default {
    name: 'CategoryContent',
    components: {
      MeLoading,
      MeScroll,
      MeBacktop
    },
    props: {
      curId: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        keyId:Math.random(),
        content: {},
        isBacktopVisiable: false,
        isLoading: true
      };
    },
    watch: {
      curId(id) {
        console.log(id);
        this.isLoading = true;
        this.getContent(id).then(() => {
          this.isLoading = false;
          /*多次连续快速点击，重新渲染模板，否则数据图片数据可能是上一次的数据*/
          this.backToTop(0);
          this.keyId = Math.random();
        });
      }
    },
    methods: {
      getContent(id) {
        let contents = storage.get(CATEGORY_CONTENT_KEY);
        let updateTime;
        const curTime = new Date().getTime();

        if(contents && contents[id]){//从缓存可以获取到内容
          updateTime = contents[id].updateTime || 0;
          if(curTime - updateTime <= CATEGORY_CONTENT_UPDATE_TIME_INTERVAL){//from localstorage
              return this.getContentByLocalStorage(contents[id]);
          } else {//from http
            return this.getContentByHttp(id).then(() => {
              this.updateLocalStorage(contents, id, curTime);
            });
          }
        }else {//从缓存获取不到内容,走http请求
          return this.getContentByHttp(id).then(() => {
            this.updateLocalStorage(contents, id, curTime);
          });
        }
      },
      getContentByLocalStorage(content) {
        this.content = content.data;
        return Promise.resolve();
      },
      getContentByHttp(id) {
        return getCategoryContent(id).then(data => {
          //也就是成功获取到数据了,这里才会执行resolve
          //如果没有获取到，上面getContentByHttp不会走then那一步
          return new Promise(resolve => {
            if (data) {
              this.content = data;
              // console.log(data);
              resolve();
            }
          });
        });
      },
      updateLocalStorage(contents, id, curTime) {
        contents = contents || {};
        contents[id] = {};
        contents[id].data = this.content;
        contents[id].updateTime = curTime;
        storage.set(CATEGORY_CONTENT_KEY, contents);
      },
      backToTop(speed) {
        this.$refs.scroll && this.$refs.scroll.scrollToTop(speed);
      },
      updateScroll() {
        console.log('update scroll');
        this.$refs.scroll && this.$refs.scroll.update();
      }
    }
  };
</script>

<style lang="scss" scoped>
  @import "~assets/scss/mixins";

  .content-wrapper {
    position: relative;
    height: 100%;
  }

  .loading-container {
    position: absolute;
    top: 0;
    left: 0;
    z-index: $category-popup-z-index;
    @include flex-center();
    width: 100%;
    height: 100%;
   /* background-color: $modal-bgc;*/

    .mine-loading {
      color: #fff;
      font-size: 14px;
    }
  }
  .loading-wrapper {
    width: 50%;
    padding: 30px 0;
    background-color: $modal-bgc;
    border-radius: 4px;
  }
  .pic-img {
    width: 100%;
  }
  .section {
    /*display: flex;*/
    margin-top: 10px;
    padding: 10px 10px;
  }
  .section-list {
    margin-top: 8px;
    padding-bottom: 10px;
    background-color: #fff;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-wrap: wrap;
  }
  .section-title {
    font-size: 14px;
    font-weight: bold;
    color: #000;
    font-family: 'Arial Black';
  }
  .section-item{

    width: 30%;
    background-color: #fff;
    /*margin-bottom: 8px;*/
    /*margin-right: 8px;*/
    margin: 5px 6px;
  }
  .section-name {
    text-align: center;
  }
  .section-link{
    display: block;
  }
  .section-pic{
    position: relative;
    /*padding-top与margin-top的百分比都是相对于宽度的，而不是相对于高的*/
    /*以下做法可以做到图片显示为一个正方形的自适应*/
    width: 100%;
    padding-top: 100%;

  }
  .content {
    padding: 10px;
  }
  .section-img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
</style>
