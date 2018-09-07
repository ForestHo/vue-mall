<template>
    <div class="history" v-if="historys.length">
      <h4 class="history-title">历史搜索</h4>
      <!--transition-group 会被转换为后面指定的ul标签
      ul的直接子元素只能是li，而需要加动画的li有很多个,所以在这里加transition-group-->
      <transition-group class="g-list" name="list" tag="ul">
        <!--:key="item" ,key只能放字符串或数字，这里的item刚好就是字符串-->
        <li
          class="g-list-item"
          v-for="item in historys"
          :key="item"
          @click="$_selectItem(item)"
        >
          <span class="g-list-text">{{item}}</span>
          <i
            class="iconfont icon-delete"
            @click.stop="removeItem(item)"
          ></i>
        </li>
      </transition-group>
      <a
        href="javascript:;"
        class="history-btn"
        @click="showConfirm"
      ><i class="iconfont icon-clear"></i>清空历史搜索</a>
    </div>
</template>

<script>
  import storage from 'assets/js/storage';
  import {SEARCH_HISTORY_KEYWORD_KEY} from './config';
  import {searchMixin} from 'assets/js/mixins';

  export default {
    name: 'SearchHistory',
    mixins: [searchMixin],
    data() {
      return {
        historys: []
      };
    },
    created() {
      this.getKeyword();
    },
    methods: {
      update() {
        this.getKeyword();
      },
      getKeyword() {
        this.historys = storage.get(SEARCH_HISTORY_KEYWORD_KEY, []);
      },
      removeItem(item) {
        console.log('he');
        this.historys = this.historys.filter(val => val !== item);
        storage.set(SEARCH_HISTORY_KEYWORD_KEY, this.historys);
        setTimeout(() => {
          this.$emit('remove-item', item);//等待动画完成之后再触发事件
        }, 100);
      },
      showConfirm() {
        this.$emit('show-confirm');
      },
      clear() {
        storage.remove(SEARCH_HISTORY_KEYWORD_KEY);
      }
    }
  };
</script>

<style lang="scss" scoped>
  @import "~assets/scss/mixins";

  .history {
    margin-top: 10px;
    padding-bottom: 30px;
    background-color: #fff;

    &-title {
      height: 34px;
      line-height: 34px;
      padding: 0 10px;
      font-size: $font-size-l;
      font-weight: bold;
    }

    &-btn {
      @include flex-center();
      width: 80%;
      height: 40px;
      background: none;
      border: 1px solid #ccc;
      border-radius: 4px;
      margin: 0 auto;
      color: #686868;
      .icon-clear {
        margin-right: 5px;
      }
    }
    .list {
      &-enter-active,
      &-leave-active {
        transition: height 0.1s;
      }

      &-enter,
      &-leave-to {
        height: 0;
      }
    }
  }
</style>
