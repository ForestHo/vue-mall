<template>
    <div class="mine-loading" :class="{'mine-loading-inline': inline}">
      <span class="mine-loading-indicator" v-if="indicator === 'on'">
        <slot><img src="./loading.gif" alt="loading"></slot>
      </span>
      <span class="mine-loading-text" v-if="loadingText">{{loadingText}}</span>
    </div>
</template>

<script>
  export default {
    name: 'MeLoading',
    props: {
      indicator: {
        type: String,
        default: 'on',
        validator(value){
          return ['on', 'off'].indexOf(value) > -1;
        }
      },
      text: {
        type: String,
        default: '加载中...'
      },
      inline: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
          /*组件里面自己定义一个变量，来接收父组件传过来的text参数的值*/
          loadingText: this.text
      }
    },
    watch: {
      /*监听传过来text参数的变化*/
      text(text) {
          this.loadingText = text;
      }
    },
    methods: {
      setText(text) {
        // console.log(this);
        this.loadingText = text;
      }
    }
  };
</script>

<style lang="scss" scoped>
  @import "~assets/scss/mixins";
  .mine-loading{
    overflow: hidden;
    width: 100%;
    height: 100%;
    @include flex-center(column);
    /*两个类都存在时,下面这条样式才会生效*/
    &.mine-loading-inline{
      flex-direction: row;
      /*如果loading水平对齐，则设置这样的样式*/
      .mine-loading-indicator ~ .mine-loading-text{
        margin-top: 0px;
        margin-left: 6px;
      }
    }
  }
  /*下面两个元素都要存在，这条规则才能生效*/
  .mine-loading-indicator ~ .mine-loading-text{
    margin-top: 6px;
  }
</style>
