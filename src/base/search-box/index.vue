<template>
    <div class="mine-search-box-wrapper">
       <i class="iconfont icon-search"></i>
      <div class="mine-search-box" :class="{'mine-search-box-fake': fake}" v-if="fake">{{placeholder}}</div>
      <input
        class="mine-search-box"
        type="text"
        title="搜索框"
        :placeholder="placeholder"
        ref="input"
        v-model="query"
        v-if="!fake"
      >
      <i
        class="iconfont icon-close"
        v-show="query"
        @click="reset"
      ></i>
    </div>
</template>

<script>
  import {debounce} from 'assets/js/util';

  export default {
    name: 'MeSearchBox',
    props: {
      placeholder: {
        type: String,
        default: '请输入搜索内容'
      },
      fake: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        query: ''
      };
    },
    watch: {
      query: debounce(function () {
        this.$emit('query', this.query);
      })
    },
    methods: {
      focus() {
        this.$refs.input && this.$refs.input.focus();
      },
      clear() {
        this.query = '';
      },
      reset() {
        this.clear();
        this.focus();
      }
    }
  };
</script>

<style lang="scss" scoped>
 @import "~assets/scss/mixins";

  $search-box-height: 30px;

  .mine-search-box-wrapper {
    background-color: transparent!important;
    position: relative;
    display: flex;
    align-items: center;
    width: 100%;
    height: 100%;

    .icon-search {
      position: absolute;
      left: 5px;
    }
    .icon-close{
      position: absolute;
      right: 7px;
    }
  }
  .mine-search-box {
    width: 100%;
    height: 60%;
    border-radius: 20px;
    text-indent: 23px;
    background-color: #f7f7f7;
  }
  .mine-search-box-fake{
    padding-top: 10px;
  }
</style>
