<template>
  <me-navbar class="header">
    <me-search-box
      placeholder="开学季好礼，好货5折起"
      slot="center"
      @query="query"
    />
    <i class="iconfont icon-msg" slot="right"></i>
  </me-navbar>
</template>

<script>
  import MeNavbar from 'base/navbar';
  import MeSearchBox from 'base/search-box';

  export default {
    name: 'CategoryHeader',
    components: {
      MeNavbar,
      MeSearchBox
    },
    data() {
      return {
        query: ''
      };
    }
  };
</script>

<style lang="scss" scoped>
  @import "~assets/scss/mixins";

  .header {
    &.mine-navbar {
      background-color: $header-bgc-translucent;
    }

    .iconfont {
      color: $icon-color-default;
      font-size: $icon-font-size;
    }
  }
</style>
