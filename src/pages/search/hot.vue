<template>
    <div class="hot">
      <h4 class="hot-title">热门搜索</h4>
      <div class="loading-container" v-if="!hots.length">
        <me-loading/>
      </div>
      <ul class="hot-list" v-else>
        <li
          class="hot-item"
          v-for="(item, index) in hots"
          :key="index"
          @click="$_selectItem(item.hotWord)"
        >{{item.hotWord}}</li>
      </ul>
    </div>
</template>

<script>
  import MeLoading from 'base/loading';
  import {getSearchHotKeyword} from 'api/search';
  import {searchMixin} from 'assets/js/mixins';

  export default {
    name: 'SearchHot',
    components: {
      MeLoading
    },
    data() {
      return {
        hots: []
      };
    },
    mixins :[searchMixin],
    created() {
      this.getHotKeyword().then(() => {
        this.$emit('loaded');
      });
    },
    methods: {
      getHotKeyword() {
        return getSearchHotKeyword().then(data => {
          return new Promise(resolve => {
            if(data){
              this.hots = data;
              resolve();
            }
          });
        });
      }
    }
  };
</script>

<style lang="scss" scoped>
  @import "~assets/scss/mixins";

  .hot {
    /*height: 30%;*/
    padding-top: 10px;
    background-color: #fff;
    &-title {
      font-size: 18px;
      font-weight: bold;
      color: #000;
    }
    &-list {
      display: flex;
      flex-wrap: wrap;
      margin-top: 5px;
    }
    &-item {
      white-space: nowrap;
      padding: 7px;
      background-color: #F1F6FF;
      margin: 5px 3px 5px 7px;
      border-radius: 5px;
    }
  }
</style>
