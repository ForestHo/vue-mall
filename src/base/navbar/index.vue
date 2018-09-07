<template>
    <!--这里是有命名空间的样式，因为navbar基础组件-->
    <!--因为基础组件可能都会在其它项目中用到，以免与-->
    <!--别人的样式冲突-->
   <!--基础组件提供slot插槽，插入什么有调用基础组件的页面决定-->
    <div class="mine-navbar">
      <div class="mine-navbar-left" v-if="$slots.left">
        <slot name="left"></slot>
      </div>
      <div class="mine-navbar-center" v-if="$slots.center">
        <slot name="center"></slot>
      </div>
      <div class="mine-navbar-right" v-if="$slots.right">
        <slot name="right"></slot>
      </div>
      <!--flex布局与省略号冲突的问题,可以在里面加一个标签
      让里面那一层显示文字，让里面那一层溢出隐藏,让它溢出显示省略号就行了-->
      <h1 class="mine-navbar-title" v-if="title">
        <span class="mine-navbar-text" v-text="title"></span>
      </h1>
    </div>
</template>

<script>
  export default {
    name: 'MeNavbar',
    props: {
      title: {
        /*参数校验*/
        type: String,
        default: ''
      }
    }
  };
</script>

<style lang="scss" scoped>
  @import "~assets/scss/mixins";

  .mine-navbar{
    position: relative;
    @include flex-between();
    height: 50px;
    background-color: #fff;

    &-left{
      margin-left: 10px;
      /*如果左边的left存在，就取消后面的right的绝对定位*/
      ~ .mine-navbar-right{
        position: static;
      }
    }
    &-center{
      /*中间占据剩下的宽度*/
      flex: 1;
      height: 100%;
      /*不管左边是否存在，中间都会在左右两边空10px*/
      margin: 0 10px;
      /*如果中间的center存在，就取消后面的right的绝对定位,
      也就是left和center只要有一个存在,就取消right的绝对定位
      当left和center都不存在,right就使用绝对定位,从而使得right
      的位置不会因为left和center的不存在，在flex布局下space-between
      的作用下，导致right位置在最左边的问题*/
      ~ .mine-navbar-right{
        position: static;
      }
    }
    &-right{
      position: absolute;
      right: 0;
      /*添加了绝对定位,父容器的flex布局就无法享受了，
      也就是没有办法垂直水平居中*/
      @include flex-center();
      height: 100%;
      margin-right: 10px;
    }
    &-title {
      position: absolute;
      top: 0;
      bottom: 0;
      /*给title一个固定的宽度,这样它里面的文字超出之后显示省略号*/
      left: 20%;
      right: 20%;
      @include flex-center();
      text-align: center;
    }
    &-text {
      line-height: 1.5;
      width: 100%;
      font-size: 18px;
      @include ellipsis();
    }
  }
</style>
