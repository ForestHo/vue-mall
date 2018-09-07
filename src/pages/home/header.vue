<template>
      <me-navbar class="header" v-show="visible">
        <i class="iconfont icon-scan" slot="left"></i>
        <me-search-box
          placeholder="开学季有礼，好货5折起"
          slot="center"
          :fake="fake"
          @query="getQuery"
          @click.native="goToSearch"
        />
        <i class="iconfont icon-msg" slot="right"></i>
      </me-navbar>
</template>

<script>
  import MeNavbar from 'base/navbar';
  import MeSearchBox from 'base/search-box';


  export default {
    name: 'HomeHeader',
    components: {
      MeNavbar,
      MeSearchBox
    },
    data() {
      return {
        visible: true,
        fake: true
      };
    },
    methods: {
      show() {
        this.visible = true;
      },
      hide() {
        this.visible = false;
      },
      getQuery(query) {
        console.log(query);
      },
      goToSearch() {
        // 有个locationHistory的数组保存路由的历史记录，就会多一天记录
        // 我们这里把新的历史记录推进来
        //还提供了replace的方法，替换当前页面的历史记录，就会少一条记录
        // this.$router.push('/search');
        this.$router.replace('/search');
      }
    }
  };
</script>

<style lang="scss" scoped>
  @import "~assets/scss/mixins";

  .header{
    /*等价于.header.mine-navbar,优先级为10+10=20*/
    &.mine-navbar{
      background-color: transparent;
      transition: background-color 0.5s;
      /*background-color: $header-bgc-translucent;*/
    }

    .iconfont {
      color: $icon-color-default;
      font-size: $icon-font-size;
    }
    &.header-transition {
      background-color: $header-bgc-translucent;
    }
  }
</style>
